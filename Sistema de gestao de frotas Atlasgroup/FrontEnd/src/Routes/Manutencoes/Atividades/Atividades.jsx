import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import "./Atividades.css";
import AddOrder from "./addAtividades/addOrder";
import Calendar from "../../../assets/calendar.png";
import Car from "../../../assets/car.png";
import { IoClose } from "react-icons/io5";
import Manutencao from "./Manutencao/Manutencao";
import AtividadePDF from "./PDF/AtividadePDF";
import { toast, ToastContainer } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Atividades = () => {
  const token = localStorage.getItem('token');
  const [openAddTarefas, setAddTarefas] = useState(false);
  const [openManutencao, setOpenManutencao] = useState(false);
  const [osDados, setOsData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get(
        "http://localhost:3000/administrador/listar-Ordem", {headers: { 'Authorization': `Bearer ${token}`}}
      );
      setOrders(response.data);
    };
    getOrders();
  }, []); // <-- Adicione um array vazio aqui para que useEffect seja executado apenas uma vez

  const AbrirAddOrder = () => {
    setAddTarefas(true);
  };

  const imprimirOrdem = async (orderId) => {
    try {
      await axios.put(
        `http://localhost:3000/administrador/Imprimir-Ordem/${orderId}`
      );

      await axios.put(
        `http://localhost:3000/manutencoes/reporte-status-emprogresso/${orderId}`
      );

      toast.success("Ordem baixada!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao baixar ordem:", error);
      toast.error("Erro ao baixar ordem");
    }
  };

  const setUserModal = (user) => {
    setOsData(user);
    setOpenManutencao(true);
  };

  const handleClose = () => {
    toast.warning("Ordem já foi concluida");
  };
  const isPrint = () => {
    toast.warning("A ordem ja foi impressa!");
  };

  const [filtroData, setFiltroData] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroVeiculo, setFiltroVeiculo] = useState("");

  const filtrarRegistros = () => {
    let registrosFiltrados = [...orders];

    if (filtroData) {
      registrosFiltrados = registrosFiltrados.filter((registro) => {
        const dataRegistro = new Date(registro.DataInicio);
        return dataRegistro >= new Date(dataRegistro);
      });
    }

    if (filtroStatus && filtroStatus !== "All") {
      registrosFiltrados = registrosFiltrados.filter((registro) =>
        registro.Status.toLowerCase().includes(filtroStatus.toLowerCase())
      );
    }

    if (filtroVeiculo) {
      registrosFiltrados = registrosFiltrados.filter((registro) =>
        registro.Placa.toLowerCase().includes(filtroVeiculo.toLowerCase())
      );
    }

    return registrosFiltrados;
  };

  return (
    <>
      <div className="main-content">
        <div className="maind">
          <div className="maind-text">
            <h2>Gestão de Ordem de Serviço</h2>
          </div>
          <div className="inp">
            <input type="search" placeholder="Pesquisar aqui..." />
          </div>
        </div>
        <div className="comp-arqu">
          <div className="btn-click">
            <div className="butttons">
              <div className="filtros">
                <div className="butto">
                 <button onClick={AbrirAddOrder}>
                  Criar Ordem
                  <i className="bx bx-plus"></i>
                  </button>
                </div>

                <input
                  type="date"
                  value={filtroData}
                  onChange={(e) => setFiltroData(e.target.value)}
                />
                <select
                  value={filtroStatus}
                  name="status"
                  onChange={(e) => setFiltroStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Agendada">Agendada</option>
                  <option value="Em progresso">Em progresso</option>
                  <option value="Concluida">Concluida</option>
                </select>
                <input
                  type="text"
                  placeholder="Veículo"
                  value={filtroVeiculo}
                  onChange={(e) => setFiltroVeiculo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {filtrarRegistros().length !== 0 ? (
          <div className="order-list">
            {filtrarRegistros().map((order) => (
              <div key={order.IDOS} className="order-card">
                <div className="order-card-name">
                  <div className="usuario-icons-close">
                    <IoClose onClick={() => setAddTarefas(false)} />
                  </div>
                </div>
                <div className="order-name">
                  <h3 className="order-id">Ordem de Serviço - {order.IDOS}</h3>
                  <p className="description">
                    <strong>Descrição:</strong> {order.Descricao}
                  </p>
                </div>
                <div className="vehicle">
                  <img src={Car} width={24} />
                  <p>{order.Placa}</p>
                </div>
                <div className="status-progress">
                  <span>Status: </span>
                  <span className="status-pb">{order.Status}</span>
                </div>
                <div className="data">
                  <img src={Calendar} width={24} />
                  <span>●</span>
                  {format(new Date(order.DataInicio), "dd/MM/yyyy")}
                </div>
                <div className="buttons">
                  {order.Status === "Concluida" ? (
                    <button className="assign-btn" onClick={() => isPrint()}>
                      Imprimir OS
                    </button>
                  ) : (
                    <PDFDownloadLink
                      document={<AtividadePDF data={orders} />}
                      fileName={`Ordem de Manutenção ${order.IDOS}`}
                    >
                      {({ loading }) =>
                        loading ? (
                          <button className="assign-btn">
                            carrega documento
                          </button>
                        ) : (
                          <button
                            onClick={() => imprimirOrdem(order.IDOS)}
                            className="assign-btn"
                          >
                            Imprimir OS
                          </button>
                        )
                      }
                    </PDFDownloadLink>
                  )}
                  {order.Status !== "Concluida" ? (
                    <button
                      className="close-btn"
                      onClick={() => setUserModal(order)}
                    >
                      Fechar Ordem
                    </button>
                  ) : (
                    <button className="close-btn" onClick={() => handleClose()}>
                      Fechar Ordem
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-users">Nenhuma ordem criada.</p>
        )}
      </div>
      {openAddTarefas && <AddOrder closeModal={setAddTarefas} />}
      {openManutencao && (
        <Manutencao closeModal={setOpenManutencao} dadosOS={osDados} />
      )}
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default Atividades;
