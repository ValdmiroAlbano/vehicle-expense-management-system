import React, { useState } from 'react';
import Logo from '../../assets/user/user-icon.svg';
import CardPerfil from '../CardPerfil/CardPerfil';
import './DashboardStyle.css';

const DashboardHeader = ({ setEmailT }) => {
    const [openPerfil, setOpenPerfil] = useState(false);
    const [openNotificacao, setOpenNotificacao] = useState(false);

    const handleProfileClick = () => {
        setOpenPerfil(prevOpen => !prevOpen);
        setOpenNotificacao(false); // Fecha o outro cartão ao abrir este
    };

    const handleCloseProfile = () => {
        if (openPerfil) {
            setOpenPerfil(false);
        }
    };

    const handleCloseNotification = () => {
        if (openNotificacao) {
            setOpenNotificacao(false);
        }
    };

    const handleTextSelect = (e) => {
        // Evita que o evento de seleção se propague para o elemento pai
        e.stopPropagation();
    };

    
    return (
        <div className="mainframe">    
            <div className="top-header" id='top-header'>
                <div className="header-list">
                    <span >Atlas Group</span>
                    <i className='bx bx-chevron-right' title='Notification'></i>
                </div>
                <div className="profile">
                    <div className="icons-rec">
                        <i className='bx bx-bell'></i>
                    </div>
                    <div className='user' onMouseDown={handleProfileClick}>
                        <img src={Logo} alt="" width={40} srcSet="" />
                        <span onMouseDown={handleTextSelect}>{setEmailT}</span>
                    </div>
                </div>
            </div>
            {openPerfil && <CardPerfil closeModal={handleCloseProfile} />}
            {openNotificacao && <CardNotificacao closeModal={handleCloseNotification} />}
        </div>   
    );
}

export default DashboardHeader;
