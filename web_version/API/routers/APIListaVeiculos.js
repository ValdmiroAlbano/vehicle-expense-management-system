const ListaVeiculosController = require('../controllers/APIListaVeiculocontroller');
const express = require('express');
const router = express.Router();

const listaVeiculosController = new ListaVeiculosController();

router.get('/ALL_veiculos', listaVeiculosController.allVeiculos.bind(listaVeiculosController));

module.exports = router;