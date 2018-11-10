const controller = {};
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
const crypto = require('crypto');

let iv = 'asdpiadsjfasdfxw';
let key = 'cdsadskjldsdskjd';
let keyto = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);


function encrypt(text){
  var cipher = crypto.createCipheriv('aes-256-cbc', keyto, iv);
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipheriv('aes-256-cbc', keyto, iv)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

    controller.pago= (req, res) =>{
        const { id }= req.params;
        var dt = new Date();
        var month = dt.getMonth()+1;
        var day = dt.getDate();
        var year = dt.getFullYear();
        var f= year + '-' + month + '-' + day;
        var pago= {
            fecha: f,
            monto: req.body.montorecibido,
            com: req.body.comen
        };
        console.log(pago);
        connection.query('select id_pre, nom_cli, mof_pre, mod_pre, moi_pre from prestamo natural join cliente where id_cli= ? and mof_pre != 0',[id], (err, pre) => {
          var mof= pre[0].mof_pre - parseInt(req.body.montorecibido);
          if (err) {
          console.log(err);
          res.json(err);{}
          }
          if (decrypt(pre[0].mod_pre) < parseInt(req.body.montorecibido)) {
            res.render('home', {
              user: req.user,
              message: 'El monto recibido no puede ser mayor al que se debe de cobrar'
           });
         }
          else {
           if (0 > mof) {
             res.render('home', {
               user: req.user,
               message: 'Con el monto recibido, el total pagado sobrepasa a lo que se debe de pagar en total del présamo'
             });
           }
           else {
             connection.query('insert into historialpagos values (0,?,?,?,?)',[pre[0].id_pre, pago.fecha, pago.monto, pago.com], (err, resul) => {
               if(err) console.log(err);
               connection.query('update prestamo set mof_pre= ? where id_pre= ?',[mof, pre[0].id_pre], (err, exit) => {
                 if(err) console.log(err);
                 res.render('home', {
                   user: req.user,
                   message: 'El pago ha sido registrado con exito'
                });
               });
              });
            }
          }
        });
      }

      controller.cartera = (req, res) => {
            connection.query('select id_cli,nom_cli,din_cli,dih_cli,tel_cli from prestamo natural join cliente where id_ase = ? and  mof_pre != 0',[req.user.id_ase], (err, cartera) => {
              if (err) {
              console.log(err);
              res.json(err);
              }
              console.log(cartera);
              var dcartera=[];
              for (var i = 0; i < cartera.length; i++) {
                var cliente= {
                  id_cli: cartera[i].id_cli,
                  nom_cli: decrypt(cartera[i].nom_cli),
                  ema_cli: cartera[i].ema_cli,
                  dih_cli: decrypt(cartera[i].dih_cli),
                  din_cli: decrypt(cartera[i].din_cli),
                  tel_cli: decrypt(cartera[i].tel_cli)
                };
                dcartera.push(cliente);
              }
              res.render('a-cartera', {
                user: req.user,
                clientes: dcartera
             });
           });
          };

      controller.consultarcliente = (req, res) => {
          var dt = new Date();
          var month = dt.getMonth()+1;
          var day = dt.getDate();
          var year = dt.getFullYear();
          var f= year + '-' + month + '-' + day;
          console.log(f);
          const { id }  = req.params;
          console.log(id);
          connection.query('select * from cliente natural join prestamo where id_cli= ? and mof_pre != 0',[id], (err, cliente) => {
            if (err) {
              console.log(err);
              res.json(err);
            }
            console.log(cliente);
            var dcliente= {
              id_cli: cliente[0].id_cli,
              nom_cli: decrypt(cliente[0].nom_cli),
              ema_cli: cliente[0].ema_cli,
              dih_cli: decrypt(cliente[0].dih_cli),
              din_cli: decrypt(cliente[0].din_cli),
              tel_cli: decrypt(cliente[0].tel_cli)
            };
            connection.query('select * from historialpagos natural join prestamo where id_cli= ? and fec_pag= ?',[id, f], (err, est) => {
              if (err) console.log(err);
              console.log(est);
              if (est.length) {
                res.render('a-cliente', {
                  user: req.user,
                  cliente: dcliente,
                  message: "El cobro de hoy ya se ha registrado"
                });
              }
              else {
                res.render('a-cliente', {
                  user: req.user,
                  cliente: dcliente
                });
              }
            });
          });
      }

      controller.cobros = (req,res) => {
          var dt = new Date();
          var month = dt.getMonth()+1;
          var day = dt.getDate();
          var year = dt.getFullYear();
          var f= year + '-' + month + '-' + day;
          connection.query('SELECT * from cliente natural join prestamo where id_ase = ? and mof_pre != 0',[req.user.id_ase],(err, result) => {
            if (err) {
              console.log(err);
              res.json(err);
            }
            connection.query('SELECT * from prestamo natural join historialpagos where id_ase= ? and mof_pre != 0 and fec_pag= ?',[req.user.id_ase, f], (err, result1) => {
              var dcartera=[];
              var dprestamos=[];
              if (result1.length) {
                for (var j = 0; j < result1.length; j++) {
                  for (var i = 0; i < result.length; i++) {
                    if (result[i].id_cli != result1[j].id_cli) {
                      var cliente= {
                        id_cli: result[i].id_cli,
                        nom_cli: decrypt(result[i].nom_cli),
                        din_cli: decrypt(result[i].din_cli),
                        tel_cli: decrypt(result[i].tel_cli)
                      };
                      dcartera.push(cliente);
                      var prestamo= {
                        id_pre: result[0].id_pre,
                        fec_pre: result[0].fec_pre,
                        moi_pre: decrypt(result[0].moi_pre),
                        mof_pre: result[0].mof_pre,
                        mod_pre: decrypt(result[0].mod_pre)
                      };
                      dprestamos.push(prestamo);
                    }
                  }
                }
                res.render('a-cobros', {
                  user: req.user,
                  clientes: dcartera,
                  prestamos: dprestamos
                });
              }
              else {
                for (var i = 0; i < result.length; i++) {
                    var cliente= {
                      id_cli: result[i].id_cli,
                      nom_cli: decrypt(result[i].nom_cli),
                      din_cli: decrypt(result[i].din_cli),
                      tel_cli: decrypt(result[i].tel_cli)
                    };
                    dcartera.push(cliente);
                    var prestamo= {
                      id_pre: result[0].id_pre,
                      fec_pre: result[0].fec_pre,
                      moi_pre: decrypt(result[0].moi_pre),
                      mof_pre: result[0].mof_pre,
                      mod_pre: decrypt(result[0].mod_pre)
                    };
                    dprestamos.push(prestamo);
                }
                console.log(dcartera);
                console.log(dprestamos);
                res.render('a-cobros', {
                  user: req.user,
                  clientes: dcartera,
                  prestamos: dprestamos
                });
              }
            });
          });
      }


module.exports = controller;
