import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { format } from "date-fns";
import {CSVLink} from "react-csv";
import "./RelatorioGeral.css";

const RelatorioGeral = () => {
  const token = localStorage.getItem('token');
  const [registros, setRegistro] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/administrador/relatorio-geral', {headers: { 'Authorization': `Bearer ${token}`}});
        setRegistro(response.data)
      } catch (err) {
        console.log('erro a buscar dados: ', err);
      }
    }
    getAllData();
  },[])

  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");
  const [filtroVeiculo, setFiltroVeiculo] = useState("");

  const filtrarRegistros = () => {
    let registrosFiltrados = [...registros];

    if (filtroDataInicio && filtroDataFim) {
      registrosFiltrados = registrosFiltrados.filter((registro) => {
        const dataRegistro = new Date(registro.data);
        return (
          dataRegistro >= new Date(filtroDataInicio) &&
          dataRegistro <= new Date(filtroDataFim)
        );
      });
    }

    if (filtroVeiculo) {
      registrosFiltrados = registrosFiltrados.filter((registro) =>
        registro.veiculo.toLowerCase().includes(filtroVeiculo.toLowerCase())
      );
    }

    return registrosFiltrados;
  };

  
  
  const BotaoFiltrar = () => {
    const registrosFiltrados = filtrarRegistros();
  };

  // Função para calcular o total de custo dos registros
  const calcularTotalCusto = () => {
    let total = 0;
    registros.forEach((registro) => {
      total += registro.custo;
    });
    return total.toLocaleString("pt-AO", {
      style: "currency",
      currency: "AOA",
      })
    };


  return (
    <div className="relatorio-geral-container">
      <h2>Relatório Geral</h2>
      <div className="filtros">
        <input
          type="date"
          value={filtroDataInicio}
          onChange={(e) => setFiltroDataInicio(e.target.value)}
        />
        <input
          type="date"
          value={filtroDataFim}
          onChange={(e) => setFiltroDataFim(e.target.value)}
        />
        <input
          type="text"
          placeholder="Veículo"
          value={filtroVeiculo}
          onChange={(e) => setFiltroVeiculo(e.target.value)}
        />
      
      <div className="export-buttons">
        <button className="btn" onClick={BotaoFiltrar}>Filtrar</button>
        <CSVLink className="btn-excel" data={registros} filename={"Relatório da Frota.csv"}>Excel</CSVLink>
      </div>
        
      </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>Data</th>
            <th>Veículo</th>
            <th>Tipo de Serviço</th>
            <th>Custo (Kz)</th>
          </tr>
        </thead>
        <tbody>
          {filtrarRegistros().length !== 0
          ?(
            filtrarRegistros().map((registro) => (
              <tr key={registro.id}>
                <td>{format(new Date(registro.data), "dd/MM/yyyy")}</td>
                <td>{registro.veiculo}</td>
                <td>{registro.tipoServico}</td>
                {registro.custo.toLocaleString("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                })}
              </tr>
            ))
          )
          :(
            <td colSpan="4" className="no-users">Nenhum registro encontrado.</td>
          )
        }
          <tr>
            <td colSpan="3" style={{ textAlign: "right" }}>
              Total:
            </td>
            <td>{calcularTotalCusto()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RelatorioGeral;
