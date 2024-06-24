/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./addOrder.css";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

const AddOrder = ({ closeModal, dados }) => {
  const [descricao, setDescricao] = useState(dados.descricao);
  const [IdVeiculo, setIdVeiculo] = useState(dados.IDVeiculo);
  const [placaVeiculo, setPlacaVeiculo] = useState(dados.placa);
  const [dataAbertura, setDataAbertura] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [IDOS, setIDOS] = useState("");
  //Input vazio

  const [tecnicoErro, setTecnicoErro] = useState("");
  const [dataAberturaErro, setDataAberturaErro] = useState("");
  const [dataFimErro, setDataFimErro] = useState("");
  const [filtroTecnico, setFiltroTecnico] = useState("All");
  const [setionTecnico, setSetionTecnico] = useState([]);

  function notificacao(tipo, message) {
    toast[tipo](message, {
      hideProgressBar: true,
      onClose: () => {
        closeModal();
      },
    });
  }
  const token = localStorage.getItem('token');

  useEffect(() => {
    const ListaTecnico = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/administrador/listar-tecnico",
           {headers: { 'Authorization': `Bearer ${token}`}}
        );
        setSetionTecnico(response.data);
      } catch (error) {
        console.error("Erro ao buscar técnicos:", error);
      }
    };
    ListaTecnico();
  }, []);

  const CriarOrdem = async () => {
    setTecnicoErro("");
    setDataAberturaErro("");
    setDataFimErro("");

    if (filtroTecnico === "Selecione..." || !dataAbertura || !dataFim) {
      if (filtroTecnico === "Selecione...") {
        setTecnicoErro("Campo obrigatório");
      }
      if (!dataAbertura) {
        setDataAberturaErro("Campo obrigatório");
      }
      if (!dataFim) {
        setDataFimErro("Campo obrigatório");
      }
      return;
    }

    try {
      // Encontrar o técnico selecionado com base no valor selecionado
      const tecnicoSelecionado = setionTecnico.find(
        (tecnico) => tecnico.nome === filtroTecnico
      );

      const response = await axios.post(
        "http://localhost:3000/administrador/adicionar-Ordem",
        {
          DataInicio: dataAbertura,
          DataFim: dataFim,
          Descricao: descricao,
          IDVeiculo: IdVeiculo,
          IDTecnico: tecnicoSelecionado.IDTecnico,
        },
        {headers: { 'Authorization': `Bearer ${token}`}}
      );


      const { IDOS } = response.data;
      console.log("ID da Ordem de Serviço:", IDOS);
      setIDOS(IDOS);

      await axios.put(
        `http://localhost:3000/manutencoes/reporte-status-agendada/${dados.id_relatorio_problema}`,
        {
          id_order_servico: IDOS,
        },
        {headers: { 'Authorization': `Bearer ${token}`}}
      );

      notificacao("success", "Ordem criada");
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
    } catch (err) {
      console.error("Erro ao criar ordem!", err);
      notificacao("error", "Erro ao criar ordem");
    }
  };

  return (
    <div className="add-order-modal">
      <div className="modal-content">
        <div className="veiculo-card-name">
          <div className="text-card">
            <h3>Criar Ordem</h3>
          </div>
          <div className="usuario-icons-close">
            <IoClose id="close" onClick={() => closeModal(false)} />
          </div>
        </div>
        <div className="modal-body">
          <div className="usuario-card-group">
            <label htmlFor="tecnico">Técnico Responsável</label>
            <select
              value={filtroTecnico}
              name="status"
              onChange={(e) => setFiltroTecnico(e.target.value)}
            >
              <option value="">Selecione...</option>
              {setionTecnico.map((tecnico, index) => (
                <option key={index} value={tecnico.nome}>
                  {tecnico.nome}
                </option>
              ))}
            </select>
          </div>
          <label className="labelError">{tecnicoErro}</label>
          <div className="usuario-card-group">
            <label htmlFor="vehicle">Veículo</label>
            <input type="text" id="tecnico" value={placaVeiculo} readOnly />
          </div>
          <div className="usuario-card-group-date-group">
            <div className="usuario-card-group-date">
              <label htmlFor="dataAbertura">Data de abertura</label>
              <input
                type="date"
                id="dataAbertura"
                value={dataAbertura}
                onChange={(e) => setDataAbertura(e.target.value)}
              />
            </div>
            <label className="labelError">{dataAberturaErro}</label>
            <div className="usuario-card-group-date">
              <label htmlFor="dataAbertura">Data de finalização</label>
              <input
                type="date"
                id="dataAbertura"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
            <label className="labelError">{dataFimErro}</label>
          </div>
          <label className="labelError">{dataFimErro}</label>
        </div>
        <div className="usuario-card-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id=""
            cols="10"
            rows="8"
            placeholder="Digite a sua descrisão"
            value={descricao}
            readOnly
          ></textarea>
        </div>
        <div className="buttons usuariosbtn">
          <button type="button">Limpar</button>
          <button type="button" onClick={() => CriarOrdem()}>
            Guardar
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddOrder;
