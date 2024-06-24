const express = require("express");
const router = express.Router();
const TecnicoManutencaoController = require("../controllers/Tecnico_Manutencao/tecnicoManutencaoController");
const authenticateToken = require('../configs/TokenVerificacao');
const tecnicoManutencaoController = new TecnicoManutencaoController();
router.get(
  "/visualizar-detalhes-tarefa/:IDManutencao", authenticateToken,
  tecnicoManutencaoController.visualizarDetalhesTarefa.bind(
    tecnicoManutencaoController
  )
);
router.post(
  "/registrar-manutencao-realizada/:IDManutencao", authenticateToken,
  tecnicoManutencaoController.registrarManutencaoRealizada.bind(
    tecnicoManutencaoController
  )
);
router.get(
  "/visualizar-status-veiculos", authenticateToken,
  tecnicoManutencaoController.visualizarStatusVeiculos.bind(
    tecnicoManutencaoController
  )
);
router.put(
  "/atualizar-status-veiculo/:IDVeiculo", authenticateToken,
  tecnicoManutencaoController.atualizarStatusVeiculo.bind(
    tecnicoManutencaoController
  )
);

module.exports = router;
