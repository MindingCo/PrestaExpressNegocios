var LocalStrategy   = require('passport-local').Strategy;

const crypto = require('crypto');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
let iv = 'asdpiadsjfasdfxw';
let key = 'cdsadskjldsdskjd';
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
                    connection.query("select cliente.*, id_tus, id_pre, nom_ase, fec_pre, moi_pre, mof_pre, mod_pre from cliente natural join prestamo natural join asesor natural join usuario where nom_cli = ? and mof_pre != 0 limit 1;",[nom, nom], (err, rows1) =>
                    {
                        // console.log('Este es el error');
                        // console.log(err);
                        // console.log('Esta la columna');
                        // console.log(rows1);

                        done(err, rows1[0]);
                    });
                    break
                case 2:
                    connection.query("SELECT asesor.*, nom_usu,id_tus FROM asesor inner join usuario on nom_ase = ? and nom_usu = ?",[nom, nom], (err, rows1) =>
                    {
                        // console.log('Este es el error');
                        // console.log(err);
                        // console.log('Esta la columna');
                        // console.log(rows1);
                        done(err, rows1[0]);
                    });
                    break
                case 3:
                    connection.query("SELECT gerente.*, nom_usu,id_tus FROM gerente inner join usuario on nom_ger = ? and nom_usu = ?",[nom, nom], (err, rows1) =>
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
