import React, { useState, useEffect, useRef } from "react";
import "./Tecnicos.css";
import Adicionar from "./Adicionar/Adicionar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Editar from "./Editar/Editar";

const Tecnicos = () => {
  const token = localStorage.getItem('token');
  const [tecnico, setTecnico] = useState([]);
  const [openAdicionar, setOpenAdicionar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [seleTecn, setSeleTecn] = useState(null);

  useEffect(() => {
    const getTecnicos = async () => {
      const response = await axios.get(
        "http://localhost:3000/administrador/listar-tecnico", {headers: { 'Authorization': `Bearer ${token}`}}
      );
      setTecnico(response.data);
    };
    getTecnicos();
  }, []);

  const handleEditClick = (tecnico) => {
    setOpenEditar(true);
    setSeleTecn(tecnico);
  };

  const handleRemoveClick = async (IDTecnico) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/administrador/remover-tecnico/${IDTecnico}`, {headers: { 'Authorization': `Bearer ${token}`}}
      );
      setTecnico((atualizarTecnico) =>
        atualizarTecnico.filter((tecnico) => tecnico.IDTecnico !== IDTecnico)
      );
      if (response.data) {
        toast.success("Tecnico removido com sucesso!");
      } else {
        toast.error("Erro ao remover tecnico!");
      }
    } catch (error) {
      toast.error("Erro ao remover tecnico!");
    }
  };


  return (
    <>
      <div className="Relatorios">
        <div className="main-content">
          <div className="maind">
            <div className="maind-text">
              <h2>Tecnicos de Manutenção</h2>
            </div>
            <div className="inp">
              <input type="search" placeholder="Pesquisar aqui..." />
            </div>
          </div>
          <div className="comp-arqu">
            <div className="btn-click">
              <div className="butttons">
                <button onClick={() => setOpenAdicionar(true)}>
                  Adicionar Tecnico
                  <i className="bx bx-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table id="dataTable">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Contacto</th>
                  <th>Especialidade</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {tecnico.length !== 0 ? (
                  <>
                    {tecnico.map((tecnico) => (
                      <tr key={tecnico.IDTecnico}>
                        <td>{tecnico.nome}</td>
                        <td>{tecnico.contato}</td>
                        <td>{tecnico.especialidade}</td>
                        <td>
                          <i
                            className="bx bx-edit"
                            id="crud"
                            onClick={() => handleEditClick(tecnico)}
                          ></i>
                          <i
                            className="bx bx-eraser"
                            id="crud"
                            onClick={() =>
                              handleRemoveClick(tecnico.IDTecnico)
                            }
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="4" className="no-users">
                      Nenhum motorista cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} hideProgressBar={true} />
      {openAdicionar && <Adicionar closeModal={setOpenAdicionar} />}
      {openEditar && <Editar closeModel={setOpenEditar} tecnico={seleTecn} />}
    </>
  );
};

export default Tecnicos;
