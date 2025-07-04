const express = require('express')
const router = express.Router()
const palapaController = require('../controllers/palapaController');

router.get('/bebidas', palapaController.buscarTodo)

module.exports=router