const router = require('express').Router();

// Ruta para mostrar la vista de iniciar sesión
router.get('/users/singin', (req, res) => {
    res.render('users/singin');
});

// Ruta para mostrar la vista de registrarme
router.get('/users/singup', (req, res) => {
    res.render('users/singup');
});

// Ruta para registrar los datos de un usuario
router.post('/users/singup', (req, res) => {
    const { name, email, password, checkpassword } = req.body;
    const errors = [];

    if( password != checkpassword){
        errors.push({ text: 'La contraseña no coinciden'});
    }

    if( password.length > 4 ){
        errors.push({ text : 'La contraseña debe ser mayor a 4 caracteres'});
    }

    if( errors.length > 0  ){
        res.render('users/singup', { errors, name, email, password, checkpassword });
    }else{
        res.send(`${name} - ${email} - ${password} - ${checkpassword} `);
    }
});

module.exports = router;