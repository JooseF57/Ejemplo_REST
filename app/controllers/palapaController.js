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
    const nombreBebida = req.params.nombre;  // Usamos el parámetro 'nombre' para encontrar la bebida.

    // Verificamos si los datos a actualizar se proporcionan en el cuerpo de la solicitud
    const bebidaAActualizar = req.body;

    if (!bebidaAActualizar) {
        return res.status(400).send({ mensaje: "No se proporcionó información para actualizar." });
    }

    // Verificamos si el campo 'descripcion' o 'precio' u otros son necesarios
    if (!bebidaAActualizar.descripcion || !bebidaAActualizar.precio || !bebidaAActualizar.capacidad) {
        return res.status(400).send({ mensaje: "Debe proporcionar los campos 'descripcion', 'precio' y 'capacidad'." });
    }

    // Realizamos la actualización usando el 'nombre' que recibimos como parámetro
    palapaModel.updateOne({ nombre: nombreBebida }, { $set: bebidaAActualizar })
        .then(inf => {
            if (inf.nModified === 0) {
                return res.status(404).send({ mensaje: "No se encontró la bebida con ese nombre para actualizar." });
            }
            return res.status(200).send({ mensaje: "Bebida actualizada con éxito." });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: "Error al actualizar la bebida", error: e });
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
