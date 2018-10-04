module.exports = function(app, passport) {

  /* GET home page. */
  app.get('/', (req, res, next) =>
  {
      res.render('index',
      {
          message: req.flash('loginMessage'),
          title: 'Presta Express Negocios'
      });
  });

  app.post('/iniciosesion', passport.authenticate('local-login', {
            successRedirect : '/inicio',
            failureRedirect : '/',
            failureFlash : true
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
		res.redirect('/');
	    });

  app.get('/inicio', isLoggedIn, function(req, res) {
		res.render('home', {
			user : req.user
		});
	});

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}
