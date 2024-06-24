const express = require("express");
const router = express.Router();
const abastecimentoController = require("../controllers/Abastecimento/AbastecimentoController");
const AbastecimentoController = new abastecimentoController();

router.get(
  "/despesas/:id_motorista",
  AbastecimentoController.visualizarDespesas.bind(AbastecimentoController)
);

router.get(
  "/abastecimentoPorId/:idVeiculo",
  AbastecimentoController.ListarAbastecimentoPorId.bind(AbastecimentoController)
);
module.exports = router;
