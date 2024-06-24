import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import axios from "axios";
import Chart from "chart.js/auto";
import "./Resumo.css";
import AddOrder from "./addAtividades/addOrder";

const Resumo = () => {
  const token = localStorage.getItem('token');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [ordemConcluidas, setOrdemConcluidas] = useState("");
  const [ordemAgendadas, setOrdemAgendadas] = useState("");
  const [ordemEmProgresso, setOrdemEmProgresso] = useState("");
  const [alertas, setAlertas] = useState([]);
  const [OrdemOpen, setOrdemOpen] = useState(false);
  const [osDados, setOsData] = useState(null);
  const [atividadeAdicionada, setAtividadeAdicionada] = useState(false);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Atividades Realizadas",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [], // Dados fictícios de atividades
      },
    ],
  });


  const adicionarAtividade = async (userData) => {
   setOrdemOpen(true);
   setAtividadeAdicionada(true);
   setOsData(userData);
  }

  // Função para buscar os dados do servidor do grafico
  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/manutencoes/dados-grafico", {headers: { 'Authorization': `Bearer ${token}`}}
      );

      const newData = response.data;

      const labels = newData.map((entry) => `${entry.Ano}-${entry.Mes}`);
      const data = newData.map((entry) => entry.Quantidade);

      setChartData({
        ...chartData,
        labels: labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: data,
          },
        ],
      });
    } catch (error) {
      console.error("Erro ao buscar dados do servidor:", error);
    }
  };

  const getAllInformation = async () => {
    try {
      const [
        reclamacaoResponse,
        agendadasResponse,
        concluidasResponse,
        emProgressoResponse,
      ] = await Promise.all([
        axios.get("http://localhost:3000/manutencoes/mostrar-avarias", {headers: { 'Authorization': `Bearer ${token}`}}),
        axios.get("http://localhost:3000/manutencoes/ordem-agendadas", {headers: { 'Authorization': `Bearer ${token}`}}),
        axios.get("http://localhost:3000/manutencoes/ordem-concluidas", {headers: { 'Authorization': `Bearer ${token}`}}),
        axios.get("http://localhost:3000/manutencoes/ordem-emProgresso", {headers: { 'Authorization': `Bearer ${token}`}}),
      ]);
      setAlertas(reclamacaoResponse.data);
      console.log(reclamacaoResponse.data);
      setOrdemAgendadas(agendadasResponse.data[0].totalAgendadas);
      setOrdemConcluidas(concluidasResponse.data[0].totalConcluidas);
      setOrdemEmProgresso(emProgressoResponse.data[0].totalEmProgresso);
    } catch (error) {
      console.log("Erro na requisição!");
    }
  };

  useEffect(() => {
    fetchChartData();
    getAllInformation();
  },[]);

  useEffect(() => {
    // Renderiza o gráfico de barras após atualizar os dados
    if (chartRef.current) {
      if (chartInstance.current) {
        // Se a instância do gráfico já existir, atualize os dados
        chartInstance.current.data = chartData;
        chartInstance.current.update();
      } else {
        // Se a instância do gráfico não existir, cria uma nova instância
        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: chartData,
          options: {
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [chartData]);

  return (
    <>
      <div className="main-content">
        <div className="lembretess-2">
          <h5>Resumo de Atividades</h5>

          <div className="card-ativ">
            <div className="card-atividades">
              <div className="controll">
                <div className="controll-img">
                  <i className="bx bx-user icon"></i>
                </div>
                <div className="controll-text">
                  <p>Serviço Agendados</p>
                  <strong>{ordemAgendadas}</strong>
                </div>
              </div>
              <div className="controll">
                <div className="controll-img">
                  <i className="bx bx-user icon"></i>
                </div>
                <div className="controll-text">
                  <p>Serviço Em progresso</p>
                  <strong>{ordemEmProgresso}</strong>
                </div>
              </div>
              <div className="controll">
                <div className="controll-img">
                  <i className="bx bx-car icon"></i>
                </div>
                <div className="controll-text">
                  <p>Serviço Concluídas</p>
                  <strong>{ordemConcluidas}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-control-chart">
          <div className="statistics">
            <h2>Estatísticas-Chave</h2>
            <div className="chart-container">
              <canvas ref={chartRef} className="chart" />
            </div>
          </div>
          <div className="lista-alertas">
            <div className="lista-top"><h2>Alerta Veiculos</h2></div>
            <ul className="alertas-list">
              {alertas.length !== 0 ? (
                <>
                  {alertas.map((alerta) => (
                    <li key={alerta.id_relatorio_problema} className="alerta-item">
                      <div className="alerta-descricao">
                        <strong>Descrição:</strong> {alerta.descricao}
                      </div>
                      <div className="alerta-info">
                        <div className="alerta-detail">
                          <span className="detail-label">Motorista:</span>{" "}
                          {alerta.nome}
                        </div>
                        <div className="alerta-detail">
                          <span className="detail-label">Contato:</span>{" "}
                          {alerta.contato}
                        </div>
                        <div className="alerta-detail">
                          <span className="detail-label">Veículo:</span>{" "}
                          {alerta.placa}
                        </div>
                        <div className="alerta-detail">
                          <span className="detail-label">Data:</span>{" "}
                          {format(new Date(alerta.data), "dd/MM/yyyy")}
                        </div>
                      </div>
                      {
                        alerta.status === 'Reportado' 
                        ? (
                          <button
                           className="criar-ordem-btn"
                           onClick={() => adicionarAtividade(alerta)}>
                            adicionar atividade
                            </button>
                        )
                        :(
                          <div className="alerta-detail">
                            <span className="detail-label">Status:</span>{" "}
                            {alerta.status}
                          </div>
                        )
                      }
                    </li>
                  ))}
                </>
              ) : (
                <div className="no-alertas">
                  <p>Não há Reclamações de veículos</p>
                </div>
              )}
            </ul>
          </div>
        </div>
        {OrdemOpen && <AddOrder closeModal={setOrdemOpen} dados={osDados} />}
      </div>
    </>
  );
};

export default Resumo;
