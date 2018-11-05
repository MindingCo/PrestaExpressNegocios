
exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == 'GET') req.session.returnTo = req.originalUrl;
  res.redirect('/');
};

exports.islog = function (req, res, next) {
  if (req.isAuthenticated()) {
      res.redirect('/inicio');
  }
  else {
    return next();
  }
};

exports.cliente = {
  hasAuthorization: function (req, res, next) {
    if (req.user.id_tus != 1) {
      req.flash('info', 'No estás autorizado para la página');
      return res.redirect('/inicio');
    }
    next();
  }
};

exports.asesor = {
  hasAuthorization: function (req, res, next) {
    if (req.user.id_tus != 2) {
      req.flash('info', 'No estás autorizado para la página');
      return res.redirect('/inicio');
    }
    next();
  }
};

exports.gerente = {
  hasAuthorization: function (req, res, next) {
    if (req.user.id_tus != 3) {
      req.flash('info', 'No estás autorizado para la página');
      return res.redirect('/inicio');
    }
    next();
  }
};

exports.administrador = {
  hasAuthorization: function (req, res, next) {
    if (req.user.id_tus != 4) {
      req.flash('info', 'No estás autorizado para la página');
      return res.redirect('/inicio');
    }
    next();
  }
};
