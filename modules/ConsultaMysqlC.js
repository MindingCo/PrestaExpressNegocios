const controller = {};

var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);


controller.asesor = (req, res) => {

    connection.query('SELECT nom_ase,ema_ase,tel_ase,nom_zon FROM prestamo natural join asesor natural join zona WHERE id_cli = ? AND mof_pre != 0',[req.user.id_cli],(err, ase) => {
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
