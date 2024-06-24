import { useEffect, useState } from "react";
import banner from "../../assets/banner.jpeg";
import ListaVeiculos from "./ListaVeiculos/ListaVeiculos";
import { format } from "date-fns";
import axios from "axios";
import "./Home.css";

const Home = ({ closeModal }) => {
  const [openListaVeiculos, setListaVeiculos] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const [abastecimentos, setAbastecimentos] = useState([]);
  const [manutencao, setManutencao] = useState([]);

  const token = localStorage.getItem('token');
  //Listar abastecimento
  useEffect(() => {
    console.log("Comprimento do array abastecimentos:", abastecimentos.length);
    if (veiculoSelecionado) {
      const fetchAbastecimento = async () => {
        try {
          const resultAbastecimentos = await axios.get(
            `http://localhost:3000/abastecimentos/abastecimentoPorId/${veiculoSelecionado.IDVeiculo}`, {headers: { 'Authorization': `Bearer ${token}`}}
          );
          setAbastecimentos(resultAbastecimentos.data);
        } catch (err) {
          console.error("Erro ao tentar listar abastecimento", err);
        }
      };
      //Listar manutencao
      const fetchManutencao = async () => {
        try {
          const resultManutencao = await axios.get(
            `http://localhost:3000/manutencoes/TotalTarefaManutencao/${veiculoSelecionado.IDVeiculo}`, {headers: { 'Authorization': `Bearer ${token}`}}
          );
          setManutencao(resultManutencao.data);
        } catch (err) {
          console.error("Erro ao tentar listar dados de manutenção", err);
        }
      };
      console.log(
        "Comprimento do array abastecimentos:",
        abastecimentos.length
      );
      fetchAbastecimento();
      fetchManutencao();
    } else {
      setAbastecimentos([]);
      setManutencao([]);
    }
  }, [veiculoSelecionado]);

  //Veiculo selecionado
  const handleVeiculoClick = (veiculo) => {
    setVeiculoSelecionado(veiculo);
  };


  const handleCloseModal = () => {
    setOpenComprovativo(false);
  };

  return (
    <div className="main-content">
      <div className="lemb-veiculos">
        <div className="buttons">
          <button onClick={() => setListaVeiculos(true)}>Veículos</button>
        </div>
      </div>
      <div className="lembretes">
        <div className="lembretess">
          <h2 className="dashboard-title">Historico Veiculos</h2>
          {veiculoSelecionado ? (
            <div>
              <h3 className="section-title">Abastecimentos</h3>
              {abastecimentos.length === 0 ? (
                <p className="no-data-message">
                  Nenhum abastecimento para este veículo!
                </p>
              ) : (
                <ul className="historico-list">
                  {abastecimentos.map((abastecimento, index) => (
                    <li key={index} className="historico-item">
                      <div className="historico-content">
                        <span className="historico-label">
                          Data de abastecimento:
                        </span>
                        <span className="historico-value">
                          {format(new Date(abastecimento._data), "dd/MM/yyyy")}
                        </span>
                      </div>
                      <div className="historico-content">
                        <span className="historico-label">
                          Litros abastecidos:
                        </span>
                        <span className="historico-value">
                          {abastecimento.litrosAbastecidos}
                        </span>
                      </div>
                      <div className="historico-content">
                        <span className="historico-label">Custo:</span>
                        <span className="historico-value">
                          {abastecimento.custo.toLocaleString("pt-AO", {
                            style: "currency",
                            currency: "AOA",
                          })}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <>
              <img src={banner} alt="Banner" />
              <h4 className="select-vehicle-message">
                Selecione um veículo para obter informações!
              </h4>
            </>
          )}
          {veiculoSelecionado && (
            <div>
              <h3 className="section-title">Manutenções</h3>
              {manutencao.length === 0 ? (
                <p className="no-data-message">
                  Nenhuma manutenção para este veículo!
                </p>
              ) : (
                <ul className="historico-list">
                  {manutencao.map((manutencao) => (
                    <li
                      key={manutencao.IDManutencao}
                      className="historico-item"
                    >
                      <div className="historico-content">
                        <span className="historico-label">
                          Data de manutenção:
                        </span>
                        <span className="historico-value">
                          {format(new Date(manutencao.DataFim), "dd/MM/yyyy")}
                        </span>
                      </div>
                      <div className="historico-content">
                        <span className="historico-label">Descrição:</span>
                        <span className="historico-value">
                          {manutencao.Descricao}
                        </span>
                      </div>
                      <div className="historico-content">
                        <span className="historico-label">Custo:</span>
                        <span className="historico-value">
                          {manutencao.CustoToTal.toLocaleString("pt-AO", {
                            style: "currency",
                            currency: "AOA",
                          })}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="lembretess-2">
          <h2 className="dashboard-title">Total de gastos</h2>
          <h5>Total mês</h5>
          <div className="card-lem">
            <div className="card-custo">
              <h4>Custo Abastecimento</h4>
              <h1>
                Kz{" "}
                {abastecimentos.reduce(
                  (total, abastecimento) =>
                    total + abastecimento.total_abastecidos,
                  0
                )}
              </h1>
            </div>
            <div className="card-custo">
              <h4>Custo Manutenção</h4>
              <h1>
                Kz{" "}
                {manutencao.reduce(
                  (total, manutencao) =>
                    total + manutencao.total_gasto_manutencao,
                  0
                )}
              </h1>
            </div>
          </div>
          <br />
          <div className="card-leme">
            <div className="control">
              <div className="controll">
                <div className="controll-img">
                  <i className="bx bx-user icon"></i>
                </div>
                <div className="controll-text">
                  <p>Manutenção</p>
                  <strong>{manutencao.length > 0 ? "30" : "0"} %</strong>
                </div>
              </div>
              <div className="controll">
                <div className="controll-img">
                  <i className="bx bx-car icon"></i>
                </div>
                <div className="controll-text">
                  <p>Abastecimento</p>
                  <strong>{abastecimentos.length > 0 ? "30" : "0"} %</strong>
                </div>
              </div>
            </div>
            <div className="buttons">
              <a href="/Dashboard/Relatorio">
                <button id="gerar">Gerar Relatórios</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {openListaVeiculos && (
        <ListaVeiculos
          closeModal={setListaVeiculos}
          onVeiculoClick={handleVeiculoClick}
        />
      )}
    </div>
  );
};

export default Home;
