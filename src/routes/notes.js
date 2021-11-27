const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('Mis notas');
});

module.exports = router;