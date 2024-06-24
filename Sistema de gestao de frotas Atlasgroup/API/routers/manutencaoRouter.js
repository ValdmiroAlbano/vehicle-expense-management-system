const express = require("express");
const router = express.Router();
const manutencaoController = require("../controllers/Manutencao/manutencoaController");
const authenticateToken = require('../configs/TokenVerificacao')
const ManutencaoController = new manutencaoController();

router.get(
  "/visualizar-tarefas/:IDUsuario", authenticateToken,
  ManutencaoController.visualizarTarefasAgendadas.bind(ManutencaoController)
);
router.get(
  "/TotalTarefaManutencao/:IDVeiculo", authenticateToken,
  ManutencaoController.TotalDecustoPorManutencao.bind(ManutencaoController)
);
router.get(
  "/veiculo-one/:idVeiculo", authenticateToken,
  ManutencaoController.VeiculosIdManutencao.bind(ManutencaoController)
);
router.get(
  "/dados-grafico", authenticateToken,
  ManutencaoController.DadosGraficos.bind(ManutencaoController)
);
router.get(
  "/mostrar-avarias",
  ManutencaoController.AllReport.bind(ManutencaoController)
);

router.put(
  "/reporte-status-agendada/:id_relatorio_problema", authenticateToken,
  ManutencaoController.estadoReportAgendada.bind(ManutencaoController)
);

router.put(
  "/reporte-status-emprogresso/:id_order_servico",
  ManutencaoController.estadoReportEmProgresso.bind(ManutencaoController)
);

router.put(
  "/reporte-status-concluido/:id_order_servico",
  ManutencaoController.estadoReportConcluida.bind(ManutencaoController)
);

router.get(
  "/ordem-agendadas", authenticateToken,
  ManutencaoController.OrdemAgendadas.bind(ManutencaoController)
);
router.get(
  "/ordem-concluidas", authenticateToken,
  ManutencaoController.OrdemConcluidas.bind(ManutencaoController)
);
router.get(
  "/ordem-emProgresso", authenticateToken,
  ManutencaoController.OrdemEmProgresso.bind(ManutencaoController)
);
module.exports = router;
