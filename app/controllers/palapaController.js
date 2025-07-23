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

    palapaModel.find(consulta)
    .then(bebidas => {
        if (!bebidas.length) return next();
        res.locals.bebidas = bebidas;
        return next();
    })
    .catch(e => {
        res.locals.error = e;
        return next();
    });
}

function mostrarBebida(req, res) {
    if (res.locals.error) {
        return res.status(404).send({ mensaje: "Error al consultar la información" });
    }
    if (!res.locals.bebidas) {
        return res.status(204).send({ mensaje: "No hay información que mostrar" });
    }
    return res.status(200).send({ bebidas: res.locals.bebidas });
}

function eliminarBebida(req, res) {
    const bebidas = res.locals.bebidas;
    if (!bebidas || !bebidas.length) {
        return res.status(404).send({ mensaje: "Bebida no encontrada" });
    }

    palapaModel.deleteOne({ _id: bebidas[0]._id })
    .then(() => {
        return res.status(200).send({ mensaje: "Bebida eliminada" });
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al eliminar la bebida", error: e });
    });
}

function actualizarBebida(req, res) {
    let consulta = {};
    consulta[req.params.key] = req.params.value;

    palapaModel.findOneAndUpdate(
        consulta,
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
