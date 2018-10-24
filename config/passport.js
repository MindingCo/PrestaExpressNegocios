var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

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
            // console.log(err);
            var tipo=rows[0].id_tus;
            var nom=rows[0].nom_usu;
            switch (tipo)
            {
                case 1:
                    connection.query("SELECT cliente.*, nom_usu, id_tus FROM cliente inner join usuario on nom_cli = ? and nom_usu = ?",[nom, nom], (err, rows1) =>
                    {
                        // console.log('Este es el error');
                        // console.log(err);
                        // console.log('Esta la columna');
                        // console.log(rows1);
                        done(err, rows1[0]);
                    });
                    break
                case 2:
                    connection.query("SELECT asesor.*, nom_usu, id_tus FROM asesor inner join usuario on nom_ase = ? and nom_usu = ?",[nom, nom], (err, rows1) =>
                    {
                        // console.log('Este es el error');
                        // console.log(err);
                        // console.log('Esta la columna');
                        // console.log(rows1);
                        done(err, rows1[0]);
                    });
                    break
                case 3:
                    connection.query("SELECT gerente.*, nom_usu, id_tus FROM gerente inner join usuario on nom_ger = ? and nom_usu = ?",[nom, nom], (err, rows1) =>
                    {
                        // console.log('Este es el error');
                        // console.log(err);
                        // console.log('Esta la columna');
                        // console.log(rows1);
                        done(err, rows1[0]);
                    });
                    break
                default:
                        done(err, rows[0]);
                    break

            }

        });
    });

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
            connection.query("SELECT * FROM usuario WHERE nom_usu = ?",[username], (err, rows) =>
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


    passport.use(
        'mcontra',
        new LocalStrategy(
        {
            contraantigua : 'contraactual',
            nuevacontra : 'newcontra',
            connuevacontra: 'connewacontra'
        },
        (req, contraantigua, nuevacontra, connuevacontra,done) =>
        {
          if (nuevacontra != connuevacontra) {
            return done(null, false, req.flash('mcontraMessage', 'La nueva contraseña no coincide en los campos'));
          }
          connection.query("SELECT * FROM usuario WHERE id_usu = ?",[req.user.id_cli], (err, rows) =>
            {
                if (err)
                    return done(err);
                if (!bcrypt.compareSync(contraantigua, rows[0].con_usu))
                    return done(null, false, req.flash('mcontraMessage', 'La contraseña actual no coincide'));
                var con_usu= bcrypt.hashSync(nuevacontra, null, null)
                connection.query("UPDATE usuario set con_usu= ? where id_usu = ?",[con_usu,req.user.id_cli], (err, rows) =>
                      {
                          if (err)
                              return done(err);
                          connection.query("SELECT * from usuario where id_usu= ?",[req.user.id_cli], (err, rows) =>
                                    {
                                        if (err)
                                            return done(err);
                                        return done(null, rows[0]);
                          });
                    });
            });
        })
    );



};
