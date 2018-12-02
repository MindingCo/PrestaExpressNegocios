const controller = {};

const crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var valid = require('./valid');
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


controller.home = (req, res) => {
    if (req.user.id_tus === 1) {
      connection.query('SELECT * FROM historialpagos natural join prestamo natural join asesor natural join zona WHERE id_cli = ? AND mof_pre != 0',[req.user.id_cli], (err, pagos) => {
        if (err) {
          console.log(err);
          res.render('error', {
             user: req.user,
             message:"Ha ocurrido un error.",
             error: err
           });
        }
        if (pagos.length) {
          var prestamo= {
            id_pre: pagos[0].id_pre,
            fec_pre: pagos[0].fec_pre,
            moi_pre: decrypt(pagos[0].moi_pre),
            mof_pre: pagos[0].mof_pre,
            mod_pre: decrypt(pagos[0].mod_pre)
          };
          var asesor= {
            id_ase: pagos[0].id_ase,
            nom_ase: decrypt(pagos[0].nom_ase),
            ema_ase: pagos[0].ema_ase,
            tel_ase: decrypt(pagos[0].tel_ase),
            nom_zon: pagos[0].nom_zon
          };
          res.render('home', {
               user: req.user,
               pagos: pagos,
               prestamo: prestamo,
               asesor: asesor
          });
        }
        else {
          connection.query('SELECT * FROM historialpagos natural join prestamo natural join asesor natural join zona WHERE id_cli = ? order by id_pre DESC limit 1',[req.user.id_cli], (err, pagos1) => {
            console.log(pagos1);
            if (err) {
              console.log(err);
              res.render('error', {
                 user: req.user,
                 message:"Ha ocurrido un error.",
                 error: err
               });
            }
            if (pagos1.length) {
              var prestamo= {
                id_pre: pagos1[0].id_pre,
                fec_pre: pagos1[0].fec_pre,
                moi_pre: decrypt(pagos1[0].moi_pre),
                mof_pre: pagos1[0].mof_pre,
                mod_pre: decrypt(pagos1[0].mod_pre)
              };
              var asesor= {
                id_ase: pagos1[0].id_ase,
                nom_ase: decrypt(pagos1[0].nom_ase),
                ema_ase: pagos1[0].ema_ase,
                tel_ase: decrypt(pagos1[0].tel_ase),
                nom_zon: pagos1[0].nom_zon
              }
              console.log(prestamo);
              console.log(asesor);
              res.render('home', {
                   user: req.user,
                   pagos: pagos,
                   prestamo: prestamo,
                   asesor: asesor
              });
            }
            else {
              connection.query('Select * from prestamo natural join asesor natural join zona where id_cli= ?',[req.user.id_cli], (err, pres) =>{
                if (err) {
                  console.log(err);
                  res.render('error', {
                     user: req.user,
                     message:"Ha ocurrido un error.",
                     error: err
                   });
                }
                var pags=[];
                if (pres.length) {
                  var prestamo= {
                    id_pre: pres[0].id_pre,
                    fec_pre: pres[0].fec_pre,
                    moi_pre: decrypt(pres[0].moi_pre),
                    mof_pre: pres[0].mof_pre,
                    mod_pre: decrypt(pres[0].mod_pre)
                  };
                  var asesor= {
                    id_ase: pres[0].id_ase,
                    nom_ase: decrypt(pres[0].nom_ase),
                    ema_ase: pres[0].ema_ase,
                    tel_ase: decrypt(pres[0].tel_ase),
                    nom_zon: pres[0].nom_zon
                  }
                  console.log(prestamo);
                  console.log(asesor);
                  res.render('home', {
                       user: req.user,
                       pagos: pags,
                       prestamo: prestamo,
                       asesor: asesor
                  });
                }
                else {
                  res.render('home', {
                       user: req.user,
                       msg: "No hay préstamos acerca de este cliente"
                  });
                }
              });
            }
         });
        }
      });
    }

    if (req.user.id_tus === 2) {
      connection.query('select cliente.* from cliente natural join prestamo where id_ase= ? and mof_pre != 0 limit 5',[req.user.id_ase], (err, clientes) => {
        console.log(req.user);
        if (err) {
          console.log(err);
          res.render('error', {
             user: req.user,
             message:"Ha ocurrido un error.",
             error: err
           });
        }
        if (clientes.length) {
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
          console.log(dclientes);
          res.render('home', {
            user: req.user,
            clientes: dclientes
          });
        }
        else {
          res.render('home', {
            user: req.user,
            msg: 'No tienes una cartera por el momento'
          });
        }
      });
    }

    if (req.user.id_tus === 3) {
      connection.query('SELECT id_ase,nom_ase,ema_ase,tel_ase,nom_zon from jerarquia natural join asesor natural join zona where id_ger = ?',[req.user.id_ger], (err, asesores) => {
        console.log(req.user);
        console.log(asesores);
        if (err) {
          console.log(err);
          res.render('error', {
             user: req.user,
             message:"Ha ocurrido un error.",
             error: err
           });
        }
        else {
          if (asesores.length) {
            var dasesores=[];
            for (var i = 0; i < asesores.length; i++) {
              var ases= {
                id_ase: asesores[i].id_ase,
                nom_ase: decrypt(asesores[i].nom_ase),
                tel_ase: decrypt(asesores[i].tel_ase)
              };
              dasesores.push(ases);
            }
            connection.query('Select * from cliente limit 50', (err, clientes) => {
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
                    nom_cli: decrypt(clientes[i].nom_cli),
                    din_cli: clientes[i].ema_cli,
                    tel_cli: decrypt(clientes[i].tel_cli)
                  };
                  dclientes.push(cli);
                }
                console.log(dclientes);
                console.log(dasesores);
                res.render('home', {
                  user: req.user,
                  asesores: dasesores,
                  clientes: dclientes
                });
            });
          }
          else {
            connection.query('Select * from cliente limit 50', (err, clientes) => {
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
                    nom_cli: decrypt(clientes[i].nom_cli),
                    din_cli: clientes[i].ema_cli,
                    tel_cli: decrypt(clientes[i].tel_cli)
                  };
                  dclientes.push(cli);
                }
                console.log(dclientes);
                res.render('home', {
                  user: req.user,
                  msg: 'No tienes asesores a cargo',
                  clientes: dclientes
                });
            });
          }
        }
      });
    }

    if (req.user.id_tus === 4) {
      connection.query('SELECT * from prestamo natural join cliente natural join asesor order by id_pre DESC limit 100',[req.user.id_cli], (err, result) => {
        console.log(req.user);
        if (err) {
          console.log(err);
          res.render('error', {
             user: req.user,
             message:"Ha ocurrido un error.",
             error: err
           });
        }
        if (result.length) {
          var dprestamos=[];
          for (var i = 0; i < result.length; i++) {
              var prestamo= {
                id_pre: result[i].id_pre,
                fec_pre: result[i].fec_pre,
                moi_pre: decrypt(result[i].moi_pre),
                mof_pre: result[i].mof_pre,
                mod_pre: decrypt(result[i].mod_pre),
                id_cli: result[i].id_cli,
                nom_cli: decrypt(result[i].nom_cli),
                ema_cli: result[i].ema_cli,
                din_cli: decrypt(result[i].din_cli),
                dih_cli: decrypt(result[i].dih_cli),
                tel_cli: decrypt(result[i].tel_cli)
              };
              dprestamos.push(prestamo);
          }
          console.log(dprestamos);
          res.render('home', {
            user: req.user,
            prestamos: dprestamos
          });
        }
        else {
          res.render('home', {
            user: req.user,
            msg:'No hay préstamos'
          });
        }
      });
    }
};

