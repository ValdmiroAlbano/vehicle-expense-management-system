import React, { useEffect, useState, useRef } from "react";
import {CSVLink} from "react-csv";
import { format } from "date-fns";
import "./RelatorioAbast.css";
import axios from "axios";

const RelatorioAbastecimento = () => {
  const token = localStorage.getItem('token');
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    veiculo: "",
    tipoCombustivel: "",
  });

  const [registros, setRegistro] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/administrador/relatorio-abastecimento', {headers: { 'Authorization': `Bearer ${token}`}});
        setRegistro(response.data)
      } catch (err) {
        console.log('erro a buscar dados: ', err);
      }
    }
    getAllData();
  },[]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const BotaoFiltrar = () => {
    const registrosFiltrados = filtrarRegistros();
  };

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
    <div className="relatorio-abastecimento-container">
      <h2>Relatório de Abastecimento</h2>
      <form onSubmit={BotaoFiltrar} className="filtros">
        <input
          type="date"
          name="dataInicio"
          value={filtros.dataInicio}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dataFim"
          value={filtros.dataFim}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="veiculo"
          placeholder="Veículo"
          value={filtros.veiculo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tipoCombustivel"
          placeholder="Tipo de Combustível"
          value={filtros.tipoCombustivel}
          onChange={handleInputChange}
        />
         <div className="export-buttons">
            <button className="btn" type="submit">Filtrar</button>
            <CSVLink className="btn-excel" filename={"Relatório de Abastecimento.csv"} data={registros}>Excel</CSVLink>
        </div>
      </form>

      <table className="table-container">
        <thead>
          <tr>
            <th>Data</th>
            <th>Veículo</th>
            <th>Tipo de Combustível</th>
            <th>Quantidade Abastecida</th>
            <th>Custo (Kz)</th>
          </tr>
        </thead>
        <tbody>
          {
            registros.length !== 0 
            ? (
              registros.map((registro) => (
                <tr key={registro.id}>
                  <td>{format(new Date(registro.data), "dd/MM/yyyy")}</td>
                  <td>{registro.veiculo}</td>
                  <td>{registro.tipoCombustivel}</td>
                  <td>{registro.litrosAbastecidos}</td>
                  {registro.custo.toLocaleString("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                  })}
                </tr>
              ))
            ) 
            :(
              <tr>
                <td colSpan="5">Nenhum registro encontrado</td>
              </tr>
            )
          }
          <tr>
            <td colSpan="4" style={{ textAlign: "right" }}>
              Total:
            </td>
            <td>{calcularTotalCusto()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RelatorioAbastecimento;
