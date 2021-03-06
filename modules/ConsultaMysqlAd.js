const controller = {};

var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var valid= require('./valid.js');
const crypto = require('crypto');


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

controller.agregarusu = (req, res) => {
    var usu= req.body;
    console.log(usu);
    var est= valid.username(usu.username);
    if (est) {
      res.render('agregarusu', {
         user: req.user,
         message: est
       });
    }
    else {
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

        connection.query('SELECT * FROM usuario where use_usu= ?',[usu.username],(err, user) => {
            if (err) {
            console.log(err);
            res.render('error', {
               user: req.user,
               message:"Ha ocurrido un error.",
               error: err
             });
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
              var nombre = encrypt(usu.nombre)
              var tel = encrypt(usu.tel)
              switch (usu.tipo) {
                case "1":
                    var est= valid.cliente(req.body);
                    if (est){
                      res.render('agregarusu', {
                         user: req.user,
                         message:est
                      });
                    }
                    else {
                      try{
                        var dirnegocio = encrypt(usu.dirn)
                        console.log("2: \n" + dirnegocio);
                        var dircasa = encrypt(usu.dirc)
                        console.log("3: \n" + dircasa);
                      }
                      catch {
                        console.log("Error");
                      }
                      connection.query('select id_cli from cliente where ema_cli = ? or din_cli= ? or dih_cli = ? or tel_cli = ? limit 1',[usu.email, dirnegocio, dircasa, tel],(err, result)=>{
                        if (err) {
                          console.log(err);
                          res.render('error', {
                             user: req.user,
                             message:"Ha ocurrido un error.",
                             error: err
                           });
                        }
                        if (result.length) {
                          res.render('agregarusu', {
                             user: req.user,
                             message:"Ya existe un usuario con alguno de los datos ingresados (correo, alguna dirección o teléfono)."
                          });
                        }
                        else {
                          connection.query('select id_ase from asesor inner join gerente where ema_ase = ? or ema_ger = ? or tel_ase= ? or tel_ger= ? limit 1',[usu.email, usu.email, tel, tel],(err, result1)=>{
                            if (err) {
                              console.log(err);
                              res.render('error', {
                                 user: req.user,
                                 message:"Ha ocurrido un error.",
                                 error: err
                               });
                            }
                            if (result1.length) {
                              res.render('agregarusu', {
                                 user: req.user,
                                 message:"Ya existe un usuario con alguno de los datos ingresados (correo, alguna dirección o teléfono)."
                              });
                            }
                            else {
                              connection.query('call registrarCliente(?,?,?,?,?,?,?)',[usu.username, con_usu,nombre,usu.email,dirnegocio,dircasa,tel],(err, algo) => {
                                 if (err) {
                                   console.log(err);
                                   res.render('error', {
                                      user: req.user,
                                      message:"Ha ocurrido un error.",
                                      error: err
                                    });
                                 }
                                 else {
                                   console.log(algo);
                                   console.log('Todo bien');
                                   res.render('agregarusu', {
                                      user: req.user,
                                      message:"Se ha agregado el cliente "+ usu.username +" a la base."
                                   });
                                 }
                              });
                            }
                          });
                        }
                      });
                    }
                  break;
                case "2":
                    var est= valid.asesor(req.body);
                    if (est){
                      res.render('agregarusu', {
                         user: req.user,
                         message:est
                      });
                    }
                    else {
                      var superior= encrypt(usu.supe)
                      console.log("superior: \n" + superior);
                      connection.query('select id_ger from gerente where nom_ger= ?', [superior], (err, id) => {
                        if (err) {
                          console.log(err);
                          res.render('error', {
                             user: req.user,
                             message:"Ha ocurrido un error.",
                             error: err
                           });
                        }
                        if (id.length) {
                          connection.query('select id_ase from asesor inner join gerente inner join cliente where ema_ase = ? or ema_ger = ? or ema_cli = ? or tel_ase= ? or tel_ger= ? or tel_cli = ? limit 1',[usu.email,usu.email,usu.email,tel,tel,tel],(err, result)=>{
                            if (err) {
                              console.log(err);
                              res.render('error', {
                                 user: req.user,
                                 message:"Ha ocurrido un error.",
                                 error: err
                               });
                            }
                            if (result.length) {
                              res.render('agregarusu', {
                                 user: req.user,
                                 message:"Ya existe un usuario con alguno de los datos ingresados (correo, alguna dirección o teléfono)."
                              });
                            }
                            else {
                              connection.query('call registrarAsesor(?,?,?,?,?,?)',[usu.username, con_usu,nombre,usu.email,tel,parseInt(usu.zona)],(err, rows) => {
                                 console.log(id);
                                 console.log(rows);
                                 if (err) {
                                   console.log(err);
                                   res.render('error', {
                                      user: req.user,
                                      message:"Ha ocurrido un error.",
                                      error: err
                                    });
                                 }
                                 console.log('Call bien');
                                 connection.query('select id_ase from asesor where nom_ase= ?',[nombre],(err, ase) => {
                                   if (err) {
                                     console.log(err);
                                     res.render('error', {
                                        user: req.user,
                                        message:"Ha ocurrido un error.",
                                        error: err
                                      });
                                   }
                                   connection.query('INSERT INTO jerarquia values (0,?,?)',[id[0].id_ger, ase[0].id_ase],(err, algo) => {
                                     if (err) {
                                       console.log(err);
                                       res.render('error', {
                                          user: req.user,
                                          message:"Ha ocurrido un error.",
                                          error: err
                                        });
                                     }
                                     res.render('agregarusu', {
                                        user: req.user,
                                        message:"Se ha agregado el asesor "+ usu.nombre +" a la base."
                                      });
                                   });
                                 });
                              });
                            }
                          });
                        } else {
                          res.render('agregarusu', {
                             user: req.user,
                             message:"El gerente "+ usu.supe +" no se encuentra registrado"
                           });
                        }
                      });
                    }
                  break;
                case "3":
                    var est= valid.gerente(req.body);
                    if (est){
                      res.render('agregarusu', {
                         user: req.user,
                         message:est
                      });
                    }
                    else {
                      connection.query('select id_ase from asesor inner join gerente inner join cliente where ema_ase = ? or ema_ger = ? or ema_cli = ? or tel_ase= ? or tel_ger= ? or tel_cli = ? limit 1',[usu.email,usu.email,usu.email,tel,tel,tel],(err, result)=>{
                        if (err) {
                          console.log(err);
                          console.log(err);
                          res.render('error', {
                             user: req.user,
                             message:"Ha ocurrido un error.",
                             error: err
                           });
                        }
                        if (result.length) {
                          res.render('agregarusu', {
                             user: req.user,
                             message:"Ya existe un usuario con alguno de los datos ingresados (correo, alguna dirección o teléfono)."
                          });
                        }
                        else {
                          connection.query('call registrarGerente(?,?,?,?,?)',[usu.username, con_usu,nombre,usu.email,tel],(err, algo) => {
                             if (err) {
                               console.log(err);
                               console.log(err);
                               res.render('error', {
                                  user: req.user,
                                  message:"Ha ocurrido un error.",
                                  error: err
                                });
                             }
                             console.log('Todo bien');
                             res.render('agregarusu', {
                                user: req.user,
                                message:"Se ha agregado el gerente "+ usu.nombre +" a la base."
                             });
                          });
                        }
                      });
                    }
                  break;
                }
            }
        });
      }
    }

 };

  controller.agregarprestamo= (req, res) => {
    var dt = new Date();
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    var year = dt.getFullYear();
    var f= year + '-' + month + '-' + day;
    var nombre = encrypt(req.body.cliente)
    var est= valid.prestamo(req.body);
    if (est) {
      res.render('agregarprestamo', {
        user: req.user,
        message: est
     });
    }
    else {
      connection.query('select * from cliente where nom_cli= ?',[nombre], (err, cliente) => {
        if (err) {
          console.log(err);
          res.render('error', {
             user: req.user,
             message:"Ha ocurrido un error.",
             error: err
           });
        }
        console.log(cliente);
        if (cliente.length) {
          connection.query('select * from prestamo where id_cli = ? and mof_pre != 0',[cliente[0].id_cli], (err, prestamo) => {
            if(err) {
              console.log(err);
              res.render('error', {
                 user: req.user,
                 message:"Ha ocurrido un error.",
                 error: err
               });
            }
            console.log(prestamo);
            if (prestamo.length) {
              res.render('agregarprestamo', {
                user: req.user,
                message: 'El cliente ' +req.body.cliente+ ' ya tiene un préstamo activo'
             });
            }
            else {
              var vasesor= encrypt(req.body.asesor)
              connection.query('select * from asesor where nom_ase= ?',[vasesor],(err, asesor) => {
                if (err) {
                  console.log(err);
                  res.render('error', {
                     user: req.user,
                     message:"Ha ocurrido un error.",
                     error: err
                   });
                }
                var montoinicial= encrypt(req.body.montoi)
                var montoadar= encrypt(req.body.montod)
                if (asesor.length) {
                  connection.query('insert into prestamo values (0,?,?,?,?,?,?)',[cliente[0].id_cli,asesor[0].id_ase,f,montoinicial,req.body.montoi,montoadar],(err, result) => {
                    if (err) {
                      console.log(err);
                      res.render('error', {
                         user: req.user,
                         message:"Ha ocurrido un error.",
                         error: err
                       });
                    }
                    res.render('agregarprestamo', {
                      user: req.user,
                      message: 'El prestamo del cliente ' +req.body.cliente+ ' registrado con éxito'
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
  }

  controller.gerentes = (req, res) => {
    connection.query('select * from gerente', (err, gerentes) => {
      if (err) {
        console.log(err);
        res.render('error', {
           user: req.user,
           message:"Ha ocurrido un error.",
           error: err
         });
      }
      var dgerentes=[];
      for (var i = 0; i < gerentes.length; i++) {
        var gerente = {
          id_ger: gerentes[i].id_ger,
          nom_ger: decrypt(gerentes[i].nom_ger),
          ema_ger: gerentes[i].ema_ger,
          tel_ger: decrypt(gerentes[i].tel_ger),
        };
        dgerentes.push(gerente)
      }
      res.render('', {
        user: req.user,
        gerentes: dgerentes
     });
    });
  }

  controller.gerenteyasesores= (req, res) => {
    const { id }  = req.params;
      console.log(id);
      connection.query('select * from gerente where id_ger = ?',[id],(err, rows)=>{
        if (err) {
          console.log(err);
          res.render('error', {
             user: req.user,
             message:"Ha ocurrido un error.",
             error: err
           });
        }
        if (!rows.length) {
          res.send('No existe el gerente');
        }
        else {
          connection.query('select * from jerarquia natural join gerente natural join asesor natural join zona where id_ger = ?',[id], (err, gerenteyasesores) => {
            if (err) {
              console.log(err);
              res.render('error', {
                 user: req.user,
                 message:"Ha ocurrido un error.",
                 error: err
               });
            }
            var gerente = {
              id_ger: gerenteyasesores[0].id_ger,
              nom_ger: decrypt(gerenteyasesores[0].nom_ger),
              ema_ger: gerenteyasesores[0].ema_ger,
              tel_ger: decrypt(gerenteyasesores[0].tel_ger),
            };
            var dasesores = [];
            console.log(gerenteyasesores);
            for (var i = 0; i < gerenteyasesores.length; i++) {
              var asesor= {
                id_ase: gerenteyasesores[i].id_ase,
                nom_ase: decrypt(gerenteyasesores[i].nom_ase),
                ema_ase: gerenteyasesores[i].ema_ase,
                tel_ase: decrypt(gerenteyasesores[i].tel_ase),
                nom_zona: gerenteyasesores[i].nom_zon
              }
              dagenda.push(asesor);
            }
            res.render('ad-gerente', {
              user: req.user,
              gerente: gerente,
              asesores: dasesores
            });
          });
        }
      });
  }

  controller.asesoryclientes = (req, res) => {
    const { id }  = req.params;
      console.log(id);
      connection.query('select * from asesor where id_ase = ?',[id],(err, rows) =>{
        if (err) {
          console.log(err);
          res.render('error', {
             user: req.user,
             message:"Ha ocurrido un error.",
             error: err
           });
        }
        if (!rows.length) {
          res.send('No existe el gerente');
        }
        else {
          connection.query('select * from prestamo natural join cliente natural join asesor natural join zona where id_ase = ? and mof_pre != 0',[id], (err, asesorycartera) => {
            if (err) {
              console.log(err);
              res.render('error', {
                 user: req.user,
                 message:"Ha ocurrido un error.",
                 error: err
               });
            }
            if (asesorycartera.length) {
              var asesor= {
                nom_ase: decrypt(asesorycartera[0].nom_ase),
                ema_ase: asesorycartera[0].ema_ase,
                tel_ase: decrypt(asesorycartera[0].tel_ase),
                nom_zona: asesorycartera[0].nom_zon
              }
              var dcartera=[];
              for (var i = 0; i < asesorycartera.length; i++) {
                var cliente= {
                  id_cli: asesorycartera[i].id_cli,
                  nom_cli: decrypt(asesorycartera[i].nom_cli),
                  ema_cli: asesorycartera[i].ema_cli,
                  din_cli: decrypt(asesorycartera[i].din_cli),
                  dih_cli: decrypt(asesorycartera[i].dih_cli),
                  tel_cli: decrypt(asesorycartera[i].tel_cli)
                };
                dcartera.push(cliente);
              }
              console.log(dcartera);
              console.log(asesor);
              connection.query('select * from jerarquia natural join gerente where id_ase = ?',[id], (err, result) => {
                if (err) {
                  console.log(err);
                  res.render('error', {
                     user: req.user,
                     message:"Ha ocurrido un error.",
                     error: err
                   });
                }
                var gerente = {
                  id_ger: result[0].id_ger,
                  nom_ger: decrypt(result[0].nom_ger),
                  ema_ger: result[0].ema_ger,
                  tel_ger: decrypt(result[0].tel_ger),
                };
                console.log(gerente);
                res.render('', {
                  user: req.user,
                  asesor: asesor,
                  gerente: gerente,
                  cartera: dcartera
               });
              });
            }
            else {
              connection.query('select * from jerarquia natural join asesor natural join gerente natural join zona where id_ase= ?',[id],(err, result) => {
                if (err) {
                  console.log(err);
                  res.render('error', {
                     user: req.user,
                     message:"Ha ocurrido un error.",
                     error: err
                   });
                }
                var asesor= {
                  nom_ase: decrypt(result[0].nom_ase),
                  ema_ase: result[0].ema_ase,
                  tel_ase: decrypt(result[0].tel_ase),
                  nom_zona: result[0].nom_zon
                };
                var gerente = {
                  id_ger: result[0].id_ger,
                  nom_ger: decrypt(result[0].nom_ger),
                  ema_ger: result[0].ema_ger,
                  tel_ger: decrypt(result[0].tel_ger),
                };
                console.log(asesor);
                console.log(gerente);
                res.render('', {
                  user: req.user,
                  asesor: asesor,
                  gerente: gerente,
                  msg: 'El asesor no tiene una cartera actual'
               });
              });
            }
          });
        }
      });
  }

  controller.consultarcliente = (req, res) => {
          const { id }  = req.params;
          console.log(id);
          connection.query('select * from cliente where id_cli = ?',[id],(err, rows)=>{
            if (err) {
              console.log(err);
              res.render('error', {
                 user: req.user,
                 message:"Ha ocurrido un error.",
                 error: err
               });
            }
            if (!rows.length) {
              res.send('No existe el gerente');
            }
            else {
              connection.query('select * from cliente natural join prestamo natural join asesor natural join zona where id_cli= ?',[id], (err, result) => {
                if (err) {
                  console.log(err);
                  res.render('error', {
                     user: req.user,
                     message:"Ha ocurrido un error.",
                     error: err
                   });
                }
                if (result.length) {
                  var cliente= {
                    id_cli: result[0].id_cli,
                    nom_cli: decrypt(result[0].nom_cli),
                    ema_cli: result[0].ema_cli,
                    din_cli: decrypt(result[0].din_cli),
                    dih_cli: decrypt(result[0].dih_cli),
                    tel_cli: decrypt(result[0].tel_cli)
                  };
                  var dprestamos=[];
                  for (var i = 0; i < result.length; i++) {
                    var prestamo = {
                      id_pre: result[i].id_pre,
                      fec_pre: result[i].fec_pre,
                      moi_pre: decrypt(result[i].moi_pre),
                      mof_pre: result[i].mof_pre,
                      mod_pre: decrypt(result[i].mod_pre),
                      nom_ase: decrypt(result[i].nom_ase),
                      ema_ase: result[i].ema_ase,
                      tel_ase: decrypt(result[i].tel_ase),
                      nom_zona: result[i].nom_zon
                    }
                    dprestamos.push(prestamo);
                  }
                  console.log(dprestamos);
                  connection.query('select * from cliente natural join prestamo natural join asesor natural join zona natural join historialpagos where id_cli= ? and mof_pre != 0',[id],(err, result1) => {
                    if (err) {
                      console.log(err);
                      res.render('error', {
                         user: req.user,
                         message:"Ha ocurrido un error.",
                         error: err
                       });
                    }
                    var asesor= {
                      nom_ase: decrypt(result1[0].nom_ase),
                      ema_ase: result1[0].ema_ase,
                      tel_ase: decrypt(result1[0].tel_ase),
                      nom_zona: result1[0].nom_zon
                    }
                    var cliente= {
                      id_cli: result1[0].id_cli,
                      nom_cli: decrypt(result1[0].nom_cli),
                      ema_cli: result1[0].ema_cli,
                      din_cli: decrypt(result1[0].din_cli),
                      dih_cli: decrypt(result1[0].dih_cli),
                      tel_cli: decrypt(result1[0].tel_cli)
                    };
                    var prestamo = {
                        id_pre: result1[0].id_pre,
                        fec_pre: result1[0].fec_pre,
                        moi_pre: decrypt(result1[0].moi_pre),
                        mof_pre: result1[0].mof_pre,
                        mod_pre: decrypt(result1[0].mod_pre)
                    }
                    console.log(asesor);
                    console.log(cliente);
                    console.log(prestamo);
                    res.render('', {
                      user: req.user,
                      cliente: cliente,
                      asesor: asesor,
                      hprestamos: dprestamos,
                      prestamo: prestamo,
                      pagos: result1
                   });
                  });
                }
                else {
                  connection.query('select * from cliente natural join prestamo natural join asesor natural join zona natural join historialpagos where id_cli= ? and mof_pre != 0',[id],(err, result1) => {
                    if (err) {
                      console.log(err);
                      res.render('error', {
                         user: req.user,
                         message:"Ha ocurrido un error.",
                         error: err
                       });
                    }
                    var asesor= {
                      nom_ase: decrypt(result1[0].nom_ase),
                      ema_ase: result1[0].ema_ase,
                      tel_ase: decrypt(result1[0].tel_ase),
                      nom_zona: result1[0].nom_zon
                    }
                    var cliente= {
                      id_cli: result1[0].id_cli,
                      nom_cli: decrypt(result1[0].nom_cli),
                      ema_cli: result1[0].ema_cli,
                      din_cli: decrypt(result1[0].din_cli),
                      dih_cli: decrypt(result1[0].dih_cli),
                      tel_cli: decrypt(result1[0].tel_cli)
                    };
                    var prestamo = {
                        id_pre: result1[0].id_pre,
                        fec_pre: result1[0].fec_pre,
                        moi_pre: decrypt(result1[0].moi_pre),
                        mof_pre: result1[0].mof_pre,
                        mod_pre: decrypt(result1[0].mod_pre)
                    }
                    console.log(cliente);
                    console.log(prestamo);
                    console.log(asesor);
                    res.render('', {
                      user: req.user,
                      cliente: cliente,
                      asesor: asesor,
                      prestamo: prestamo,
                      pagos: result1
                   });
                  });
                }
              });
            }
          });
    };

    controller.clientes= (req, res) => {
      connection.query('select * from cliente',(err, rows)=>{
        if (err) {
          console.log(err);
          res.render('error', {
             user: req.user,
             message:"Ha ocurrido un error.",
             error: err
           });
        }
        if (rows.length) {
          var dclientes=[];
          for (var i = 0; i < rows.length; i++) {
            var cliente= {
              id_cli: rows[i].id_cli,
              nom_cli: decrypt(rows[i].nom_cli),
              ema_cli: rows[i].ema_cli,
              din_cli: decrypt(rows[i].din_cli),
              dih_cli: decrypt(rows[i].dih_cli),
              tel_cli: decrypt(rows[i].tel_cli)
            };
            dclientes.push(cliente);
          }
          res.render('', {
             user: req.user,
             clientes: dclientes
           });
        }
        else {
          res.render('', {
             user: req.user,
             msg: 'No hay clientes registrados'
           });
        }
      });
    }

    controller.capital = (req, res) =>{
      var dt = new Date();
      var month = dt.getMonth()+1;
      var day = dt.getDate();
      var year = dt.getFullYear();
      var f= year + '-' + month + '-' + day;
      var entrante=0;
      var saliente=0;
      connection.query('SELECT * from historialpagos where fec_pag = ?',[f],(err, result)=>{
        if (err) {
          console.log(err);
          res.render('error', {
             user: req.user,
             message:"Ha ocurrido un error.",
             error: err
           });
        }
        if (result.length) {
          for (var i = 0; i < result.length; i++) {
            entrante= entrante + parseInt(result[i].mon_pag);
          }
          console.log(entrante);
          connection.query('select * from prestamo where fec_pre = ?',[f],(err, rows)=>{
            if (err) {
              console.log(err);
              res.render('error', {
                 user: req.user,
                 message:"Ha ocurrido un error.",
                 error: err
               });
            }
            if (rows.length) {
              for (var i = 0; i < rows.length; i++) {
                var mon = decrypt(rows[i].moi_pre);
                saliente = saliente + parseInt(mon);
              }
              console.log('ent ' +entrante);
              console.log('sal ' +saliente);
              res.render('', {
                 user: req.user,
                 entrante: entrante,
                 saliente: saliente
              });
            }
            else {
              console.log(entrante);
              res.render('', {
                 user: req.user,
                 entrante: entrante,
                 saliente: 0,
              });
            }
          });
        }
        else {
          connection.query('select * from prestamo where fec_pre = ?',[f],(err, rows)=>{
            if (err) {
              console.log(err);
              res.render('error', {
                 user: req.user,
                 message:"Ha ocurrido un error.",
                 error: err
               });
            }
            if (rows.length) {
              for (var i = 0; i < rows.length; i++) {
                var mon = decrypt(rows[i].moi_pre);
                saliente = saliente + parseInt(mon);
              }
              console.log(saliente);
              res.render('', {
                 user: req.user,
                 entrante: 0,
                 saliente: saliente
              });
            }
            else {
              res.render('', {
                 user: req.user,
                 entrante: 0,
                 saliente: 0,
              });
            }
          });
        }
      });
    }


module.exports = controller;
