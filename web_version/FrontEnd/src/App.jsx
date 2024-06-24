import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correção na importação
import { AuthContext } from './contexts/AuthContext';
import Preload from './components/preload/preload';
import DashboardHeader from './components/Dashboard/DashboardHeader';
import DashboardSidebar from './components/Dashboard/DashboardSidebar';

function App() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [nivelAcesso, setNivelAcesso] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
        setNivelAcesso(decoded.tipoUsuario);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [isLoggedIn, navigate, logout]);

  if (!isLoggedIn) {
    return null; // Ou um carregador
  }

  return (
    <div className="App">
      <Preload />
      <DashboardHeader setEmailT={email} />
      <DashboardSidebar Acesso_user={nivelAcesso}/>
      <Outlet />
    </div>
  );
}

export default App;
