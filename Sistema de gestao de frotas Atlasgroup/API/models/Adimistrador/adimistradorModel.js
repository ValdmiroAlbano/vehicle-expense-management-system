const conexao = require("../../configs/db");

class AdministradorModel {
  constructor() {
    conexao.connect((err) => {
      if (err) {
        console.log("Erro ao conectar ao banco: ", err);
      } else {
        console.log("Administrador conexao com banco bem-sucedida!");
      }
    });
  }

  //#region Crud Usuario
  criarUsuario(usuario, callback) {
    const sql =
      "INSERT INTO tb_usuario (nome, email, senha, foto, contato, tipoUsuario) VALUES (?,?, ?, ?, ?, ?)";
    conexao.query(
      sql,
      [
        usuario.nome,
        usuario.email,
        usuario.senha,
        usuario.foto,
        usuario.contato,
        usuario.tipoUsuario,
      ],
      callback
    );
  }

  verificarEmail(email, callback) {
    const sql = "SELECT * FROM tb_usuario WHERE email = ?";
    conexao.query(sql, [email], callback);
  }

  listarUsuario(callback) {
    const sql = "SELECT * FROM tb_usuario";
    conexao.query(sql, callback);
  }

  atualizarNome(id, nome, callback) {
    const sql = "UPDATE tb_usuario SET nome = ? WHERE IDUsuario = ?";
    conexao.query(sql, [nome, id], callback);
  }

  atualizarEmail(id, email, callback) {
    const sql = "UPDATE tb_usuario SET email = ? WHERE IDUsuario = ?";
    conexao.query(sql, [email, id], callback);
  }

  atualizarFoto(id, foto, callback) {
    const sql = "UPDATE tb_usuario SET foto = ? WHERE IDUsuario = ?";
    conexao.query(sql, [foto, id], callback);
  }

  atualizarContato(id, contato, callback) {
    const sql = "UPDATE tb_usuario SET contato = ? WHERE IDUsuario = ?";
    conexao.query(sql, [contato, id], callback);
  }

  excluirUsuario(id_usuario, callback) {
    const sql = "DELETE FROM tb_usuario WHERE IDUsuario = ?";
    conexao.query(sql, [id_usuario], callback);
  }
  //#endregion

