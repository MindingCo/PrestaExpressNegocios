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

    /*app.get('/chat', (req, res, next) =>
    {
        res.render('chat',
        {
            title: 'Chat'
        });
    });
    */
    app.get('/chat', isLoggedIn, (req, res) =>
    {
  		res.render('chat',
          {
              title: 'Chat',
              user : req.user
  		});
  	});

  app.get('/inicio', isLoggedIn, (req, res) =>
  {
		res.render('home',
        {
			user : req.user
		});
	});

  app.get('/logout', (req, res) =>
  {
    req.logout();
    res.redirect('/');
  });

};

function isLoggedIn(req, res, next)
{
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}