controller.mcontraseña = (req, res) => {
    const contra_actual = req.body.contraactual;
    const contra_nueva = req.body.newcontra;
    const confirm_contra_nueva = req.body.connewcontra;

    let invalid = valid.contra(contra_actual, "contraseña actual");
    if (invalid)
        return res.render("sesion", {user: req.user, error: invalid});
    invalid = valid.contra(contra_nueva, "contraseña nueva");
    if (invalid)
        return res.render("sesion", {user: req.user, error: invalid});

    if (contra_nueva !== confirm_contra_nueva) {
        return res.render('sesion', {
            user: req.user,
            error: "La nueva contraseña no coincide en ambos campos"
        });
    }
    else {
      connection.query('SELECT * FROM usuario where id_usu= ?', [req.body.id_usu], (err, usu) => {
          if (err) {
            console.log(err);
            return res.render('error', {
               user: req.user,
               message:"Ha ocurrido un error.",
               error: err
             });
          }
          console.log(usu);
          if (!bcrypt.compareSync(contra_actual, usu[0].con_usu)) {
           console.log('contra incorrecta');
           return res.render('sesion', {
              user: req.user,
              error:  "Contraseña actual incorrecta"
            });
          }
          else {
            var con_usu= bcrypt.hashSync(contra_nueva, null, null);
            connection.query('UPDATE usuario set con_usu= ? where id_usu= ?',[con_usu, usu[0].id_usu],(err, ase) => {
             if (err) {
               console.log(err);
               return res.render('error', {
                  user: req.user,
                  message:"Ha ocurrido un error.",
                  error: err
                });
             }
             console.log('Todo bien');
             res.render('sesion', {
                user: req.user,
                message:"Se ha cambiado la contraseña con éxito."
             });
            });
          }
      });
    }

};



module.exports = controller;
