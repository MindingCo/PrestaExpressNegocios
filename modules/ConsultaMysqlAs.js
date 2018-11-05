const controller = {};

var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

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
        connection.query('select id_pre, nom_cli from prestamo natural join cliente where id_cli= ? and moi_pre != mof_pre',[id], (err, idpre) => {
          if (err) {
          console.log(err);
          res.json(err);
          }

          connection.query('insert into historialpagos values (0,?,?,?,?)',[idpre[0].id_pre, pago.fecha, pago.monto, pago.com], (err, resul) => {
            if(err) console.log(err);
            res.render('home', {
              user: req.user,
              message: 'El pago del cliente ' +idpre[0].nom_cli+ ' registrado con éxito'
           });
          });
        });

    }

      controller.cartera = (req, res) => {
            connection.query('select id_cli,nom_cli,din_cli,tel_cli from prestamo natural join cliente where id_ase = ? and moi_pre != mof_pre',[req.user.id_ase], (err, cartera) => {
              if (err) {
              console.log(err);
              res.json(err);
              }
              console.log(cartera);
              res.render('a-cartera', {
                user: req.user,
                clientes: cartera
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
          connection.query('select * from cliente natural join prestamo where id_cli= ? and moi_pre != mof_pre',[id], (err, cliente) => {
            if (err) {
              console.log(err);
              res.json(err);
            }
            console.log(cliente);
            connection.query('select * from historialpagos natural join prestamo where id_cli= ? and fec_pag= ?',[id, f], (err, est) => {
              if (err) console.log(err);
              console.log(est);
              if (est.length) {
                res.render('a-cliente', {
                  user: req.user,
                  cliente: cliente[0],
                  message: "El cobro de hoy ya se ha registrado"
                });
              }
              else {
                res.render('a-cliente', {
                  user: req.user,
                  cliente: cliente[0]
                });
              }
            });
          });
      };

module.exports = controller;
