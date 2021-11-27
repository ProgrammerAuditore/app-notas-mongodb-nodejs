const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/acerca-de', (req, res) => {
    res.render('acerca-de');
});

module.exports = router;