const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notes-db-app')
    .then( db => console.log('Database Connected...'))
    .catch( err => console.log(err));


