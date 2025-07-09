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
   // console.log(req.body)
   new palapModel(req.body).save()
   .then(info =>{
    return res.status(200).send({
        mensaje:"la informacion se guardo con exito",
        info
    })
   })
   .catch(e =>{
    return res.status(404).send({
        mensaje :`error al guardar la informacion ${e}`
    })
   })
}

function buscarBebida(req,res,next){
    let consulta = {}
    consulta [req.params.key] = req.params.value
    console.log(consulta)
    palapaModel.find(consulta)
    .then(bebidas => {
        if(!bebidas.length) return next()
            req.body.bebidas = bebidas
        return next()
    })
    .catch(e =>{
        req.body.e = e
        return next()
    })
}

function mostrarBebida(req,res,){
    if (req.body.e) return res.status(404). send({mensaje: "error al consultar la informacion"}) 
        if (!req.body.bebidas) return res.status(204).send({mensaje:"No hay informacion que mostrar"})
    let bebidas= req.body.bebidas
    return res.status(200).send({bebidas})

}

module.exports={
    buscarTodo,
    agregar,
    buscarBebida,
    mostrarBebida
}