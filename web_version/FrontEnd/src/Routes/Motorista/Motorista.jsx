import { useEffect, useState } from 'react';
import AddMotorista from './AddMotorista/AddMotorista';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Motorista.css'
import EditarMotorista from './EditarMotorista/editarMotorista';

const Motorista = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [motoristas, setMotoristas] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMotoristas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/administrador/listar-motorista', { headers: { 'Authorization': `Bearer ${token}` } });
                const MotoristaComVeiculo = await Promise.all(response.data.map(async motorista => {
                    const veiculoDoMotorista = await getVeiculoDoMotorista(motorista.IDUsuario);
                    const temVeiculo = !!veiculoDoMotorista;
                    return { ...motorista, temVeiculo };
                }));
                setMotoristas(MotoristaComVeiculo);
            } catch (error) {
                console.error("Erro ao tentar ver motorista!", error);
                if (error.response && error.response.data && error.response.data.msg) {
                    console.log(error);
                }
            }
        };
        fetchMotoristas();
    }, [token]);

    const getVeiculoDoMotorista = async (idMotorista) => {
        try {
            const response = await axios.get(`http://localhost:3000/motorista/veiculos-atribuidos/${idMotorista}`, { headers: { 'Authorization': `Bearer ${token}` } });
            const result = response.data[0] || null;
            console.log(result);
            return result;
        } catch (error) {
            console.error('Erro ao buscar veículo do motorista:', error);
            return null;
        }
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setOpenEdit(true);
    };

    const handleRemoveClick = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/administrador/excluir/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            setMotoristas(prevMotoristas => prevMotoristas.filter(motorista => motorista.IDUsuario !== userId));

            if (response.data) {
                toast.success(`Apagado com sucesso!`);
            } else {
                toast.error('Erro ao remover motorista!');
            }

        } catch (error) {
            toast.error('Erro ao remover motorista!');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = motoristas.filter(motorista => motorista.nome.toLowerCase().includes(searchText.toLowerCase())).slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(motoristas.length / itemsPerPage);

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
        <div className='Relatorios'>
            <div className='main-content'>
                <div className="maind">
                    <div className="maind-text">
                        <h2>Motorista</h2>
                    </div>
                    <div className="inp">
                        <input type="search" placeholder='Pesquisar aqui...' value={searchText} onChange={handleSearchChange} />
                    </div>
                </div>
                <div className="comp-arqu">
                    <div className="btn-click">
                        <div className="butttons">
                            <button onClick={() => setOpenAdd(true)}>
                                Adicionar Motorista
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    <table id='dataTable'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Contacto</th>
                                <th>Status</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length !== 0 ? (
                                currentItems.map((motorista, index) => (
                                    <tr key={index}>
                                        <td>{motorista.nome}</td>
                                        <td>{motorista.contato}</td>
                                        <td>{motorista.temVeiculo ? 'Online' : 'Offline'}</td>
                                        <td>
                                            <i className='bx bx-edit' id='crud' onClick={() => handleEditClick(motorista)}></i>
                                            <i className='bx bx-eraser' id='crud' onClick={() => handleRemoveClick(motorista.IDUsuario)}></i>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="no-users">Nenhum motorista cadastrado.</td>
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
            <ToastContainer autoClose={1000} hideProgressBar={true} />
            {openEdit && <EditarMotorista closeModalEdite={setOpenEdit} motorista={selectedUser} />}
            {openAdd && <AddMotorista closeModal={setOpenAdd} />}
        </div>
    );
}

export default Motorista;
