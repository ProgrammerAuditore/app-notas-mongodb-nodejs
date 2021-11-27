const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = requiere('express-session');

// ! Initializations
const app = express();

// ! Settings
app.set('port', process.env.PORT || 3000);

// Establacer la ruta para las vistas
app.set('views', path.join(__dirname, 'views'));

// Configurar el motor de plantillas Express Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

// Utilizar el motor de plantillas para las vistas
app.set('view engine', '.hbs'); 

// ! Middlewares

// Validar información HTTP
app.use(express.urlencoded({extend:false}));
// Para utilizar PUT, DELETE
app.use(methodOverride('_method'));
// Generar 
app.use(session({
    secret: '/.phrase.secrent./',
    resave: true,
    saveUninitialized: true
}));

// ! Global variables

// ! Routes

// ! Static Files

// ! Server is listening
app.listen(app.get('port') , () => {
    console.log('Server on port ', app.get('port'));
});



