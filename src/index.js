const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// * Solventar el error:
// * https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access
//const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
//const Handlebars = require('handlebars');

// ! Initializations
const app = express();
require('./database');
require('./config/passport');

// ! Settings
app.set('port', process.env.PORT || 3000);

// Establacer la ruta para las vistas
app.set('views', path.join(__dirname, 'views'));

// Configurar el motor de plantillas Express Handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',

    // * Solventar el error:
    // * https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access
    //handlebars: allowInsecurePrototypeAccess(Handlebars)
    
}));

// Utilizar el motor de plantillas para las vistas
app.set('view engine', '.hbs'); 

// ! Middlewares

// Validar información HTTP
app.use(express.urlencoded({extend:false}));
// Para utilizar PUT, DELETE
app.use(methodOverride('_method'));
// Autenticar usuario
app.use(session({
    secret: '/.phrase.secrent./',
    resave: true,
    saveUninitialized: true
}));

// Configuraciones de passport
app.use(passport.initialize());
app.use(passport.session());

// Para mostrar mensajes
app.use(flash());

// ! Global variables
// Mostar mensajes flash en todas las vistas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// ! Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


// ! Static Files
// Configurar la ruta para los archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ! Error 404
app.use(function(req, res, next){
    res.status(404).render('404');
});

// ! Server is listening
app.listen(app.get('port') , () => {
    console.log('Server on port ', app.get('port'));
});




