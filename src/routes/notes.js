const router = require('express').Router();

const Note = require('../models/Note');

// Ruta para crear una nota
router.get('/notes/add', (req, res) => {
    res.render('notes/nueva-nota');
});

// Ruta para recibir datos al crear una nota
router.post('/notes/new-note', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];

    if(!title) {
        errors.push({text: 'Por favor, inserte un titulo'});
    }

    if(!description) {
        errors.push({text: 'Por favor, escriba una descripción'});
    }

    if( errors.length > 0){
        // Renderizar vista con errores
        res.render('notes/nueva-nota', { errors, title, description });

    } else {
        // Guardar datos en la base de datos
        const notaNueva = new Note({ title, description });
        await notaNueva.save();

        // Redireccionar
        res.redirect ('/notes');
    }
});

// Ruta para ver notas de un usuario
router.get('/notes', async (req, res) => {

    // Obtener todo los datos
    // * Solventar el error:
    // * https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access
    const notes = await Note.find({}).lean().sort({ date: 'desc' });

    // Mostrar las notas
    res.render('notes/all-notes', { notes });

});

module.exports = router;