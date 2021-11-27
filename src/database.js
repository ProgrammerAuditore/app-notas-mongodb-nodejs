const mongoose = require('mongoose');

// Establecer la conexión de base de datos MongoDB usando moongose
mongoose.connect('mongodb://localhost/notes-db-app')
    .then( db => console.log('Database Connected...'))
    .catch( err => console.log(err));


