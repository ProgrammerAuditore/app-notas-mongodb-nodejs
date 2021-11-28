const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Crear un modelo 
const UserSchema = new Schema({
    name :  { type: 'String', required: true },
    email :  { type: 'String', required: true },
    password :  { type: 'String', required: true }, 
    date : { type: Date, default: Date.now() }
});

// Método de el schema para encriptar contraseñas
UserSchema.methods.encrypPassword = async (password) => {
    const salt = await bcrypt.genSalt(13);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

// Método de el schema para comparar contraseñas
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);