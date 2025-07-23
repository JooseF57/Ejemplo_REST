const mongoose = require('mongoose');

const palapSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    existencia: {
        type: Number,
        default: 10
    }
});

const palapModel = mongoose.model('bebidas', palapSchema);

module.exports = palapModel;
