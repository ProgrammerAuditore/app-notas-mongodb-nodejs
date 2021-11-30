const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth');
const Note = require('../models/Note');

// Ruta para crear una nota
router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/nueva-nota');
});

// Ruta para recibir datos al crear una nota
router.post('/notes/new-note', isAuthenticated, async (req, res) => {
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
        req.flash('success_msg', 'Nota agregada satisfactoriamente.');

        // Redireccionar
        res.redirect ('/notes');
    }
});

// Ruta para ver notas de un usuario
router.get('/notes', isAuthenticated, async (req, res) => {

    // Obtener todo los datos
    // * Solventar el error:
    // * https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access
    const notes = await Note.find({}).lean().sort({ date: 'desc' });

    // Mostar la vista para ver todas las notas del usuario
    res.render('notes/all-notes', { notes });

});

router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {

    // Obtener la ruta deseada
    const note = await Note.findById(req.params.id).lean();

    // Mostar la vista para editar nota
    res.render('notes/edit-note', {note});
});

router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
    const { title, description } = req.body;

    // Actualizar los datos de la nota
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Nota actualizada satisfactoriamente.');

    res.redirect('/notes');
});

router.delete("/notes/delete-note/:id", isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada satisfactoriamente.');
    res.redirect('/notes');
});

module.exports = router;