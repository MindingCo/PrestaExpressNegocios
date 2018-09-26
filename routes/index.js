var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Presta Express Negocios' });
});
router.get('/inicio', function(req, res, next) {
    res.render('cliente',{
        title: 'Inicio',
        prueba: 'Holi'
    });
});

module.exports = router;
