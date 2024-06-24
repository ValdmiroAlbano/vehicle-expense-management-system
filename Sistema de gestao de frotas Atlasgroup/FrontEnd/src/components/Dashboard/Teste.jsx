import React, { useState } from 'react';
import Logo from '../../assets/logoatlas.svg'

const Teste = () => {

    const [activeItem, setActiveItem] = useState(null);

    const highlightMenuItem = (itemName) => {
    setActiveItem(itemName);
    };

    return (
        <nav className='sidebar close' id='sidebar'>
        <header>
            <div className="image-text">
                <span className='image'>
                    <img  src={Logo}  width={50}alt="" />
                </span>
            </div>
        </header>

        <div className="menu-bar">
            <div className="menu">
            <li className={`nav-link ${activeItem === 'Motorista' ? 'active' : ''}`}>
                <a href="/#" onClick={() => highlightMenuItem('Mapas')}>
                <i className='bx bx-home icon'></i>
                <span className="text nav-text">Motoristas</span>
                </a>
            </li>
            <li className={`nav-link ${activeItem === 'Veiculos' ? 'active' : ''}`}>
                <a href="/#" onClick={() => highlightMenuItem('Veiculos')}>
                <i className='bx bx-bar-chart-alt-2 icon'></i>
                <span className="text nav-text">Veículos</span>
                </a>
            </li>
            </div>
        </div>
        <div className="exit">
                    <button>Bonito</button>
                </div>
        </nav>
        
    );
}

export default Teste;
