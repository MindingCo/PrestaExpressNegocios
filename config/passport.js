var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id_usu);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM usuario WHERE id_usu = ? ",[id], function(err, rows){
            console.log(err);
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            connection.query("SELECT * FROM usuario WHERE nom_usu = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'Usuario existente'));
                } else {
                    var newUserMysql = {
                        nom_usu: username,
                        con_usu: bcrypt.hashSync(password, null, null)
                    };
                    console.log(newUserMysql.password);
                    var insertQuery = "INSERT INTO usuario ( nom_usu, con_usu, id_tus ) values (?,?,1)";

                    connection.query(insertQuery,[newUserMysql.nom_usu, newUserMysql.con_usu],function(err, rows) {
                      if (err) {
                        console.log(err);
                      }
                        newUserMysql.id_usu = rows.insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            connection.query("SELECT * FROM usuario WHERE nom_usu = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Usuario inexistente'));
                }

                if (!bcrypt.compareSync(password, rows[0].con_usu))
                    return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'));

                return done(null, rows[0]);
            });
        })
    );
};
