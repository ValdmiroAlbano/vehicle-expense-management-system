import { useState, useEffect } from 'react';
import './CardPerfil.css';
import Logo from '../../assets/user/user-icon.svg';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const CardPerfil = ({ closeModal }) => {
    const token = localStorage.getItem('token');
    const [nivelAcesso, setNivelAcesso] = useState('');
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const decoded = jwtDecode(token);
        setNivelAcesso(decoded.tipoUsuario);
        setNome(decoded.nome);
    }, [token]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/'); 
    };

    return (
        <div className='CardPefil'>
            <div className='cardperfil username'>
                <div className='card-user-img'>
                    <img src={Logo} alt='' width={60} />
                </div>
                <div className='card-user-text'>
                    <h4>{nome}</h4>
                    <label htmlFor=''>{nivelAcesso}</label>
                </div>
            </div>
            <div className='buttons'>
                <button onClick={logout}>Sair da Página</button>
            </div>
        </div>
    );
};

export default CardPerfil;
