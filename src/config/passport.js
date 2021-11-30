const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Definir una estrategia de autenticación
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false, { message : 'Usuario no registrado.'}); }
          if (!user.matchPassword(password)) { return done(null, false, { message : 'La contraseña es incorrecta.' }); }
          return done(null, user);
        });
    }
));

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
