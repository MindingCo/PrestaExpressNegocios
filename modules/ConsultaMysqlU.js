const controller = {};

const crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
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

controller.home = (req, res) => {
    if (req.user.id_tus === 1) {
      connection.query('SELECT * FROM HistorialPagos natural join prestamo natural join asesor natural join zona WHERE id_cli = ? AND mof_pre != 0',[req.user.id_cli], (err, pagos) => {
        console.log(pagos);
        if (err) {
         res.json(err);
        }
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
        }
        console.log(prestamo);
        console.log(asesor);
        res.render('home', {
             user: req.user,
             pagos: pagos,
             prestamo: prestamo,
             asesor: asesor
        });
      });
    }

    if (req.user.id_tus === 2) {
      connection.query('select cliente.* from cliente natural join prestamo where id_ase= ? and mof_pre != 0 limit 10',[req.user.id_ase], (err, clientes) => {
        console.log(req.user);
        if (err) {
         res.json(err);
        }
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
      });
    }

    if (req.user.id_tus === 3) {
      connection.query('SELECT id_ase,nom_ase,ema_ase,tel_ase,nom_zon from jerarquia natural join asesor natural join zona where id_ger = ?',[req.user.id_ger], (err, asesores) => {
        console.log(req.user);
        console.log(asesores);
        if (err) {
         res.json(err);
         console.log(err);
        }
        else {
          var dasesores=[];
          for (var i = 0; i < asesores.length; i++) {
            var ases= {
              id_ase: asesores[i].id_ase,
              nom_ase: decrypt(asesores[i].nom_ase),
              tel_ase: decrypt(asesores[i].tel_ase)
            };
            dasesores.push(ases);
          }
          connection.query('Select * from cliente', (err, clientes) => {
              if(err) console.log(err);
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
      });
    }

    if (req.user.id_tus === 4) {
      connection.query('SELECT * from prestamos order by id_pre DECS limit 100',[req.user.id_cli], (err, pagos,) => {
        console.log(req.user);
        console.log(pagos);
        if (err) {
         res.json(err);
         console.log(err);
        }
        res.render('home', {
          user: req.user,
          pagos: pagos,
          message: req.flash('info')
        });
      });
    }
};

controller.mcontraseña = (req, res) => {
    var cona= req.body.contraactual;
    var conn= req.body.newcontra;
    var cconn=req.body.connewcontra;

    if (conn!=cconn) {
      res.render('sesion', {
         user: req.user,
         message: "La nueva contraseña no coincide en ambos campos"
       });
    }
    else {
      var nombre= req.user.use_usu;
      connection.query('SELECT * FROM usuario where use_usu= ?',[nombre],(err, usu) => {
          if (err) {
          res.json(err);
          console.log(err);
          }
          console.log(usu);
          if (!bcrypt.compareSync(cona, usu[0].con_usu)) {
           console.log('contra incorrecta');
           res.render('sesion', {
              user: req.user,
              message:  "Contraseña actual incorrecta"
            });
          }
          else {
            var con_usu= bcrypt.hashSync(conn, null, null);
            connection.query('UPDATE usuario set con_usu= ? where id_usu= ?',[con_usu, usu[0].id_usu],(err, ase) => {
             if (err) {
              res.json(err);
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
