const palapModel = require('../models/palapaModel');

function buscarTodo (req, res) {
    palapModel.find({})
    .then(bebidas =>{
        if (bebidas.length){
            return res.status(200).send({bebidas})
        }
        return res.status(204).send({mensaje: "no hay bebidas disponibles"})
    })
    .catch(error =>{
        return res.status(404).send({mensaje: 'Error en el servidor ${error}'})
    })
}

function agregar (req,res){
    console.log(req.body)
}

module.exports={
    buscarTodo,
    agregar
}