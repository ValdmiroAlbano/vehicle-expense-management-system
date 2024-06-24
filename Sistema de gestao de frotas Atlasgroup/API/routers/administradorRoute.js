const express = require("express");
const router = express.Router();
const AdiministradorController = require("../controllers/Administrador/administradorController");
const uploadFotos = require("../configs/uploads/UsuarioFotos");
const authenticateToken = require('../configs/TokenVerificacao')
const administradorController = new AdiministradorController();
//Administrador Usuarios
router.post(
  "/cadastrar", authenticateToken,
  uploadFotos.single("foto"),
  administradorController.criarUsuario.bind(administradorController)
);
router.get(
  "/listar", authenticateToken,
  administradorController.listarUsuario.bind(administradorController)
);
router.put(
  "/atualizar/:IDUsuario", authenticateToken,
  uploadFotos.single("foto"),
  administradorController.atualizarUsuario.bind(administradorController)
);
router.delete(
  "/excluir/:IDUsuario", authenticateToken,
  administradorController.excluirUsuario.bind(administradorController)
);
router.get(
  "/lista-tecnico-manutencao", authenticateToken,
  administradorController.ListarTecnicoDeManutencao.bind(
    administradorController
  )
);
router.get(
  "/listar-motorista", authenticateToken,
  administradorController.ListarMotorista.bind(administradorController)
);
//Administrador Veiculo
router.post(
  "/adicionar-veiculo", authenticateToken,
  administradorController.adicionarVeiculo.bind(administradorController)
);
router.put(
  "/editar-veiculo/:IDVeiculo", authenticateToken,
  administradorController.editarVeiculo.bind(administradorController)
);
router.delete(
  "/excluir-veiculo/:IDVeiculo", authenticateToken,
  administradorController.excluirVeiculo.bind(administradorController)
);
router.post(
  "/atribuir-veiculo",
  administradorController.atribuirVeiculoAMotorista.bind(
    administradorController
  )
);
router.delete(
  "/removerVeiculoAtribuido/:IDVeiculo/:IDMotorista", authenticateToken,
  administradorController.removerVeiculoAtribuido.bind(administradorController)
);
router.get(
  "/visualizar-veiculo-motorista/:IDMotorista", authenticateToken,
  administradorController.visualizarVeiculoMotorista.bind(
    administradorController
  )
);

//Administrador Manutencao
router.post(
  "/adicionar-tecnico", authenticateToken,
  administradorController.AdicionarTecnico.bind(administradorController)
);
router.get(
  "/listar-tecnico", authenticateToken,
  administradorController.ListarTecnico.bind(administradorController)
);
router.put(
  "/atualizar-tecnico/:IDTecnico", authenticateToken,
  administradorController.EditarTecnico.bind(administradorController)
);
router.delete(
  "/remover-tecnico/:IDTecnico", authenticateToken,
  administradorController.ExcluirTecnico.bind(administradorController)
);
router.post(
  "/realizar-manutencao", authenticateToken,
  administradorController.RealizarManutencao.bind(administradorController)
);
router.post(
  "/adicionar-Ordem", authenticateToken,
  administradorController.CriarOrdem.bind(administradorController)
);
router.get(
  "/listar-Ordem", authenticateToken,
  administradorController.ListaOrdem.bind(administradorController)
);
router.put(
  "/Fechar-Ordem/:IDOS",
  administradorController.FecharOrdem.bind(administradorController)
);
router.put(
  "/Imprimir-Ordem/:IDOS",
  administradorController.ImprimirOrdem.bind(administradorController)
);

router.get(
  "/listar-servico", authenticateToken,
  administradorController.ListarServico.bind(administradorController)
);
router.get(
  "/visualizarHistoricoManutencoes/:IDVeiculo", authenticateToken,
  administradorController.visualizarStatusEHistorico.bind(
    administradorController
  )
);

router.get(
  "/listar-veiculo/:IDVeiculo", authenticateToken,
  administradorController.visualizarVeiculo.bind(administradorController)
);

//Administrador Frota
router.get(
  "/relatorio-geral", authenticateToken,
  administradorController.RelatorioGeral.bind(administradorController)
);
router.get(
  "/relatorio-abastecimento", authenticateToken,
  administradorController.RelatorioAbastecimento.bind(administradorController)
);
router.get(
  "/relatorio-manutencao", authenticateToken,
  administradorController.RelatorioManutencao.bind(administradorController)
);
module.exports = router;