  //#region Crud Veiculos
  adicionarVeiculo(
    Marca,
    Modelo,
    Ano,
    Placa,
    QuilometragemAtual,
    DataUltimaManutencao,
    Status,
    CombustivelAtual,
    TipoCombustivel,
    CapacidadeTanque,
    callback
  ) {
    const sql =
      "INSERT INTO tb_veiculos (Marca, Modelo, Ano, Placa, QuilometragemAtual, DataUltimaManutencao, Status, CombustivelAtual, TipoCombustivel, CapacidadeTanque) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    conexao.query(
      sql,
      [
        Marca,
        Modelo,
        Ano,
        Placa,
        QuilometragemAtual,
        DataUltimaManutencao,
        Status,
        CombustivelAtual,
        TipoCombustivel,
        CapacidadeTanque,
      ],
      callback
    );
  }

  VerificarPlaca(placa, callback) {
    const sql = "SELECT * FROM tb_veiculos WHERE Placa = ?";
    conexao.query(sql, [placa], callback);
  }

  // Exclusão de informações de veículos
  excluirVeiculo(id_veiculo, callback) {
    const sql = "DELETE FROM tb_veiculos WHERE IDVeiculo = ?";
    conexao.query(sql, [id_veiculo], callback);
  }
  // Atribuição de veículos a motoristas
  atribuirVeiculoAMotorista(IDVeiculo, IDMotorista, callback) {
    const sql =
      "INSERT INTO tb_veiculo_motorista (IDVeiculo, IDMotorista) VALUES (?, ?)";
    conexao.query(sql, [IDVeiculo, IDMotorista], callback);
  }

  removerAtribuicaoVeiculo(IDVeiculo, IDMotorista, callback) {
    const sql =
      "DELETE FROM tb_veiculo_motorista WHERE IDVeiculo = ? AND IDMotorista = ?";
    conexao.query(sql, [IDVeiculo, IDMotorista], callback);
  }

  //#endregion

  //#region Motorista
  ListarMotorista(callback) {
    const sql = 'SELECT * FROM tb_usuario WHERE tipoUsuario = "Motorista"';
    conexao.query(sql, callback);
  }

  visualizarVeiculoMotorista(IDMotorista, callback) {
    const sql =
      "SELECT v.* FROM tb_veiculos v INNER JOIN tb_veiculo_motorista vm ON v.IDVeiculo = vm.IDVeiculo WHERE vm.IDMotorista = ?";
    conexao.query(sql, [IDMotorista], callback);
  }
  //#endregion

  //#region Tecnico Manutenção
  AdicionarTecnico(nome, contato, especialidade, callback) {
    const sql =
      "INSERT INTO tb_tecnico_manutencao (nome, contato, especialidade) VALUES (?, ?, ?)";
    conexao.query(sql, [nome, contato, especialidade], callback);
  }
  ListarTecnico(callback) {
    const sql = "SELECT * FROM tb_tecnico_manutencao";
    conexao.query(sql, callback);
  }

  EditarTecnico(IDTecnico, nome, contato, especialidade, callback) {
    const sql =
      "UPDATE tb_tecnico_manutencao SET nome = ?, contato = ?, especialidade = ? WHERE IDTecnico = ?";
    conexao.query(sql, [nome, contato, especialidade, IDTecnico], callback);
  }

  RemoverTecnico(IDTecnico, callback) {
    const sql = "DELETE FROM tb_tecnico_manutencao WHERE IDTecnico = ?";
    conexao.query(sql, [IDTecnico], callback);
  }

  RealizarManutencao(
    DataFim,
    Descricao,
    TipoManutencao,
    CustoPecas,
    CustoToTal,
    IDVeiculo,
    IDUsuario,
    IDTecnico,
    callback
  ) {
    const sql =
      "INSERT INTO tb_manutencoes (DataFim, Descricao, TipoManutencao, CustoPecas, CustoToTal, IDVeiculo, IDUsuario, IDTecnico) VALUES (?,?,?,?,?,?,?,?)";
    conexao.query(
      sql,
      [
        DataFim,
        Descricao,
        TipoManutencao,
        CustoPecas,
        CustoToTal,
        IDVeiculo,
        IDUsuario,
        IDTecnico,
      ],
      callback
    );
  }

  CriarOrdem(DataInicio, DataFim, Descricao, IDVeiculo, IDTecnico, callback) {
    const sql =
      "INSERT INTO tb_order_servico (DataInicio, DataFim, Descricao, Status, IDVeiculo, IDTecnico) VALUES (?,?,?,?,?,?)";
    conexao.query(
      sql,
      [DataInicio, DataFim, Descricao, "Agendada", IDVeiculo, IDTecnico],
      callback
    );
  }

  ListaOrdem(callback) {
    const sql = `
      SELECT 
        os.*,
        v.Placa,
        v.Marca,
        v.Modelo,
        tm.nome as Tecnico
      FROM 
        tb_order_servico os 
      JOIN 
        tb_veiculos v ON v.IDVeiculo = os.IDVeiculo
      JOIN
        tb_tecnico_manutencao tm ON tm.IDTecnico = os.IDTecnico`;
    conexao.query(sql, callback);
  }

  FecharOrdem(IDOS, callback) {
    const sql =
      "UPDATE tb_order_servico SET Status = 'Concluida', DataFim = NOW() WHERE IDOS = ?";
    conexao.query(sql, [IDOS], callback);
  }

  ImprimirOrdem(IDOS, callback) {
    const sql =
      "UPDATE tb_order_servico SET Status = 'Em progresso' WHERE IDOS = ?";
    conexao.query(sql, [IDOS], callback);
  }

  visualizarHistoricoManutencoes(IDVeiculo, callback) {
    const sql = `SELECT * FROM tb_manutencoes WHERE IDVeiculo = ?`;
    conexao.query(sql, [IDVeiculo], callback);
  }

  visualizarVeiculo(IDVeiculo, callback){
    const sql = "SELECT * FROM tb_veiculos WHERE IDVeiculo = ?";
    conexao.query(sql, [IDVeiculo], callback);
  }

  ListarServico(callback){
    const sql = 
    `SELECT
      os.DataInicio,
      os.Descricao,
      os.Status,
      tm.nome,
      v.placa
    FROM tb_order_servico os
    JOIN tb_tecnico_manutencao tm ON tm.IDTecnico = os.IDTecnico
    JOIN tb_veiculos v ON v.IDVeiculo = os.IDVeiculo`;
    conexao.query(sql, callback);
  }
  //#endregion

  //#region Frotas
  RelatorioManutencao(callback) {
    const sql = `SELECT Placa AS veiculo, m.IDManutencao as id, m.TipoManutencao, m.CustoTotal as custo, m.DataFim
    FROM tb_manutencoes m
    LEFT JOIN tb_veiculos v ON m.IDVeiculo = v.IDVeiculo`;
    conexao.query(sql, callback);
  }

  RelatorioAbastecimento(callback) {
    const sql = `SELECT a.id_abastecimento, a._data as data, Placa AS veiculo, a.tipoCombustivel, a.litrosAbastecidos, a.custo
     FROM tb_abastecimento a
     LEFT JOIN tb_veiculos v ON a.id_veiculo = v.IDVeiculo`;
    conexao.query(sql, callback);
  }

  RelatorioGeral(callback) {
    const sql = `
    SELECT 
    id_abastecimento AS id,
    _data AS data,
    Placa AS veiculo,
    'Abastecimento' AS tipoServico,
    custo
FROM 
    tb_abastecimento
JOIN 
    tb_veiculos ON tb_abastecimento.id_veiculo = tb_veiculos.IDVeiculo
UNION ALL
SELECT 
    IDManutencao AS id,
    DataFim AS data,
    Placa AS veiculo,
    'Manutenção' AS tipoServico,
    CustoTotal AS custo
FROM 
    tb_manutencoes
JOIN 
    tb_veiculos ON tb_manutencoes.IDVeiculo = tb_veiculos.IDVeiculo;

    `;
    conexao.query(sql, callback);
  }
  //#endregion

}

module.exports = AdministradorModel;
