import React, { useState, useEffect } from "react";
import axios from "axios";
import {CSVLink} from "react-csv";
import { format } from 'date-fns';
import "./RelatorioManu.css";

const RelatorioManutencao = () => {
  const token = localStorage.getItem('token');
  const [registros, setRegistro] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/administrador/relatorio-manutencao', {headers: { 'Authorization': `Bearer ${token}`}});
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
        const dataRegistro = new Date(registro.DataFim);
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

  const handleFiltrar = () => {
    const registrosFiltrados = filtrarRegistros();
    // Faça algo com os registros filtrados
    console.log(registrosFiltrados);
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
    <div className="relatorio-manutencao-container">
      <h2>Relatório de Manutenção</h2>
      <form onSubmit={BotaoFiltrar} className="filtros">
        <input
          type="date"
          value={filtroDataInicio}
          onChange={handleFiltrar}
        />
        <input
          type="date"
          value={filtroDataFim}
          onChange={handleFiltrar}
        />
        <input
          type="text"
          placeholder="Veículo"
          value={filtroVeiculo}
          onChange={handleFiltrar}
        />
        <div className="export-buttons">
          <button className="btn" type="submit">Filtrar</button>
          <CSVLink className="btn-excel" filename={"Relatório Manutenção.csv"} data={registros}>Excel</CSVLink>
        </div>
      </form>
      <table className="table-container">
        <thead>
          <tr>
            <th>Data</th>
            <th>Veiculo</th>
            <th>Tipo de Manutenção</th>
            <th>Custo (Kz)</th>
          </tr>
        </thead>
        <tbody>
          {
            filtrarRegistros().length !== 0 
            ?(
              filtrarRegistros().map((registro) => (
                <tr key={registro.id}>
                  <td>{format(new Date(registro.DataFim), "dd/MM/yyyy")}</td>
                  <td>{registro.veiculo}</td>
                  <td>{registro.TipoManutencao}</td>
                  {registro.custo.toLocaleString("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                  })}
                </tr>
              ))
            )
            :(
              <tr>
                <td colSpan="4">Nenhum registro encontrado</td>
              </tr>
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

export default RelatorioManutencao;
