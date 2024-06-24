import React from 'react';
import './HomePage.css'
import Logo from '../../assets/logoatlasgroup.svg'

const HomePage = () => {
    return (
        <div className="main-content" 
        style={{textAlign: "center",
        paddingTop: "14rem"}}
        >
            <img src={Logo} width={90} alt="" srcset="" />
            <h2>Bem-Vindo(a) ao nosso Sistema</h2>
            <p>Sistema de Gerenciamento de Despesas e Manutenções de Veículos</p>
        </div>
    );
}

export default HomePage;
