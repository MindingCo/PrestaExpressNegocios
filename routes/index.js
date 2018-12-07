const cons = require('../modules/ConsultaMysqlU');
const consc = require('../modules/ConsultaMysqlC');
const consas = require('../modules/ConsultaMysqlAs');
const consg = require('../modules/ConsultaMysqlG');
const consad = require('../modules/ConsultaMysqlAd');
const aut = require('./auto.js');

const autorizacion = [aut.requiresLogin];
const autorizacionc = [aut.requiresLogin, aut.cliente.hasAuthorization];
const autorizacionas = [aut.requiresLogin, aut.asesor.hasAuthorization];
const autorizaciong = [aut.requiresLogin, aut.gerente.hasAuthorization];
const autorizacionad = [aut.requiresLogin, aut.administrador.hasAuthorization];
module.exports = function(app, passport)
{
    //routes users
    app.get('/', aut.islog,(req, res, next) =>
    {
        res.render('index',
        {
            message: req.flash('loginMessage'),
            title: 'Presta Express Negocios'
        });
    });
    app.post('/iniciosesion', passport.authenticate('local-login',
    {
        successRedirect : '/home',
        failureRedirect : '/',
        failureFlash : true
    }));

    app.get('/home', autorizacion, cons.home);

    app.get('/inicio', autorizacion, cons.inicio);

    app.get('/sesion', autorizacion, (req, res) =>
    {
      res.render('sesion',
      {
        title: 'Sesión',
        user : req.user
      });
    });

    app.post('/sesion', autorizacion, cons.mcontraseña);

    app.get('/logout', autorizacion,(req, res) =>
    {
      req.logout();
      res.redirect('/');
    });

    // routes cliente

    app.get('/cliente/chat', autorizacionc, (req, res) =>
    {
      res.render('chat',
      {
        title: 'Chat',
        user : req.user
      });
    });

    app.get('/cliente/asesor', autorizacionc, consc.asesor);

    // routes Asesor
    app.get('/asesor/cartera', autorizacionas, consas.cartera);

    app.get('/asesor/cobros', autorizacionas, consas.cobros);

    app.get('/asesor/cliente/:id', autorizacionas,consas.consultarcliente);

    app.post('/asesor/pago/:id', autorizacionas,consas.pago);

    app.get('/asesor/chat', autorizacionas, (req, res) =>
    {
      res.render('chat',
      {
        title: 'Chat',
        user : req.user
      });
    });

    //routes gerente
    app.get('/gerente/agenda', autorizaciong, consg.agenda);

    app.get('/gerente/capital', autorizaciong,consg.capital);

    app.get('/gerente/asesor/:id', autorizaciong,consg.consultarasesor);

    app.get('/gerente/cliente/:id', autorizaciong,consg.consultarcliente);

    app.get('/Localizacion', autorizaciong, (req,res, next) =>
    {
      res.render('Localizacion',
      {
        user : req.user
      });
    });

    //routes Administrador
    app.get('/registrar', autorizacionad,(req, res, next) =>
    {
        res.render('agregarusu',
        {
            user: req.user
        });
    });

    app.post('/admin/agregarusuario', autorizacionad, consad.agregarusu);

    app.get('/admin/agprestamo', autorizacionad,(req, res, next) =>
    {
        res.render('agregarprestamo',
        {
            user: req.user
        });
    });

    app.post('/admin/agpre', autorizacionad, consad.agregarprestamo);

    app.get('/admin/agenda', autorizacionad, consad.gerentes);

    app.get('/admin/gerente/:id', autorizacionad,consad.gerenteyasesores);

    app.get('/admin/asesor/:id', autorizacionad,consad.asesoryclientes);

    app.get('/admin/cliente/:id', autorizacionad,consad.consultarcliente);

    app.get('/admin/capital', autorizacionad,consad.capital);
};
