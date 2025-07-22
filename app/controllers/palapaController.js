const palapaModel = require('../models/palapaModel');

function buscarTodo(req, res) {
    palapaModel.find({})
    .then(bebidas => {
        if (bebidas.length) {
            return res.status(200).send({ bebidas });
        }
        return res.status(204).send({ mensaje: "No hay bebidas disponibles" });
    })
    .catch(error => {
        return res.status(404).send({ mensaje: `Error en el servidor: ${error}` });
    });
}

function agregar(req, res) {
    new palapaModel(req.body).save()
    .then(info => {
        return res.status(200).send({
            mensaje: "La información se guardó con éxito",
            info
        });
    })
    .catch(e => {
        return res.status(404).send({
            mensaje: `Error al guardar la información: ${e}`
        });
    });
}

function buscarBebida(req, res, next) {
    let consulta = {};
    consulta[req.params.key] = req.params.value;
    console.log(consulta);
    palapaModel.find(consulta)
    .then(bebidas => {
        if (!bebidas.length) return next();
        req.body.bebidas = bebidas;
        return next();
    })
    .catch(e => {
        req.body.e = e;
        return next();
    });
}

function mostrarBebida(req, res) {
    if (req.body.e) return res.status(404).send({ mensaje: "Error al consultar la información" });
    if (!req.body.bebidas) return res.status(204).send({ mensaje: "No hay información que mostrar" });
    return res.status(200).send({ bebidas: req.body.bebidas });
}

function eliminarBebida(req, res) {
    const bebidas = req.body.bebidas;

    palapaModel.deleteOne(bebidas[0])
    .then(inf => {
        return res.status(200).send({ mensaje: "Bebida eliminada" });
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al eliminar la bebida", error: e });
    });
}

function actualizarBebida(req, res) {
    palapaModel.findOneAndUpdate(
        { nombre: req.params.value },
        req.body,
        { new: true }
    )
    .then(bebida => {
        if (!bebida) return res.status(404).send({ mensaje: "Bebida no encontrada" });
        return res.status(200).send({ mensaje: "Bebida actualizada", bebida });
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al actualizar la bebida", error: e });
    });
}


module.exports = {
    buscarTodo,
    agregar,
    buscarBebida,
    mostrarBebida,
    eliminarBebida,
    actualizarBebida
};
