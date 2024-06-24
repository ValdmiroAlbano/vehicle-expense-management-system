import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AttMotorista.css';
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AttMotorista = ({ closeModal, veiculo }) => {
    const token = localStorage.getItem('token');
    const [searchText, setSearchText] = useState('');
    const [motoristas, setMotoristas] = useState([]);

    useEffect(() => {
        const fetchMotoristas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/administrador/listar-motorista',{ headers: { 'Authorization': `Bearer ${token}` } });
                const motoristasComVeiculo = await Promise.all(response.data.map(async motorista => {
                    const veiculoDoMotorista = await getVeiculoDoMotorista(motorista.IDUsuario);
                    const temVeiculo = !!veiculoDoMotorista;
                    return { ...motorista, temVeiculo };
                }));
                setMotoristas(motoristasComVeiculo);
            } catch (error) {
                console.error('Erro ao buscar motoristas:', error);
            }
        };
        fetchMotoristas();
    }, []);

    const getVeiculoDoMotorista = async (idMotorista) => {
        try {
            const response = await axios.get(`http://localhost:3000/motorista/veiculos-atribuidos/${idMotorista}`, {headers: { 'Authorization': `Bearer ${token}`}});
            const result = response.data[0] || null;
            console.log(result);
            return result
        } catch (error) {
            console.error('Erro ao buscar veículo do motorista:', error);
            return null;
        }
    };

    const atribuirVeiculo = async (idMotorista, motoristaNome) => {
        try {
            const response = await axios.post('http://localhost:3000/administrador/atribuir-veiculo', {
                IDVeiculo: veiculo.IDVeiculo,
                IDMotorista: idMotorista,
            });
            console.log(response.data);
            notificacao('success', 'Veículo atribuído');
        } catch (error) {
            console.error('Erro ao atribuir veículo:', error);
            toast.error('error', 'Erro ao atribuir veículo');
        }
    };

    const removerAtribuicao = async (idMotorista) => {

        const IDveiculo =  veiculo.IDVeiculo
        try {
            await axios.delete(`http://localhost:3000/administrador/removerVeiculoAtribuido/${IDveiculo}/${idMotorista}`, {headers: { 'Authorization': `Bearer ${token}`}});
            notificacao('success', 'Atribuição de veículo removida');
        } catch (error) {
            console.error('Erro ao remover atribuição de veículo:', error);
            toast.error('Erro ao remover atribuição de veículo');
        }
    };

    function notificacao(tipo, message) {
        toast[tipo]( message, {
            hideProgressBar: true,
            onClose: () => {
                  window.location.reload()
                  closeModal();
            },
        });
      }

    // Filtrar motoristas com base no texto de pesquisa
    const filteredMotoristas = motoristas.filter(motorista =>
        motorista.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className='veiculo-drop'>
                <div className="veiculo-drop-start-atribuir">
                <div className="veiculo-card-name">
                    <div className="text-card">
                    <h3>Atribuir Veículos</h3>
                    </div>
                    <div className="usuario-icons-close">
                        <IoClose onClick={() => closeModal(false)} />
                    </div>
                </div>
                    <div className="notif-pesquisar">
                        <input
                            type="search"
                            placeholder='Pesquisar motorista...'
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    <div className="notif-motorista">
                        {filteredMotoristas.length !== 0 ? (
                        <>
                        {filteredMotoristas.map((motorista, index) => (
                            <div className="notif-user-card" key={index}>
                                <div className="card-header">{motorista.nome}</div>
                                <div className="card-footer">
                                    {motorista.temVeiculo ? (
                                        <button onClick={() => removerAtribuicao(motorista.IDUsuario)}>
                                            Remover Atribuição
                                        </button>
                                    ) : (
                                        <button onClick={() => atribuirVeiculo(motorista.IDUsuario, motorista.nome)}>
                                            Atribuir Veículo
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        </>
                        ):(
                        <>
                        <div className="notif-user-card">
                            <div className="card-header">Nenhum motorista encontrado</div>
                        </div>
                        </>
                    )}
                    </div>
                </div>
            </div>
            <ToastContainer autoClose= {500}/>
        </div>
    );
}

export default AttMotorista;
