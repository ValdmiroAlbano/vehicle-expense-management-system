const express = require("express");
const router = express.Router();
const veiculoController = require("../controllers/Veiculo/VeiculoController");

const VeiculoController = new veiculoController();

router.get(
  "/listar-veiculo",
  VeiculoController.listarVeiculos.bind(VeiculoController)
);
router.get(
  "/motorista-veiculo/:idVeiculo",
  VeiculoController.listarMotoristaVeiculo.bind(VeiculoController)
);
module.exports = router;
