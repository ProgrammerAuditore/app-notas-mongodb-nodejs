const express = require('express');
const path = require('path');

// ! Initializations
const app = express();

// ! Settings
app.set('port', process.env.PORT || 3000);

//  Establacer la ruta para las vistas
app.set('views', path.join(__dirname, 'views'));

// ! Middlewares

// ! Global variables

// ! Routes

// ! Static Files

// ! Server is listening
app.listen(app.get('port') , () => {
    console.log('Server on port ', app.get('port'));
});



