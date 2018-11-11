const controller = {};

const crypto = require('crypto');
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

  controller.agenda = (req, res) => {
          console.log(req.user);
          connection.query('select id_ase,nom_ase,ema_ase,tel_ase,nom_zon from jerarquia natural join asesor natural join zona where id_ger = ?',[req.user.id_ger], (err, agenda) => {
            if (err) {
             console.log(err);
             res.json(err);
            }
            var dagenda= [];
            for (var i = 0; i < agenda.length; i++) {
              var asesor= {
                id_ase: agenda[i].id_ase,
                nom_ase: decrypt(agenda[i].nom_ase),
                ema_ase: agenda[i].ema_ase,
                tel_ase: decrypt(agenda[i].tel_ase),
                nom_zona: agenda[i].nom_zon
              }
              dagenda.push(asesor);
            }
            connection.query('Select * from cliente', (err, clientes) => {
                if(err) console.log(err);
                console.log(clientes);
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
                res.render('G-agenda', {
                  user: req.user,
                  asesores: dagenda,
                  clientes: dclientes
                });
            });
          });
        };


  controller.consultarasesor = (req, res) => {
            const { id }  = req.params;
              console.log(id);
              connection.query('select id_cli,nom_cli,ema_cli,din_cli,dih_cli,tel_cli,nom_ase,ema_ase,tel_ase,nom_zon from prestamo natural join cliente natural join asesor natural join zona where id_ase = ? and mof_pre != 0',[id], (err, asesorycartera) => {
                if (err) {
                console.log(err);
                res.json(err);
                }
                console.log(asesorycartera);
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
                  console.log(cliente);
                }
                res.render('asesorycartera', {
                  user: req.user,
                  asesor: asesor,
                  clientes: dcartera
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
              else {
                var dcliente= {
                  id_cli: cliente[0].id_cli,
                  nom_cli: decrypt(cliente[0].nom_cli),
                  ema_cli: cliente[0].ema_cli,
                  din_cli: decrypt(cliente[0].din_cli),
                  dih_cli: decrypt(cliente[0].dih_cli),
                  tel_cli: decrypt(cliente[0].tel_cli)
                }
                console.log(cliente);
                res.render('g-cliente', {
                  user: req.user,
                  cliente: dcliente,
                  pagos: cliente
                });
              }
            });
      };

module.exports = controller;
