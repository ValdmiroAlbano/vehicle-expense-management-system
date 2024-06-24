/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { format} from "date-fns";
import "./Manutencao.css";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
function Manutencao({ closeModal, dadosOS }) {
  const token = localStorage.getItem('token');
  //Dados Serviços
  const [tecnicoResponsavel, setTecnicoResponsavel] = useState(dadosOS.Tecnico);
  const [veiculoMarca, setVeiculoMarca] = useState(dadosOS.Marca);
  const [veiculoModelo, setVeiculoModelo] = useState(dadosOS.Modelo);
  const [dataInicio, setDataInicio] = useState(dadosOS.DataInicio ? format(new Date(dadosOS.DataInicio), "dd/MM/yyyy") : "");
  const [dataTermino, setDataTermino] = useState( dadosOS.DataFim ? format(new Date(dadosOS.DataFim), "dd/MM/yyyy") : "");
  const [descricao, setDescricao] = useState(dadosOS.Descricao);
  const [idVeiculo, setIDVeiculo] = useState(dadosOS.IDVeiculo);
  const [idTecnico, setIdTecnico] = useState(dadosOS.IDTecnico);

  //Dados Manutenção
  const [tipoManutencao, setTipoManutencao] = useState("");
  const [custo, setCusto] = useState("");
  const [custoTotal, setCustoTotal] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [tecnicosAuxilhares1, setTecnicoAuxilhar1] = useState("");
  const [tecnicosAuxilhares2, setTecnicoAuxilhar2] = useState("");
  const [tecnicosAuxilhares3, setTecnicoAuxilhar3] = useState("");

  //Dados Manutenção erro
  const [tipoManutencaoErro, setTipoManutencaoErro] = useState("");
  const [custoErro, setCustoErro] = useState("");
  const [custoTotalErro, setCustoTotalErro] = useState("");
   const [descricaoServicoErro, setDescricaoServicoErro] = useState("");

  function notificacao(tipo, message) {
    toast[tipo](message, {
      hideProgressBar: true,
      onClose: () => {
        closeModal();
      },
    });
  }

  const enviardados = async () => {
    setCustoErro("");
    setTipoManutencaoErro("");
    setCustoTotalErro("");
    setDescricaoServicoErro("");
    /*Faltou mudar o status do veiculo para Em serviço */

    if (
      (!tipoManutencao || !custo, !custoTotal, !dataTermino, !descricaoServico)
    ) {
      if (!tipoManutencao) {
        setTipoManutencaoErro("Campo obrigatório");
      }
      if (!custo) {
        setCustoErro("Campo obrigatório");
      }
      if (!custoTotal) {
        setCustoTotalErro("Campo obrigatório");
      }
      if (!descricaoServico) {
        setDescricaoServicoErro("Campo obrigatório");
      }
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/administrador/Fechar-Ordem/${dadosOS.IDOS}`,{headers: { 'Authorization': `Bearer ${token}`}}
      );
      await axios.put(
        `http://localhost:3000/manutencoes/reporte-status-concluido/${dadosOS.IDOS}`,{headers: { 'Authorization': `Bearer ${token}`}}
      ); 
      await axios.post("http://localhost:3000/administrador/realizar-manutencao", {
        DataFim: dataTermino,
        Descricao: descricaoServico,
        TipoManutencao: tipoManutencao,
        CustoPecas: custo,
        CustoToTal: custoTotal,
        IDVeiculo: idVeiculo,
        IDTecnico: idTecnico,
      }, {headers: { 'Authorization': `Bearer ${token}`}});
      notificacao("success", "Ordem de manutenção realizada com sucesso");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Erro na realização da ordem de manutenção", err);
      notificacao("error", "Erro na realização da ordem de manutenção");
    }

    console.log(dataTermino)
    
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
      <div className="usuario-icons-close">
            <IoClose id="close" onClick={() => closeModal(false)} />
          </div>
        <h2>Registro de manutenção e finalização de serviço</h2>
        <div className="categoria">
          <h3>Dados do Veículo</h3>
          <div className="input-group">
            <label htmlFor="marca">Marca:</label>
            <input type="text" id="marca" value={veiculoMarca} readOnly />
          </div>
          <div className="input-group">
            <label htmlFor="modelo">Modelo:</label>
            <input type="text" id="modelo" value={veiculoModelo} readOnly />
          </div>
        </div>
        <div className="categoria">
          <h3>Informações da Ordem</h3>
          <div className="input-group">
            <label htmlFor="data-emissao">Data de Emissão:</label>
            <input type="text" id="data-emissao" value={dataInicio} readOnly />
          </div>
          <div className="input-group">
            <label htmlFor="data-emissao">Data de Finalização:</label>
            <input type="text" id="data-emissao" value={dataTermino} readOnly/>
          </div>
          <div className="input-group">
            <label htmlFor="tecnico-responsavel">Técnico Responsável:</label>
            <input
              type="text"
              id="tecnico-responsavel"
              value={tecnicoResponsavel}
              readOnly
            />
          </div>
          <div className="input-group">
            <label htmlFor="tipo-tarefa">Tipo de Tarefa:</label>
            <input type="text" id="tipo-tarefa" value={descricao} readOnly />
          </div>
          <h3>Dados da Manutenção</h3>
          <div className="input-group">
            <label htmlFor="tipo-manutencao">Tipo de Manutenção:</label>
            <select
              id="tipo-manutencao"
              value={tipoManutencao}
              onChange={(e) => setTipoManutencao(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="corretiva">Corretiva</option>
              <option value="preventiva">Preventiva</option>
            </select>
          </div>
          <label className='labelError'>{tipoManutencaoErro}</label>
          <div className="input-group">
            <label htmlFor="tecnico-responsavel">Técnico auxilhares:</label>
            <input
              type="text"
              id="tecnico-responsavel"
              value={tecnicosAuxilhares1}
              onChange={(e) => setTecnicoAuxilhar1(e.target.value)}
            />
            <input
              type="text"
              id="tecnico-responsavel"
              value={tecnicosAuxilhares2}
              onChange={(e) => setTecnicoAuxilhar2(e.target.value)}
            />
            <input
              type="text"
              id="tecnico-responsavel"
              value={tecnicosAuxilhares3}
              onChange={(e) => setTecnicoAuxilhar3(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="custo-peca">Custo das Peças:</label>
            <input
              type="text"
              id="custo-peca"
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
            />
          </div>
          <label className='labelError'>{custoErro}</label>
          <div className="input-group">
            <label htmlFor="custo-total">Custo Total:</label>
            <input
              type="text"
              id="custo-total"
              value={custoTotal}
              onChange={(e) => setCustoTotal(e.target.value)}
            />
          </div>
          <label className='labelError'>{custoTotalErro}</label>
          <div className="input-group">
            <label htmlFor="descricao-servico">Descrição do Serviço:</label>
            <textarea
              id="descricao-servico"
              rows="4"
              value={descricaoServico}
              onChange={(e) => setDescricaoServico(e.target.value)}
            ></textarea>
          </div>
          <label className='labelError'>{descricaoServicoErro}</label>
        </div>
        <button type="submit" onClick={enviardados}>
          Salvar
        </button>
      </div>
      <ToastContainer autoClose={1000} hideProgressBar={true} />
    </div>
  );
}

export default Manutencao;
