const cons = require('../modules/ConsultaMysql');
const aut = require('./auto.js');
const autorizacion = [aut.requiresLogin];

module.exports = function(app, passport)
{
    app.get('/', (req, res, next) =>
    {
        res.render('index',
        {
            message: req.flash('loginMessage'),
            title: 'Presta Express Negocios'
        });
    });
    app.post('/iniciosesion', passport.authenticate('local-login',
    {
        successRedirect : '/inicio',
        failureRedirect : '/',
        failureFlash : true
    }));

    app.get('/agregarusuario', autorizacion,(req, res, next) =>
    {
        res.render('agregarusu',
        {
            user: req.user,
        });
    });

    app.get('/inicio', autorizacion, cons.home);

    app.get('/cliasesor', autorizacion, cons.asesor);

    app.get('/chat', isLoggedIn, (req, res) =>
    {
  		res.render('chat',
          {
              title: 'Chat',
              user : req.user
  		});
  	});
    app.get('/sesion', isLoggedIn, (req, res) =>
    {
  		res.render('sesion',
          {
              title: 'Sesión',
              user : req.user,
              message:''
  		});
  	});

    app.post('/sesion', autorizacion, cons.mcontraseña);

    app.post('/agregarusuario', autorizacion, cons.agregarusu);

    app.get('/logout', autorizacion,(req, res) =>
    {
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next) {
 if (req.isAuthenticated()) return next();
 if (req.method == 'GET') req.session.returnTo = req.originalUrl;
 res.redirect('/');
};
