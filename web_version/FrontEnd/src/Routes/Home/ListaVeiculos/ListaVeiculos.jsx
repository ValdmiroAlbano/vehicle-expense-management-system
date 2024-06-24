import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import axios from "axios";
import './ListaVeiculos.css';

const ListaVeiculos = ({ closeModal, onVeiculoClick }) => {
    const token = localStorage.getItem('token');
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        const getVeiculos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/veiculos/listar-veiculo', {headers: { 'Authorization': `Bearer ${token}`}});
                setVeiculos(response.data);
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
            }
        };

        getVeiculos();
    }, []);

    return (
        <div className="usuario-drop">
            <div className="lista-veiculos">
                <div className="modal-header">
                    <h3>Lista de Veículos</h3>
                    <IoClose className="close-icon" onClick={() => closeModal(false)} />
                </div>
                <div className="veiculos-list">
                    {
                        veiculos.length !== 0 ?(
                        <>
                        {veiculos.map(veiculo => (
                        <div key={veiculo.IDVeiculo} className="veiculo-card" onClick={() => {
                            onVeiculoClick(veiculo);
                            closeModal(false);
                        }}>
                            <div className="veiculo-header">
                                <h4>{veiculo.Marca}</h4>
                            </div>
                            <div className="veiculo-body">
                                <p>Modelo: {veiculo.Modelo}</p>
                                <p>Placa: {veiculo.Placa}</p>
                            </div>
                        </div>
                    ))}
                        </>
                    ):(
                        <div className="no-veiculos">
                            <p>Não há veículos cadastrados</p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default ListaVeiculos;
