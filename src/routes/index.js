const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hola mundo');
});

router.get('/acerca-de', (req, res) => {
    res.send('Acerca de');
});

module.exports = router;