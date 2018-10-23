const controller = {};

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);


controller.pagos = (req, res) => {
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

module.exports = controller;
