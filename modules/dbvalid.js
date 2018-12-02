var mysql = require('mysql');
var dbconfig = require('../config/database');
var valid= require('./valid.js');
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


const valids= {
  agcliente: cliente =>{
    return new Promise((resolve, reject) => {
      con.query('SELECT id_cli FROM CLIENTE WHERE ema_cli=', [encrypt(admin.cor)], (err, result) => {
      if (err)
        throw err;
      if (result.length == 0)
        return resolve({"response":0});
      return resolve({"response":1 , "nombre":result[0].nom_adm})
      });
    });
};
