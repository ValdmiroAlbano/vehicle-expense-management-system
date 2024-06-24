import React, { useEffect, useState } from 'react';
import './Tarefas.css';
import AttTarefas from './AttTarefas/AttTarefas';
import axios from 'axios';
import { format } from 'date-fns';

const Tarefas = () => {
    const token = localStorage.getItem('token');
    const [openTarefas, setTarefas] = useState(false);
    const [infoTarefa, setInfoTarefa] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const getInfoTarefa = async () => {
            const response = await axios.get('http://localhost:3000/administrador/listar-servico', { headers: { 'Authorization': `Bearer ${token}` } });
            const infoVeiculo = await Promise.all(response.data.map(async veiculo => {
                const PlacaVeiculo = await getIdVeiculo(veiculo.IDVeiculo);
                return { ...veiculo, PlacaVeiculo };
            }));
            setInfoTarefa(infoVeiculo);
        }
        getInfoTarefa();
    }, [token]);

    const getIdVeiculo = async (idVeiculo) => {
        try {
            const response = await axios.get(`http://localhost:3000/manutencoes/veiculo-one/${idVeiculo}`, { headers: { 'Authorization': `Bearer ${token}` } });
            return response.data[0]?.Placa || null;
        } catch (error) {
            console.error('Erro ao buscar motorista:', error);
            return null;
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = infoTarefa.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(infoTarefa.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='main-content'>
            <div className="maind">
                <div className="maind-text">
                    <h2>Manutenções</h2>
                </div>
            </div>
            <div className="btn-click"><br />
            </div>

            <div className="table-container">
                <table id='dataTable'>
                    <thead>
                        <tr>
                            <th>Data agendamento</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Tecnico de manutenção responsavel</th>
                            <th>Placa do Veiculo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length !== 0 ? (
                            currentItems.map((tarefa, index) => (
                                <tr key={index}>
                                    <td>{format(new Date(tarefa.DataInicio), 'dd/MM/yyyy')}</td>
                                    <td>{tarefa.Descricao}</td>
                                    <td>{tarefa.Status}</td>
                                    <td>{tarefa.nome}</td>
                                    <td>{tarefa.PlacaVeiculo}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhuma Historico de Tarefa</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div><br />
            <div className="butttons btn-direction">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    <i className='bx bx-left-arrow-alt'></i>
                </button>
                <div className="count">
                    <span>Pagina: {currentPage} / {totalPages}</span>
                </div>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    <i className='bx bx-right-arrow-alt'></i>
                </button>
            </div>
            {openTarefas && <AttTarefas closeModal={setTarefas} />}
        </div>
    );
}

export default Tarefas;
