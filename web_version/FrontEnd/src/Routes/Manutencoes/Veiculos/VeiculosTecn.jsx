import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import ImageBanner from "../../../assets/banner.jpeg";
import { IoClose } from "react-icons/io5";
import "./VeiculosTecn.css"; // Importando o arquivo CSS de estilo

const VeiculosTecn = () => {
  const token = localStorage.getItem('token');
  const [veiclos, setVeiculos] = useState([]);
  const [manutencao, setManutencao] = useState([]);

  useEffect(() => {
    const getVeiculos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/administrador/listar-veiculo/1",{headers: { 'Authorization': `Bearer ${token}`}}
        );
        setVeiculos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getVeiculos();
  }, []);

  useEffect(() => {
    const getManutencao = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/administrador/visualizarHistoricoManutencoes/1", {headers: { 'Authorization': `Bearer ${token}`}}
        );
        setManutencao(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getManutencao();
  });

  return (
    <>
      <div className="main-content">
        <div className="maind">
          <div className="maind-text">
            <h2>Histórico dos Veículos</h2>
          </div>
          <div className="inp">
            <input type="search" placeholder="Pesquisar aqui..." />
          </div>
        </div>
        <div className="vehicle-grid">
          <div className="vehicle-bg">
            <h2 style={{textAlign: "left"}}>Veículos</h2>
            <p>
              Possibilitar acompanhamento dos veiculos, de acordo com as suas descrição.
              andamento.
            </p>
            <div className="buttons" id="gerar">
              <button>Historico dos Veículos</button>
            </div>
            <img
              src={ImageBanner}
              width={400}
              style={{ textAlign: "center", marginTop: "2rem" }}
            />
          </div>

          {veiclos.map((veiclos) => (
            <div key={veiclos.IDVeiculo} className="vehicle-list">
              <div className="vehicle-tracking-container">
                <div className="order-card-name">
                  <div className="order-icons-close">
                    <IoClose id="close" />
                  </div>
                </div>
                <div className="order-name">
                  <h3 className="order-id">Veiculos</h3>
                  <p className="description">
                    <strong>Marca: </strong> {veiclos.Marca}
                  </p>
                  <p className="description">
                    <strong>Placa: </strong> {veiclos.Placa}
                  </p>
                  <p className="description">
                    <strong>Quilometragem: </strong>{" "}
                    {veiclos.QuilometragemAtual}Km
                  </p>
                </div>
                <div className="order-name">
                  <h3 className="order-id">última Manutenção</h3>
                  <p className="description">
                    <strong>Data: </strong>{" "}
                    {format(
                      new Date(veiclos.DataUltimaManutencao),
                      "dd/MM/yyyy"
                    )}
                  </p>
                  <div className="status-progress">
                    <span>Status: </span>
                    <span className="status-pb">{veiclos.Status}</span>
                  </div>
                </div>
                <div className="order-name">
                  <h3 className="order-id">Manutenções</h3>
                  {manutencao.map((manutencao) => (
                    <ul>
                      <li key={manutencao.IDManutencao}>
                        {manutencao.Descricao} - Data:{" "}
                        {format(new Date(manutencao.DataFim), "dd/MM/yyyy")} -
                        Custo:{manutencao.CustoToTal}Kz
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VeiculosTecn;
