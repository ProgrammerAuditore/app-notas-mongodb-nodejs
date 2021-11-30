const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Definir una estrategia de autenticación
passport.use(new LocalStrategy({
    usernameField : 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email : email});
    if(!user){
        return done(null, fails, { message : 'Usuari no encontrado' });
    }else{
        const match = await User.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, { message : 'Contraseña incorrecto' });
        }
    }
}));

// Almacenar el ID del usuario autenticado
passport.serializeUser( (user, done) => {
    done(null, user.id);
}); 

// Obtener el usuario y su ID del usuario autenticado
passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });  
});
