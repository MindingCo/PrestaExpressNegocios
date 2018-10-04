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

    consulta.connect('Ilovebr3ad', 'pen')
    var sesion = consulta.login(nombre, contraseña, (sesion) =>
    {
        console.log('El arreglo es');
        console.log(sesion);
        res.locals.Sesion = sesion
        res.redirect('/inicio')
    })


});

router.get('/inicio', (req, res, next) =>
{
    res.render('home',
    {
        title: 'Inicio',
        sesion: 'Puta angel'
    });
});

module.exports = router;
