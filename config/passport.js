var LocalStrategy   = require('passport-local').Strategy;

const crypto = require('crypto');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
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
  };

  function decrypt(text){
    var decipher = crypto.createDecipheriv('aes-256-cbc', keyto, iv)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  };

module.exports = (passport) =>
{
    passport.serializeUser((user, done) =>
    {
        done(null, user.id_usu);
    });
    passport.deserializeUser((id, done) =>
    {
        connection.query("SELECT * FROM usuario WHERE id_usu = ? ",[id], (err, rows) =>
        {
            if (err) {
              return done(err);
              console.log(err);
            }
            var tipo=rows[0].id_tus;
            var nom= rows[0].nom_usu;

            switch (tipo)
            {
                case 1:
                    connection.query("select cliente.*,use_usu, id_tus from cliente inner join usuario on nom_cli = ? and nom_usu= ?",[nom, nom], (err, rows1) =>
                    {
                        if (err) {
                          return done(err);
                          console.log(err);
                        }
                        else {
                          console.log(rows1[0].id_cli);
                          connection.query('SELECT id_pre from prestamo where id_cli= ? order by id_pre DESC',[rows1[0].id_cli], (err, idpre) => {
                            console.log(idpre);
                            if (err) {
                                console.log(err);
                                return done(err);
                            }
                            var usuario = {
                              id_cli: rows1[0].id_cli,
                              nom_cli: decrypt(nom),
                              ema_cli: rows1[0].ema_cli,
                              din_cli: decrypt(rows1[0].din_cli),
                              dih_cli: decrypt(rows1[0].dih_cli),
                              tel_cli: decrypt(rows1[0].tel_cli),
                              id_tus: rows1[0].id_tus,
                              id_pre: idpre[0].id_pre,
                              use_usu: rows1[0].use_usu
                            };
                            console.log(usuario);
                            done(err, usuario);
                          });
                        }
                      });
                  break
                case 2:
                    connection.query("SELECT asesor.*,use_usu, id_tus FROM asesor inner join usuario on nom_ase = ? and nom_usu = ?",[nom, nom], (err, rows1) =>
                    {
                        if (err) {
                          console.log(err);
                          return done(err);
                        }
                        else {
                          var asesor = {
                            id_ase: rows1[0].id_ase,
                            nom_ase: decrypt(nom),
                            ema_ase: rows1[0].ema_ase,
                            tel_ase: decrypt(rows1[0].tel_ase),
                            id_tus: rows1[0].id_tus,
                            use_usu: rows1[0].use_usu
                            };
                            done(err, asesor);
                        }

                    });
                    break
                case 3:
                    connection.query("SELECT gerente.*, use_usu,id_tus FROM gerente inner join usuario on nom_ger = ? and nom_usu = ?",[nom, nom], (err, rows1) =>
                    {
                      if (err) {
                        console.log(err);
                        return done(err);
                      }
                      else {
                        var gerente = {
                          id_ger: rows1[0].id_ger,
                          nom_ger: decrypt(nom),
                          ema_ger: rows1[0].ema_ger,
                          tel_ger: decrypt(rows1[0].tel_ger),
                          id_tus: rows1[0].id_tus,
                          use_usu: rows1[0].use_usu
                          };
                          done(err,gerente);
                        }
                    });
                    break
                default:
                        var admin= {
                            id_usu: rows[0].id_usu,
                            id_tus: rows[0].id_tus,
                            use_usu: rows[0].use_usu
                        };
                        done(err, admin);
                    break

            }
        });
    });
/*
    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField : 'username',
                typeField : 'type',
                passwordField : 'password',
                passReqToCallback : true
            },
        (req, username, password, type, done) =>
        {
            connection.query("SELECT * FROM usuario WHERE nom_usu = ?",[username], (err, rows) =>
            {
                if (err)
                    return done(err);
                if (rows.length)
                    return done(null, false, req.flash('signupMessage', 'Usuario existente'));
                else {
                    var newUserMysql =
                    {
                        id_tus: type,
                        nom_usu: username,
                        con_usu: bcrypt.hashSync(password, null, null)
                    };
                    console.log(newUserMysql.password);
                    var insertQuery = "INSERT INTO usuario ( nom_usu, con_usu, id_tus ) values (?,?,?)";

                    connection.query(insertQuery,[newUserMysql.nom_usu, newUserMysql.con_usu, newUserMysql.id_tus],(err, rows) =>
                    {
                        if (err)
                            console.log(err);
                        newUserMysql.id_usu = rows.insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );
    */
    passport.use(
        'local-login',
        new LocalStrategy(
        {
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        (req, username, password, done) =>
        {

            connection.query("SELECT * FROM usuario WHERE use_usu = ?",[username], (err, rows) =>
            {
                if (err)
                    return done(err);
                if (!rows.length)
                    return done(null, false, req.flash('loginMessage', 'Usuario inexistente'));
                if (!bcrypt.compareSync(password, rows[0].con_usu))
                    return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'));

                return done(null, rows[0]);
            });
        })
    );




};
