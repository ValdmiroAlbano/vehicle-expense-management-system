/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./addOrder.css";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

const AddOrder = ({ closeModal }) => {
  const token = localStorage.getItem('token');
  const [descricao, setDescricao] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");
  const [dataFim, setDataFim] = useState("");
  //Input vazio
  const [descricaoErro, setDescricaoErro] = useState("");
  const [veiculoErro, setVeiculoErro] = useState("");
  const [tecnicoErro, setTecnicoErro] = useState("");
  const [dataAberturaErro, setDataAberturaErro] = useState("");
  const [dataFimErro, setDataFimErro] = useState("");

  const [filtroTecnico, setFiltroTecnico] = useState("All");
  const [filroVeiculo, setFiltroVeiculo] = useState("All");
  const [setionVeiculo, setStionVeiculo] = useState([]);
  const [setionTecnico, setSetionTecnico] = useState([]);

  function notificacao(tipo, message) {
    toast[tipo](message, {
      hideProgressBar: true,
      onClose: () => {
        closeModal();
      },
    });
  }

  const ListaTecnico = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/administrador/listar-tecnico",{headers: { 'Authorization': `Bearer ${token}`}}
      );
      setSetionTecnico(response.data);
    } catch (error) {
      console.error("Erro ao buscar técnicos:", error);
    }
  };

  const listarVeiculos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/veiculos/listar-veiculo",{headers: { 'Authorization': `Bearer ${token}`}}
      );
      setStionVeiculo(response.data); // Certifique-se de que os objetos retornado contêm a propriedade IDVeiculo
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    }
  };

  useEffect(() => {
    ListaTecnico();
    listarVeiculos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTecnicoErro("");
    setVeiculoErro("");
    setDescricaoErro("");
    setDataAberturaErro("");
    setDataFimErro("");

    if (
      filroVeiculo === "Selecione..." ||
      filtroTecnico === "Selecione..." ||
      !descricao ||
      !dataAbertura ||
      !dataFim
    ) {
      if (filroVeiculo === "Selecione...") {
        setVeiculoErro("Campo obrigatório");
      }
      if (filtroTecnico === "Selecione...") {
        setTecnicoErro("Campo obrigatório");
      }
      if (!descricao) {
        setDescricaoErro("Campo obrigatório");
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
      // Encontrar o veículo selecionado com base no valor selecionado
      const veiculoSelecionado = setionVeiculo.find(
        (veiculo) => veiculo.Placa === filroVeiculo
      );
      // Encontrar o técnico selecionado com base no valor selecionado
      const tecnicoSelecionado = setionTecnico.find(
        (tecnico) => tecnico.nome === filtroTecnico
      );

      await axios.post("http://localhost:3000/administrador/adicionar-Ordem", {
        DataInicio: dataAbertura,
        DataFim: dataFim,
        Descricao: descricao,
        IDVeiculo: veiculoSelecionado.IDVeiculo,
        IDTecnico: tecnicoSelecionado.IDTecnico,
      },{headers: { 'Authorization': `Bearer ${token}`}}
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
        <form onSubmit={handleSubmit}>
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
              <select
                value={filroVeiculo}
                name="status"
                onChange={(e) => setFiltroVeiculo(e.target.value)}
              >
                <option value="">Selecione...</option>
                {setionVeiculo.map((veiculo, index) => (
                  <option key={index} value={veiculo.Placa}>
                    {veiculo.Placa}
                  </option>
                ))}
              </select>
            </div>
            <label className="labelError">{veiculoErro}</label>
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
          </div>
          <div className="usuario-card-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id=""
              cols="10"
              rows="8"
              placeholder="Digite a sua descrisão"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
          <label className="labelError">{descricaoErro}</label>
          <div className="buttons usuariosbtn">
            <button type="button">Limpar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddOrder;
