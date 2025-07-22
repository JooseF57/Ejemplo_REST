const express = require('express')
const router = express.Router()
const palapaController = require('../controllers/palapaController');

router.get('/bebidas', palapaController.buscarTodo)
.post('/bebidas', palapaController.agregar)
.get('/bebidas/:key/:value', palapaController.buscarBebida,palapaController.mostrarBebida)
.delete('/bebidas/:key/:value', palapaController.buscarBebida,palapaController.eliminarBebida)
.put('/bebidas/:key/:value', palapaController.actualizarBebida)


module.exports=router