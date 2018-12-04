const controller = {};
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
const crypto = require('crypto');
var valid = require('./valid.js');

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

        est = valid.pago(req.body);
        if (est)
          return res.send(est);
        console.log(pago);
        connection.query('select id_pre, nom_cli, mof_pre, mod_pre, moi_pre from prestamo natural join cliente where id_cli= ? and mof_pre != 0',[id], (err, pre) => {
          var mof= pre[0].mof_pre - parseInt(req.body.montorecibido);
          if (err) {
            console.log(err);
            res.render('error', {
               user: req.user,
               message:"Ha ocurrido un error.",
               error: err
             });
          }
          if (decrypt(pre[0].mod_pre) < parseInt(req.body.montorecibido)) {
            res.redirect('/asesor/cliente/'+id);
            console.log(req.baseUrl);
         }
          else {
           if (0 > mof || parseInt(req.body.montorecibido) < 0) {
             res.redirect('/asesor/cliente/'+id);
             console.log(req.baseUrl);
           }
           else {
             connection.query('insert into historialpagos values (0,?,?,?,?)',[pre[0].id_pre, pago.fecha, pago.monto, pago.com], (err, resul) => {
               if(err) {
                 console.log(err);
                 res.render('error', {
                    user: req.user,
                    message:"Ha ocurrido un error.",
                    error: err
                  });
               }
               connection.query('update prestamo set mof_pre= ? where id_pre= ?',[mof, pre[0].id_pre], (err, exit) => {
                 if(err) {
                   console.log(err);
                   res.render('error', {
                      user: req.user,
                      message:"Ha ocurrido un error.",
                      error: err
                    });
                 }
                 res.redirect('/asesor/cliente/'+id);
                 console.log(req.baseUrl);
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
                res.render('error', {
                   user: req.user,
                   message:"Ha ocurrido un error.",
                   error: err
                 });
              }
              console.log(cartera);
              if (cartera.length) {
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
              }
              else {
                res.render('a-cartera', {
                  user: req.user,
                  msg: 'No tienes una cartera actual'
               });
              }
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
          connection.query('select * from cliente where id_cli= ?',[id],(err, rows) =>{
            if (err) {
                console.log(err);
                res.render('error', {
                   user: req.user,
                   message:"Ha ocurrido un error.",
                   error: err
                 });
            }
            if (!rows.length) {
                res.send('Usuario inexistente');
            }
            else {
              connection.query('select * from cliente natural join prestamo where id_cli= ? and mof_pre != 0',[id], (err, cliente) => {
                if (err) {
                  console.log(err);
                  res.render('error', {
                     user: req.user,
                     message:"Ha ocurrido un error.",
                     error: err
                   });
                }
                console.log(cliente);

                var dcliente= {
                  id_cli: cliente[0].id_cli,
                  nom_cli: decrypt(cliente[0].nom_cli),
                  ema_cli: cliente[0].ema_cli,
                  dih_cli: decrypt(cliente[0].dih_cli),
                  din_cli: decrypt(cliente[0].din_cli),
                  tel_cli: decrypt(cliente[0].tel_cli),
                  mod_pre: decrypt(cliente[0].mod_pre)
                };
                connection.query('select * from historialpagos natural join prestamo where id_cli= ? and fec_pag= ? and id_pre= ?',[id, f, cliente[0].id_pre], (err, est) => {
                  if (err) {
                    console.log(err);
                    res.render('error', {
                       user: req.user,
                       message:"Ha ocurrido un error.",
                       error: err
                     });
                  }
                  console.log(est);
                  console.log(req.baseUrl);
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
          });
      }

controller.cobros = (req,res) => {
    const dt = new Date();
    const f= (dt.getFullYear()) + '-' + (dt.getMonth()+1) + '-' + (dt.getDate());

    var dcartera=[];
    var dprestamos= [];
    connection.query('Select * from prestamo natural join cliente natural join historialpagos where mof_pre != 0 and id_ase= ? and fec_pag = ?',[req.user.id_ase, f],(err, result) =>{
      if (err) {
             console.error(err);
             return res.render('error', {
                 user: req.user,
                 message:"Ha ocurrido un error.",
                 error: err
             });
      }
      if (result.length) {
        var exp='';
        for (var i = 0; i < result.length; i++) {
          exp= exp + 'id_pre != ' +result[i].id_pre;
          j= i+1;
          if(j < result.length)
            exp= exp+' and ';
        }
        console.log('exp '+exp);
        var st= 'select * from cliente natural join prestamo where id_ase = ? and mof_pre != 0 and '+exp;
        console.log('loging st: \n'+st);
        connection.query(st,[req.user.id_ase, exp],(err, result1) =>{
          if (err) {
                 console.error(err);
                 return res.render('error', {
                     user: req.user,
                     message:"Ha ocurrido un error.",
                     error: err
                 });
          }
          console.log(result1);
          if (result1.length) {
            for (var i = 0; i < result1.length; i++){
              var cliente = {
                  id_cli: result1[i].id_cli,
                  nom_cli: decrypt(result1[i].nom_cli),
                  din_cli: decrypt(result1[i].din_cli),
                  tel_cli: decrypt(result1[i].tel_cli)
              }
              dcartera.push(cliente);
              var prestamo = {
                  id_pre: result1[i].id_pre,
                  fec_pre: result1[i].fec_pre,
                  moi_pre: decrypt(result1[i].moi_pre),
                  mof_pre: result1[i].mof_pre,
                  mod_pre: decrypt(result1[i].mod_pre)
              }
              dprestamos.push(prestamo);
            }
            res.render('a-cobros', {
                user: req.user,
                clientes: dcartera,
                prestamos: dprestamos
            });
          }
          else {
            res.render('a-cobros', {
                user: req.user,
                msg: 'No tienes cobros'
            });
          }
        })
      }
      else {
        connection.query('select * from cliente natural join prestamo where id_ase = ? and mof_pre != 0',[req.user.id_ase],(err, result)=>{
          for (let i = 0; i < result.length; i++) {
              let cliente = {
                  id_cli: result[i].id_cli,
                  nom_cli: decrypt(result[i].nom_cli),
                  din_cli: decrypt(result[i].din_cli),
                  tel_cli: decrypt(result[i].tel_cli)
              };
              dcartera.push(cliente);
              let prestamo = {
                  id_pre: result[i].id_pre,
                  fec_pre: result[i].fec_pre,
                  moi_pre: decrypt(result[i].moi_pre),
                  mof_pre: result[i].mof_pre,
                  mod_pre: decrypt(result[i].mod_pre)
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
        });
      }
    });
    // connection.query('Select * from prestamo natural join cliente natural join historialpagos where mof_pre != 0 and id_ase= ? and fec_pag != ?', [req.user.id_ase, f], (err, result) =>{
    //   if (err) {
    //       console.error(err);
    //       return res.render('error', {
    //           user: req.user,
    //           message:"Ha ocurrido un error.",
    //           error: err
    //       });
    //   }
    //   var dcartera=[];
    //   var dprestamos= [];
    //   if (result.length) {
    //     for (var i = 0; i < result.length; i++){
    //       var cliente = {
    //           id_cli: result[i].id_cli,
    //           nom_cli: decrypt(result[i].nom_cli),
    //           din_cli: decrypt(result[i].din_cli),
    //           tel_cli: decrypt(result[i].tel_cli)
    //       }
    //       dcartera.push(cliente);
    //       var prestamo = {
    //           id_pre: result[i].id_pre,
    //           fec_pre: result[i].fec_pre,
    //           moi_pre: decrypt(result[i].moi_pre),
    //           mof_pre: result[i].mof_pre,
    //           mod_pre: decrypt(result[i].mod_pre)
    //       }
    //       dprestamos.push(prestamo);
    //     }
    //     res.render('a-cobros', {
    //         user: req.user,
    //         clientes: dcartera,
    //         prestamos: dprestamos
    //     });
    //   }
    //   else {
    //     res.render('a-cobros', {
    //         user: req.user,
    //         msg: "No hay cobros pendientes"
    //     });
    //   }
    // });
    //
    /*var dcartera=[];
    var dprestamos=[];
    connection.query('Select id_pre from prestamo natural join historialpagos where mof_pre != 0 and id_ase= ? and fec_pag = ?', [req.user.id_ase, f], (err, result) =>{
      if (err) {
          console.error(err);
          return res.render('error', {
              user: req.user,
              message:"Ha ocurrido un error.",
              error: err
          });
      }
      console.log(result);
      if (result.length){
        connection.query('Select * from prestamo natural join cliente where id_ase = ? and mof_pre != 0', [req.user.id_ase], (err, result1) => {
          console.log(result1);
          for (var i = 0; i < result1.length; i++){
            for (var j = 0; j < result.length; j++){
              console.log('1 '+result1[i].id_pre);
              console.log('2 ' +result[j].id_pre);
              if (result1[i].id_pre == result[j].id_pre){
                  delete result1[i];
              }
            }
          }

          for (var i = 0; i < result1.length; i++){
            var cliente = {
                id_cli: result1[i].id_cli,
                nom_cli: decrypt(result1[i].nom_cli),
                din_cli: decrypt(result1[i].din_cli),
                tel_cli: decrypt(result1[i].tel_cli)
            }
            dcartera.push(cliente);
            var prestamo = {
                id_pre: result1[i].id_pre,
                fec_pre: result1[i].fec_pre,
                moi_pre: decrypt(result1[i].moi_pre),
                mof_pre: result1[i].mof_pre,
                mod_pre: decrypt(result1[i].mod_pre)
            }
            dprestamos.push(prestamo);
          }

          console.log(dcartera);
          console.log(dprestamos);
          res.render('a-cobros', {
              user: req.user,
              clientes: dcartera,
              prestamos: dprestamos
          });
        });
      }
      else {
        connection.query('SELECT * from cliente natural join prestamo where id_ase = ? and mof_pre != 0', [req.user.id_ase], (err, result) => {
          for (let i = 0; i < result.length; i++) {
              let cliente = {
                  id_cli: result[i].id_cli,
                  nom_cli: decrypt(result[i].nom_cli),
                  din_cli: decrypt(result[i].din_cli),
                  tel_cli: decrypt(result[i].tel_cli)
              };
              dcartera.push(cliente);
              let prestamo = {
                  id_pre: result[i].id_pre,
                  fec_pre: result[i].fec_pre,
                  moi_pre: decrypt(result[i].moi_pre),
                  mof_pre: result[i].mof_pre,
                  mod_pre: decrypt(result[i].mod_pre)
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
        });
      }

    });
    */
    // connection.query('SELECT * from cliente natural join prestamo where id_ase = ? and mof_pre != 0',[req.user.id_ase],(err, result) => {
    //     if (err) {
    //         console.error(err);
    //         return res.render('error', {
    //             user: req.user,
    //             message:"Ha ocurrido un error.",
    //             error: err
    //         });
    //     }
    //     connection.query('SELECT * from prestamo natural join historialpagos where id_ase= ? and mof_pre != 0 and fec_pag= ?',[req.user.id_ase, f], (err, result1) => {
    //         if (err) {
    //             console.error(err);
    //             res.render('error', {
    //                 user: req.user,
    //                 message:"Ha ocurrido un error.",
    //                 error: err
    //             });
    //         }
    //         const dcartera = [];
    //         const dprestamos = [];
    //         if (result1.length) {
    //             for (let j = 0; j < result.length; j++) {
    //                 for (let i = 0; i < result1.length; i++) {
    //                   console.log('res '+ result[j].id_cli);
    //                   console.log('res1 '+ );
    //                     if (result[j].id_cli == result1[i].id_cli) {
    //                         delete result[j];
    //                     }
    //                 }
    //             }
    //             if (result.length) {
    //               for (var i = 0; i < result.length; i++) {
    //                 let cliente = {
    //                     id_cli: result[i].id_cli,
    //                     nom_cli: decrypt(result[i].nom_cli),
    //                     din_cli: decrypt(result[i].din_cli),
    //                     tel_cli: decrypt(result[i].tel_cli)
    //                 };
    //                 dcartera.push(cliente);
    //                 let prestamo = {
    //                     id_pre: result[i].id_pre,
    //                     fec_pre: result[i].fec_pre,
    //                     moi_pre: decrypt(result[i].moi_pre),
    //                     mof_pre: result[i].mof_pre,
    //                     mod_pre: decrypt(result[i].mod_pre)
    //                 };
    //                 dprestamos.push(prestamo);
    //               }
    //               console.log(dcartera);
    //               console.log(dprestamos);
    //               res.render('a-cobros', {
    //                   user: req.user,
    //                   clientes: dcartera,
    //                   prestamos: dprestamos
    //               });
    //             }
    //             else {
    //               res.render('a-cobros', {
    //                   user: req.user,
    //                   msg: "No hay cobros restantes"
    //               });
    //             }
    //         } else {
    //             for (let i = 0; i < result.length; i++) {
    //                 let cliente = {
    //                     id_cli: result[i].id_cli,
    //                     nom_cli: decrypt(result[i].nom_cli),
    //                     din_cli: decrypt(result[i].din_cli),
    //                     tel_cli: decrypt(result[i].tel_cli)
    //                 };
    //                 dcartera.push(cliente);
    //                 let prestamo = {
    //                     id_pre: result[i].id_pre,
    //                     fec_pre: result[i].fec_pre,
    //                     moi_pre: decrypt(result[i].moi_pre),
    //                     mof_pre: result[i].mof_pre,
    //                     mod_pre: decrypt(result[i].mod_pre)
    //                 };
    //                 dprestamos.push(prestamo);
    //             }
    //             console.log(dcartera);
    //             console.log(dprestamos);
    //             res.render('a-cobros', {
    //                 user: req.user,
    //                 clientes: dcartera,
    //                 prestamos: dprestamos
    //             });
    //         }
    //     });
    // });
};


module.exports = controller;
