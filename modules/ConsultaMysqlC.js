const controller = {};

var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
const crypto = require('crypto');
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
};

controller.asesor = (req, res) => {
    connection.query('SELECT id_ase,nom_ase,ema_ase,tel_ase,nom_zon FROM prestamo natural join asesor natural join zona WHERE id_cli = ? AND mof_pre != 0',[req.user.id_cli],(err, ase) => {
      console.log(req.user);
      console.log(ase);
       if (err) {
         console.log(err);
         res.render('error', {
            user: req.user,
            message:"Ha ocurrido un error.",
            error: err
          });
       }
       if(ase.length){
         var asesor= {
           id_ase: ase[0].id_ase,
           nom_ase: decrypt(ase[0].nom_ase),
           ema_ase: ase[0].ema_ase,
           tel_ase: decrypt(ase[0].tel_ase),
           nom_zon: ase[0].nom_zon
         }
         connection.query('Select * from jerarquia natural join gerente where id_ase = ?',[asesor.id_ase], (err, ger) => {
           if (err){
             console.log(err);
             res.render('error', {
                user: req.user,
                message:"Ha ocurrido un error.",
                error: err
              });
           }
           var gerente= {
             id_ger: ger[0].id_ger,
             nom_ger: decrypt(ger[0].nom_ger),
             ema_ger: ger[0].ema_ger,
             tel_ger: decrypt(ger[0].tel_ger)
           }
           res.render('asesor', {
              user: req.user,
              asesor: asesor,
              gerente: gerente
           });
         });
       }
       else {
         res.render('asesor', {
            user: req.user,
            msg: 'No tienes asesor en este momento'
         });
       }
    });
};



module.exports = controller;
