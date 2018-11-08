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
var cipher = crypto.createCipheriv('aes-256-cbc', keyto, iv);

controller.agregarusu = (req, res) => {
    var usu= req.body;
    console.log(usu);
    if (usu.tipo != '1' && usu.tipo != '2' && usu.tipo != '3') {
      res.render('agregarusu', {
         user: req.user,
         message: "Tipo de usuario invalido"
       });
    }
    else {
      if (usu.password!=usu.repassword) {
        res.render('agregarusu', {
           user: req.user,
           message: "La contraseña no coincide en ambos campos"
         });
      }
      var buf = cipher.update(usu.nombre, 'utf8', 'hex')
      buf += cipher.final('hex')
      console.log(buf);
      connection.query('SELECT * FROM usuario where use_usu= ?',[usu.username],(err, user) => {
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
          else {
            var con_usu= bcrypt.hashSync(usu.password, null, null);
            switch (usu.tipo) {
              case "1":
                  connection.query('call registrarCliente(?,?,?,?,?,?,?)',[usu.username, con_usu,usu.nombre,usu.email,usu.dirn,usu.dirc,usu.tel],(err, algo) => {
                     if (err) {
                       console.log(err);
                     }
                     console.log(algo);
                     console.log('Todo bien');
                     res.render('agregarusu', {
                        user: req.user,
                        message:"Se ha agregado el cliente "+ usu.nombre +" a la base."
                     });
                  });
                break;
              case "2":
                  connection.query('select id_ger from gerente natural join usuario where nom_ger= ? or use_usu= ? limit 1', [usu.supe, usu.supe], (err, id) => {
                    if (err) console.log(err);
                    if (id.length) {
                      connection.query('call registrarAsesor(?,?,?,?,?,?)',[usu.username, con_usu,usu.nombre,usu.email,usu.tel,parseInt(usu.zona)],(err, rows) => {
                         console.log(id);
                         console.log(rows);
                         if (err) console.log(err);
                         console.log('Call bien');
                         connection.query('select id_ase from asesor where nom_ase= ?',[usu.nombre],(err, ase) => {
                           if (err) console.log(err);
                           connection.query('INSERT INTO jerarquia values (0,?,?)',[id[0].id_ger, ase[0].id_ase],(err, algo) => {
                             if (err) console.log(err);
                             res.render('agregarusu', {
                                user: req.user,
                                message:"Se ha agregado el asesor "+ usu.nombre +" a la base."
                              });
                           });
                         });
                      });
                    } else {
                      res.render('agregarusu', {
                         user: req.user,
                         message:"El gerente "+ usu.supe +" no se encuentra registrado"
                       });
                    }
                  });
                break;
              case "3":
                  connection.query('call registrarGerente(?,?,?,?,?)',[usu.username, con_usu,usu.nombre,usu.email,usu.tel],(err, algo) => {
                     if (err) {
                       console.log(err);
                     }ñ
                     console.log('Todo bien');
                     res.render('agregarusu', {
                        user: req.user,
                        message:"Se ha agregado el gerente "+ usu.nombre +" a la base."
                     });
                  });
                break;
           }
          }
      });
    }
 };

  controller.agregarprestamo= (req, res) => {
    const { id }= req.params;
    var dt = new Date();
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    var year = dt.getFullYear();
    var f= year + '-' + month + '-' + day;

    connection.query('select * from cliente where nom_cli= ?',[req.body.cliente], (err, cliente) => {
      if (err) console.log(err);
      console.log(cliente);
      if (cliente.length) {
        connection.query('select * from prestamo where id_cli = ? and mof_pre != 0',[cliente[0].id_cli], (err, prestamo) => {
          if(err) console.log(err);
          console.log(prestamo);
          if (prestamo.length) {
            res.render('agregarprestamo', {
              user: req.user,
              message: 'El cliente ' +req.body.cliente+ ' ya tiene un préstamo activo'
           });
          }
          else {
            connection.query('select * from asesor where nom_ase= ?',[req.body.asesor],(err, asesor) => {
              if (asesor.length) {
                connection.query('insert into prestamo values (0,?,?,?,?,0,?)',[cliente[0].id_cli,asesor[0].id_ase,f,req.body.montoi, req.body.montod],(err, result) => {
                  if (err) console.log(err);
                  res.render('agregarprestamo', {
                    user: req.user,
                    message: 'El prestamo del cliente ' +cliente[0].nom_cli+ ' registrado con éxito'
                 });
                });
              }
              else {
                res.render('agregarprestamo', {
                  user: req.user,
                  message: 'El asesor ' +req.body.asesor+ ' no está registrado en la base'
               });
              }
            });
          }
        });
      }
      else {
        res.render('agregarprestamo', {
          user: req.user,
          message: 'El cliente ' +req.body.cliente+ ' no está registrado en la base'
       });
      }
    });
  }

  controller.gerentes = (req, res) => {
    connection.query('select * from gerente', (err, gerentes) => {
      if (err) console.log(err);
      res.render('agregarprestamo', {
        user: req.user,
        gerentes: gerentes
     });
    });
  }

  controller.gerenteyasesores= (req, res) => {
    const { id }  = req.params;
      console.log(id);
      connection.query('select * from jerarquia natural join gerente natural join asesor natural join zona where id_ger = ?',[id], (err, gerenteyasesores) => {
        if (err) {
        console.log(err);
        res.json(err);
        }
        console.log(gerenteyasesores);
        res.render('ad-gerente', {
          user: req.user,
          gerente: gerenteyasesores[0],
          asesores: gerenteyasesores
        });
      });
  }

  controller.asesoryclientes = (req, res) => {
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
  }

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
