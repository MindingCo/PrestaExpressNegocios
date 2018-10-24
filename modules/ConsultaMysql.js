const controller = {};

var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);


controller.home = (req, res) => {
    if (req.user.id_tus === 1) {
      connection.query('SELECT * FROM historialpagos where id_cli = ?',[req.user.id_cli], (err, pagos) => {
        console.log(req.user);
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
      connection.query('SELECT * FROM historialpagos where id_cli = ?',[req.user.id_cli], (err, pagos) => {
        console.log(req.user);
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

    if (req.user.id_tus === 3) {
      connection.query('SELECT nom_ase ema_ase tel_ase id_zon from jerarquia natural join asesor where id_ger = ?',[req.user.id_ger], (err, pagos) => {
        console.log(req.user);
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

    if (req.user.id_tus === 4) {
      connection.query('SELECT * FROM historialpagos where id_cli = ?',[req.user.id_cli], (err, pagos) => {
        console.log(req.user);
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

};

controller.asesor = (req, res) => {

    connection.query('SELECT nom_ase,ema_ase,tel_ase,id_zon FROM prestamo natural join asesor where id_cli= ?',[req.user.id_cli],(err, ase) => {
      console.log(req.user);
      console.log(ase);
     if (err) {
      res.json(err);
     }
     res.render('asesor', {
        user: req.user,
        ase: ase
     });
    });
};

controller.mcontraseña = (req, res) => {
    var message='';
    var cona= req.body.contraactual;
    var conn= req.body.newcontra;
    var cconn=req.body.connewacontra;

    if (conn!=cconn) {
      res.render('sesion', {
         user: req.user,
         message: "La nueva contraseña no coincide en ambos campos"
       });
    }
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
    });
};


controller.agregarusu = (req, res) => {
    var usu= req.body;
    console.log(usu);
    if (usu.type != '1' && usu.type != '2' && usu.type != '3') {
      res.render('agregarusu', {
         user: req.user,
         message: "Tipo de usuario invalido"
       });
    }
    if (usu.password!=usu.repassword) {
      res.render('agregarusu', {
         user: req.user,
         message: "La contraseña no coincide en ambos campos"
       });
    }
    connection.query('SELECT * FROM usuario where nom_usu= ?',[usu.username],(err, user) => {
        if (err) {
        console.log(err);
        res.json(err);
        }
        if (user.length) {
         console.log('Existe el usuario');
         res.render('agregarusu', {
            user: req.user,
            message:  "El nombre de usuario ya está registrado"
          });
        }
        var con_usu= bcrypt.hashSync(usu.password, null, null);
        connection.query('INSERT into usuario values (0,?,?,?)',[usu.type,usu.username, con_usu],(err, algo) => {
         if (err) {
           console.log(err);
         }
         console.log('Todo bien');
         res.render('agregarusu', {
            user: req.user,
            message:"Se ha agregado el usuario"+ usu.username +"a la base."
         });
        });
    });
};


module.exports = controller;
