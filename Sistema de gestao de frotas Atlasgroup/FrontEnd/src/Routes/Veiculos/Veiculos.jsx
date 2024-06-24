import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AddVeiculos from './AddVeiculos/AddVeiculos';
import './Veiculos.css';
import AttMotorista from './AttMotorista/AttMotorista';
import { TbSteeringWheel } from "react-icons/tb";
import * as XLSX from 'xlsx';

const Veiculos = () => {
    const token = localStorage.getItem('token');
    const [nivelAcesso, setNivelAcesso] = useState('');
    const [open, setOpen] = useState(false);
    const [openAtribuir, setOpenAtribuir] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectVeiculo, setSelectVeiculo] = useState(null);
    const [veiculos, setVeiculos] = useState([]);
    const [filtroMotorista, setFiltroMotorista] = useState('todos');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setNivelAcesso(decoded.nivel_acesso);
        }
    }, [token]);

    useEffect(() => {
        const getVeiculos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/veiculos/listar-veiculo', { headers: { 'Authorization': `Bearer ${token}` } });
                const updatedVeiculos = await Promise.all(
                    response.data.map(async veiculo => {
                        const nomeMotorista = await getMotoristaByIdVeiculo(veiculo.IDVeiculo);
                        return { ...veiculo, nomeMotorista };
                    })
                );
                setVeiculos(updatedVeiculos);
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
            }
        };
        getVeiculos();
    }, [token]);

    const getMotoristaByIdVeiculo = async (idVeiculo) => {
        try {
            const response = await axios.get(`http://localhost:3000/veiculos/motorista-veiculo/${idVeiculo}`, { headers: { 'Authorization': `Bearer ${token}` } });
            return response.data[0]?.nome || null;
        } catch (error) {
            console.error('Erro ao buscar motorista:', error);
            return null;
        }
    };

    const filteredVeiculos = veiculos.filter(veiculo => {
        const matchSearch = veiculo.Marca.toLowerCase().includes(searchText.toLowerCase());
        const matchFiltroMotorista = filtroMotorista === 'todos' || (filtroMotorista === 'com' && veiculo.nomeMotorista) || (filtroMotorista === 'sem' && !veiculo.nomeMotorista);
        return matchSearch && matchFiltroMotorista;
    });

    const VeiculoEdit = (veiculo) => {
        setOpenAtribuir(true);
        setSelectVeiculo(veiculo);
    };

    const Apagar = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/administrador/excluir-veiculo/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
            setVeiculos(prevVeiculos => prevVeiculos.filter(veiculo => veiculo.IDVeiculo !== id));
            toast.success(`Veiculo apagado com sucesso!`);
        } catch (erro) {
            toast.error('Erro ao excluir veiculo');
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredVeiculos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Veículos");
        XLSX.writeFile(workbook, "veiculos.xlsx");
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVeiculos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredVeiculos.length / itemsPerPage);

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
        <div>
            <div className='main-content'>
                <div className="maind">
                    <div className="maind-text">
                        <h2>Veículos</h2>
                    </div>
                    <div className="inp">
                        <input
                            type="search"
                            placeholder='Pesquisar aqui...'
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>
                <div className="comp-arqu">
                    <div className="btn-click">
                        <div className="butttons">
                            <button onClick={() => setOpen(true)}>
                                Adicionar Veículos
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>
                        
                    </div>
                    {/* <button onClick={() => setFiltroMotorista('todos')}>Todos</button>
                        <button onClick={() => setFiltroMotorista('com')}>Com Motorista</button>
                        <button onClick={() => setFiltroMotorista('sem')}>Sem Motorista</button> */}
                    <div className="filter-buttons">
                       <select name="" id="">
                            <option value="">Filtro</option>
                            <option value="" onClick={() => setFiltroMotorista('todos')}>Todos</option>
                            <option value="" onClick={() => setFiltroMotorista('com')}>Motorista</option>
                            <option value="" onClick={() => setFiltroMotorista('todos')}>Sem Motorista</option>
                       </select>
                    </div>
                    <button className="btn-excel" onClick={exportToExcel}>
                                Exportar para Excel 
                    </button>   
                </div>
                <div className="table-container">
                    <table id='dataTable'>
                        <thead>
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Placa</th>
                                <th>Status</th>
                                <th>Motorista</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length !== 0 ? (
                                currentItems.map((veiculo, index) => (
                                    <tr key={index}>
                                        <td>{veiculo.Marca}</td>
                                        <td>{veiculo.Modelo}</td>
                                        <td>{veiculo.Placa}</td>
                                        <td>{veiculo.Status}</td>
                                        <td>{veiculo.nomeMotorista || "Sem motorista"}</td>
                                        <td>
                                            <TbSteeringWheel onClick={() => VeiculoEdit(veiculo)} />
                                            <i className='bx bx-eraser' onClick={() => Apagar(veiculo.IDVeiculo)} id='crud'></i>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-users">Nenhum veiculo cadastrado.</td>
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
            </div>
            {open && <AddVeiculos closeModal={setOpen} />}
            {openAtribuir && <AttMotorista closeModal={setOpenAtribuir} veiculo={selectVeiculo} />}
            <ToastContainer autoClose={1000} hideProgressBar={true} />
        </div>
    );
}

export default Veiculos;
