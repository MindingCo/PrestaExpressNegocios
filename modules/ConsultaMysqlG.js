const controller = {};

const crypto = require('crypto');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

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

  controller.agenda = (req, res) => {
          console.log(req.user);
          connection.query('select id_ase,nom_ase,ema_ase,tel_ase,nom_zon from jerarquia natural join asesor natural join zona where id_ger = ?',[req.user.id_ger], (err, agenda) => {
            if (err) {
              console.log(err);
              res.render('error', {
                 user: req.user,
                 message:"Ha ocurrido un error.",
                 error: err
               });
            }
            var dagenda= [];
            for (var i = 0; i < agenda.length; i++) {
              var asesor= {
                id_ase: agenda[i].id_ase,
                nom_ase: decrypt(agenda[i].nom_ase),
                ema_ase: agenda[i].ema_ase,
                tel_ase: decrypt(agenda[i].tel_ase),
                nom_zona: agenda[i].nom_zon
              }
              dagenda.push(asesor);
            }
            connection.query('Select * from cliente', (err, clientes) => {
                if(err) {
                  console.log(err);
                  res.render('error', {
                     user: req.user,
                     message:"Ha ocurrido un error.",
                     error: err
                   });
                }
                console.log(clientes);
                var dclientes=[];
                for (var i = 0; i < clientes.length; i++) {
                  var cli= {
                    id_cli: clientes[i].id_cli,
                    nom_cli: decrypt(clientes[i].nom_cli),
                    ema_cli: clientes[i].ema_cli,
                    din_cli: decrypt(clientes[i].din_cli),
                    dih_cli: decrypt(clientes[i].dih_cli),
                    tel_cli: decrypt(clientes[i].tel_cli)
                  };
                  dclientes.push(cli);
                }
                res.render('G-agenda', {
                  user: req.user,
                  asesores: dagenda,
                  clientes: dclientes
                });
            });
          });
        };


  controller.consultarasesor = (req, res) => {
            const { id }  = req.params;
              console.log(id);
              connection.query('select * from asesor natural join zona where id_ase= ?',[id], (err, asesor) => {
                if (err) {
                  console.log(err);
                  res.render('error', {
                     user: req.user,
                     message:"Ha ocurrido un error.",
                     error: err
                   });
                }
                var asesor= {
                  nom_ase: decrypt(asesor[0].nom_ase),
                  ema_ase: asesor[0].ema_ase,
                  tel_ase: decrypt(asesor[0].tel_ase),
                  nom_zona: asesor[0].nom_zon
                }
                connection.query('select id_cli,nom_cli,ema_cli,din_cli,dih_cli,tel_cli from prestamo natural join cliente natural join asesor natural join zona where id_ase = ? and mof_pre != 0',[id], (err, asesorycartera)=>{
                  if (err) {
                    console.log(err);
                    res.render('error', {
                       user: req.user,
                       message:"Ha ocurrido un error.",
                       error: err
                     });
                  }
                  if(asesorycartera.length){
                    console.log(asesorycartera);
                    var dcartera=[];
                    for (var i = 0; i < asesorycartera.length; i++) {
                      var cliente= {
                        id_cli: asesorycartera[i].id_cli,
                        nom_cli: decrypt(asesorycartera[i].nom_cli),
                        ema_cli: asesorycartera[i].ema_cli,
                        din_cli: decrypt(asesorycartera[i].din_cli),
                        dih_cli: decrypt(asesorycartera[i].dih_cli),
                        tel_cli: decrypt(asesorycartera[i].tel_cli)
                      };
                      dcartera.push(cliente);
                      console.log(cliente);
                    }
                    res.render('asesorycartera', {
                      user: req.user,
                      asesor: asesor,
                      clientes: dcartera
                   });
                  }
                  else {
                    res.render('asesorycartera', {
                      user: req.user,
                      asesor: asesor,
                      msg: 'Este asesor aún no tiene cartera'
                   });
                  }
                });
              });
            };

    controller.consultarcliente = (req, res) => {
            const { id }  = req.params;
            console.log(id);
            connection.query('select * from cliente where id_cli = ?',[id], (err, cliente) => {
              if (err) {
                console.log(err);
                res.render('error', {
                   user: req.user,
                   message:"Ha ocurrido un error.",
                   error: err
                 });
              }

              else {
                var dcliente= {
                  id_cli: cliente[0].id_cli,
                  nom_cli: decrypt(cliente[0].nom_cli),
                  ema_cli: cliente[0].ema_cli,
                  din_cli: decrypt(cliente[0].din_cli),
                  dih_cli: decrypt(cliente[0].dih_cli),
                  tel_cli: decrypt(cliente[0].tel_cli)
                }
                connection.query('select * from prestamo where id_cli= ? and mof_pre != 0',[id],(err, result)=>{
                  if (result.length) {
                    var dpres= {
                      id_pre: result[0].id_pre,
                      fec_pre: result[0].fec_pre,
                      moi_pre: decrypt(result[0].moi_pre),
                      mof_pre: result[0].mof_pre,
                      mod_pre: decrypt(result[0].mod_pre)
                    }
                    connection.query('select * from historialpagos natural join prestamo where id_pre= ?', [result[0].id_pre], (err, hp)=>{
                      if (err) {
                        console.log(err);
                        res.render('error', {
                           user: req.user,
                           message:"Ha ocurrido un error.",
                           error: err
                         });
                      }
                      if (hp.length) {
                        res.render('g-cliente', {
                          user: req.user,
                          cliente: dcliente,
                          prestamo: dpres,
                          pagos: hp
                        });
                      }
                      else {
                        res.render('g-cliente', {
                          user: req.user,
                          cliente: dcliente,
                          prestamo: dpres,
                          msg: 'Este cliente aún no tiene pagos'
                        });
                      }
                    });
                  }
                  else {
                    res.render('g-cliente', {
                      user: req.user,
                      cliente: dcliente,
                      msg: 'Este no tiene préstamo activo'
                    });
                  }
                });
              }
            });
      };

      controller.clientes=  (req, res) => {
        connection.query('select * from cliente',(err, rows)=>{
          if (err) {
            console.log(err);
            res.render('error', {
               user: req.user,
               message:"Ha ocurrido un error.",
               error: err
             });
          }
          if (rows.length) {
            var dclientes=[];
            for (var i = 0; i < rows.length; i++) {
              var cliente= {
                id_cli: rows[i].id_cli,
                nom_cli: decrypt(rows[i].nom_cli),
                ema_cli: rows[i].ema_cli,
                din_cli: decrypt(rows[i].din_cli),
                dih_cli: decrypt(rows[i].dih_cli),
                tel_cli: decrypt(rows[i].tel_cli)
              };
              dclientes.push(cliente);
            }
            res.render('', {
               user: req.user,
               clientes: dclientes
             });
          }
          else {
            res.render('', {
               user: req.user,
               msg: 'No hay clientes registrados'
             });
          }
        });
      }

      controller.capital = (req, res) =>{
        var dt = new Date();
        var month = dt.getMonth()+1;
        var day = dt.getDate();
        var year = dt.getFullYear();
        var f= year + '-' + month + '-' + day;
        var entrante=0;
        var saliente=0;
        connection.query('SELECT * from historialpagos where fec_pag = ?',[f],(err, result)=>{
          if (err) {
            console.log(err);
            res.render('error', {
               user: req.user,
               message:"Ha ocurrido un error.",
               error: err
             });
          }
          if (result.length) {
            for (var i = 0; i < result.length; i++) {
              entrante= entrante + parseInt(result[i].mon_pag);
            }
            console.log(entrante);
            connection.query('select * from prestamo where fec_pre = ?',[f],(err, rows)=>{
              if (err) {
                console.log(err);
                res.render('error', {
                   user: req.user,
                   message:"Ha ocurrido un error.",
                   error: err
                 });
              }
              if (rows.length) {
                for (var i = 0; i < rows.length; i++) {
                  var mon = decrypt(rows[i].moi_pre);
                  saliente = saliente + parseInt(mon);
                }
                console.log('ent ' +entrante);
                console.log('sal ' +saliente);
                res.render('', {
                   user: req.user,
                   entrante: entrante,
                   saliente: saliente
                });
              }
              else {
                console.log(entrante);
                res.render('', {
                   user: req.user,
                   entrante: entrante,
                   saliente: 0,
                });
              }
            });
          }
          else {
            connection.query('select * from prestamo where fec_pre = ?',[f],(err, rows)=>{
              if (err) {
                console.log(err);
                res.render('error', {
                   user: req.user,
                   message:"Ha ocurrido un error.",
                   error: err
                 });
              }
              if (rows.length) {
                for (var i = 0; i < rows.length; i++) {
                  var mon = decrypt(rows[i].moi_pre);
                  saliente = saliente + parseInt(mon);
                }
                console.log(saliente);
                res.render('', {
                   user: req.user,
                   entrante: 0,
                   saliente: saliente
                });
              }
              else {
                res.render('', {
                   user: req.user,
                   entrante: 0,
                   saliente: 0,
                });
              }
            });
          }
        });
      }

module.exports = controller;
