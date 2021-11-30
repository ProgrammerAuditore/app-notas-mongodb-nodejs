const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

// Ruta para mostrar la vista de iniciar sesión
router.get('/users/singin', (req, res) => {
    res.render('users/singin');
});

// Ruta para iniciar sesión de un usuario
router.post('/user/singin', passport.authenticate('local', {
    successRedirect : '/notes',
    failureRedirect : '/users/signin',
    failureFlash : true
}));

// Ruta para mostrar la vista de registrarme
router.get('/users/singup', (req, res) => {
    res.render('users/singup');
});

// Ruta para registrar los datos de un usuario
router.post('/users/singup', async (req, res) => {
    const { name, email, password, checkpassword } = req.body;
    const errors = [];

    if( checkpassword.length <= 0 || password.length <= 0){
        errors.push({ text : 'Verifique los campos de password' });
    }

    if( name.length <= 0 || email.length <= 0 ){
        errors.push({ text: 'Verifique el campo nombre y email'});
    } else {
        if( password != checkpassword){
            errors.push({ text: 'La contraseña no coinciden'});
        }

        if( password.length < 4  ){
            errors.push({ text : 'La contraseña debe ser mayor a 4 caracteres'});
        }
    }

    if( errors.length > 0  ){
        res.render('users/singup', { errors, name, email, password, checkpassword });
    }else{
        
        // Buscar un usuario por email
        const emailUser = await User.findOne({ email : email });

        // Verificar si el usuario a registrar existe
        if(emailUser){
            req.flash('error_msg', 'El email no está disponible.');
            res.redirect('/users/singup');
        }

        // Crear un nuevo usario
        const nuevoUsuario = new User({name, email, password});

        // Encriptar la contraseña del usuario
        nuevoUsuario.password = await nuevoUsuario.encrypPassword(password);
        
        // Registrar usuario
        await nuevoUsuario.save();

        req.flash('success_msg', 'Se registro exitosamente.');
        res.redirect('/users/singin');

        //res.send(`${name} - ${email} - ${password} - ${checkpassword} `);
    }
});

module.exports = router;