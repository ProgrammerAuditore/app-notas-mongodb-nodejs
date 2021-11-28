const router = require('express').Router();

// Ruta para crear una nota
router.get('/notes/add', (req, res) => {
    res.render('notes/nueva-nota');
});

// Ruta para ver notas de un usuario
router.get('/notes', (req, res) => {
    res.send('Mis notas');
});

module.exports = router;