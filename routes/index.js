var express = require('express')
var mysql = require('mysql')
var router = express.Router()
var consulta = require('../modules/ConsultaMysql');

/* GET home page. */
router.get('/', (req, res, next) =>
{
    res.render('index',
    {
        title: 'Presta Express Negocios'
    });
});

router.post('/iniciosesion', (req, res, next) =>
{
    let nombre = req.body.nombre
    let contraseña = req.body.contraseña

    console.log(nombre)
    console.log(contraseña)

    consulta.connect('n0m3l0', 'pen')
    var sesion = consulta.login(nombre, contraseña)
    console.log('El error es :');
    console.log(sesion.sqlMessage);
    if (sesion) res.render('error', { error: sesion })
    else
    {
        console.log('El arreglo es');
        console.log(sesion);
        res.locals.Sesion = sesion
        res.redirect('/inicio')
    }

    /*var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "SexBob-0mb",
        database: "PEN"
    });

    con.connect(function(err)
    {
        if (err) throw err;
        console.log("Conexion con base completada");
        var sql = 'SELECT nom_usu, pass_usu, nom_tus FROM usu natural join tus WHERE nom_usu = ? AND pass_usu = ?';
        con.query(sql, [nombre, contraseña], function (err, result, fields)
        {
            if (err) throw err
            var Sesion = {
                Nombre: result[0].nom_usu,
                Contraseña: result[0].pass_usu,
                Tipo: result[0].nom_tus
            }
            console.log(Sesion)
        })
    });*/
});

router.get('/inicio', (req, res, next) =>
{
    res.render('home',
    {
        title: 'Inicio',
        sesion: req.Sesion
    });
});

module.exports = router;
