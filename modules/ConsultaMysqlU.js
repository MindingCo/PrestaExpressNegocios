const controller = {};

var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

controller.home = (req, res) => {
    if (req.user.id_tus === 1) {
      connection.query('SELECT fec_pag,mon_pag,com_pag FROM HistorialPagos natural join prestamo WHERE id_cli = ? AND moi_pre != mof_pre;',[req.user.id_cli], (err, pagos) => {
        console.log(pagos);
        if (err) {
         res.json(err);
        }
        res.render('home', {
           user: req.user,
           pagos: pagos
        });
      });
    }

    if (req.user.id_tus === 2) {
      connection.query('call getHistorialpago(?)',[req.user.id_cli], (err, pagos) => {
        console.log(req.user);
        console.log(pagos);
        if (err) {
         res.json(err);
        }
        res.render('home', {
          user: req.user,
          pagos: pagos,
          message: req.flash('info')
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
        connection.query('Select * from cliente', (err, clientes) => {
            if(err) console.log(err);
            res.render('home', {
              user: req.user,
              asesores: asesores,
              clientes: clientes
            });
        });
      });
    }

    if (req.user.id_tus === 4) {
      connection.query('call getHistorialpago(?)',[req.user.id_cli], (err, pagos) => {
        console.log(req.user);
        console.log(pagos);
        if (err) {
         res.json(err);
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
      connection.query('SELECT * FROM usuario where nom_usu= ?',[req.user.nom_cli],(err, usu) => {
          if (err) {
          res.json(err);
          }
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
