const router = require('express').Router();

router.get('/users/singin', (req, res) => {
    res.send('Logiarme');
});

router.get('/users/singup', (req, res) => {
    res.send('Registrarme');
});

module.exports = router;