const conexao = require("../../configs/db");

class manutencaoModel {
  constructor(
    dataAgendamento,
    dataInicio,
    dataFim,
    descricao,
    CustoToTal,
    status
  ) {
    this.dataAgendamento = dataAgendamento;
    this.dataFim = dataInicio;
    this.dataFim = dataFim;
    this.descricao = descricao;
    this.CustoToTal = CustoToTal;
    this.status = status;
  }

  visualizarTarefasAgendadas(IDUsuario, callback) {
    const sql =
      'SELECT * FROM tb_manutencoes WHERE IDTecnicoManutencao = ? AND Status = "Agendada"';
    conexao.query(sql, [IDUsuario], callback);
  }

  TotalGastoManutencaoPorVeiculo(IDVeiculo, callback) {
    const sql =
      "SELECT *,  SUM(CustoToTal) AS total_gasto_manutencao FROM tb_manutencoes WHERE  IDVeiculo = ? GROUP BY IDManutencao";
    conexao.query(sql, [IDVeiculo], callback);
  }

  veiculoIdMAnutencao(idVeiculo, callback) {
    const sql =
      "SELECT v.*  FROM tb_veiculos v INNER JOIN tb_manutencoes m ON m.IDVeiculo = v.IDVeiculo WHERE  v.IDVeiculo = ? ";
    conexao.query(sql, [idVeiculo], callback);
  }

  DadosGraficos(callback) {
    const sql =
      "SELECT YEAR(DataFim) AS Ano, MONTH(DataFim) AS Mes, COUNT(*) AS Quantidade FROM tb_manutencoes GROUP BY YEAR(DataFim), MONTH(DataFim) ORDER BY YEAR(DataFim), MONTH(DataFim)";
    conexao.query(sql, callback);
  }

  AllReport(callback) {
    const sql = `
    SELECT
        rp.id_relatorio_problema,
        rp.descricao_problema as descricao,
        rp._data as data,
        rp.status as status,
        v.IDVeiculo,
        v.Marca as marca,
        v.Modelo as modelo,
        v.Placa as placa,
        m.nome as nome,
        m.contato as contato
    FROM
        tb_relatorio_problemas rp
    JOIN
        tb_veiculos v ON v.IDVeiculo = rp.id_veiculo
    JOIN
        tb_usuario m ON m.IDUsuario = rp.id_motorista;`;
    conexao.query(sql, callback);
  }

  estadoReportAgendada( id_order_servico,id_relatorio_problema,  callback) {
    const sql =
      'UPDATE tb_relatorio_problemas SET status = "Agendada", id_order_servico = ? WHERE id_relatorio_problema = ?';
    conexao.query(sql, [id_order_servico, id_relatorio_problema,], callback);
  }

  estadoReportEmProgresso(id_order_servico, callback) {
    const sql =
      'UPDATE tb_relatorio_problemas SET status = "Em progresso" WHERE id_order_servico = ?';
    conexao.query(sql, [id_order_servico], callback);
  }

  estadoReportConcluida(id_order_servico, callback) {
    const sql =
      'UPDATE tb_relatorio_problemas SET status = "Concluida" WHERE id_order_servico =?';
    conexao.query(sql, [id_order_servico], callback);
  }

  //Ordem de servicos
  OrdemAgendadas(callback) {
    const sql =
      'select count(*) as totalAgendadas from tb_order_servico where Status = "Agendada"';
    conexao.query(sql, callback);
  }

  OrdemConcluidas(callback) {
    const sql =
      'select count(*) as totalConcluidas from tb_order_servico where Status = "Concluida"';
    conexao.query(sql, callback);
  }

  OrdemEmProgresso(callback) {
    const sql =
      'select count(*) as totalEmProgresso from tb_order_servico where Status = "Em progresso"';
    conexao.query(sql, callback);
  }
}
module.exports = manutencaoModel;
