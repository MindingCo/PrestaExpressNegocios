const controller = {};

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

  controller.agenda = (req, res) => {
          console.log(req.user);
          connection.query('select id_ase,nom_ase,ema_ase,tel_ase,nom_zon from jerarquia natural join asesor natural join zona where id_ger = ?',[req.user.id_ger], (err, agenda) => {
            if (err) {
             console.log(err);
             res.json(err);
            }
            res.render('G-agenda', {
              user: req.user,
              asesores: agenda
            });
          });
        };


  controller.consultarasesor = (req, res) => {
            const { id }  = req.params;
              console.log(id);
              connection.query('select id_cli,nom_cli,ema_cli,din_cli,tel_cli,nom_ase,ema_ase,tel_ase,nom_zon from prestamo natural join cliente natural join asesor natural join zona where id_ase = ? and mof_pre != 0',[id], (err, asesorycartera) => {
                if (err) {
                console.log(err);
                res.json(err);
                }
                console.log(asesorycartera);
                res.render('asesorycartera', {
                  user: req.user,
                  asesor: asesorycartera[0],
                  clientes: asesorycartera
               });
              });
            };

    controller.consultarcliente = (req, res) => {
            const { id }  = req.params;
            console.log(id);
            connection.query('select cliente.*, fec_pag, mon_pag,com_pag from cliente natural join historialpagos where id_cli= ?',[id], (err, cliente) => {
              if (err) {
                console.log(err);
                res.json(err);
              }
              console.log(cliente);
              res.render('g-cliente', {
                user: req.user,
                cliente: cliente[0],
                pagos: cliente
              });
            });
      };

module.exports = controller;
