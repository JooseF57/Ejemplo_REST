const mongoose = require('mongoose');

const palapSchema = mongoose.Schema({
    name: {
        type: String
        },
        descripcion:{
            type:String,
            required:true
        },
        precio:{
            type:Number,
            required:true
        },
        capacidad:{
            type:Number,
            required:true
        },
        existencia:{
            type:Number,
            default:10
        },



})

const palapModel = mongoose.model('bebidas', palapSchema);

module.exports = palapModel;