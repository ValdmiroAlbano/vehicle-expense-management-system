const express = require("express");
const router = express.Router();
const MotoristaController = require("../controllers/Motorista/motoristaController");
/* const authenticateToken = require('../configs/TokenVerificacao') */
// Rotas para Motoristas
const motoristaController = new MotoristaController();
router.get(
  "/getMotorista/:IDUsuario",
  motoristaController.getMotorista.bind(motoristaController)
);
router.get(
  "/veiculos-atribuidos/:IDUsuario",
  motoristaController.visualizarVeiculosAtribuidos.bind(motoristaController)
);
router.post(
  "/registrar-despesa",
  motoristaController.registrarDespesa.bind(motoristaController)
);

router.get(
  "/detalhes-veiculo/:IDVeiculo",
  motoristaController.visualizarDetalhesVeiculo.bind(motoristaController)
);
router.post(
  "/reportarProblema",
  motoristaController.reportarProblema.bind(motoristaController)
);

router.get(
  "/reclamacoes/:id_motorista",
  motoristaController.listarProblema.bind(motoristaController)
);
module.exports = router;
