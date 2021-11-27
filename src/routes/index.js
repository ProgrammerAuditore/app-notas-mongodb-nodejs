const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hola mundo');
});

module.exports = router;