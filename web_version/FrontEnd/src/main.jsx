import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignIn from './Routes/Auth/SignIn/SignIn';
import RecuperarConta from './Routes/Auth/RecuperarConta/RecuperarConta';
import HomePage from './Routes/HomePage/HomePage';
import Mapa from './Routes/Mapa/Mapa';
import Home from './Routes/Home/Home';
import App from './App';
import Motorista from './Routes/Motorista/Motorista';
import Veiculos from './Routes/Veiculos/Veiculos';
import Usuario from './Routes/Usuario/Usuario';
import Tarefas from './Routes/Tarefas/Tarefas';
import Relatorio from './Routes/Home/Relatorio/Relatorio';
import Resumo from './Routes/Manutencoes/Resumo/Resumo';
import Atividades from './Routes/Manutencoes/Atividades/Atividades';
import VeiculosTecn from './Routes/Manutencoes/Veiculos/VeiculosTecn';
import Tecnicos from './Routes/Manutencoes/Tecnicos/Tecnicos';
import ProtectedRoute from './contexts/ProtectedRoute';
import DasbordAdmin from './Routes/AdminMaster/DasbordAdmin'; 

//todas as rotas que tem esse metodo <ProtectedRoute> sao protegida 
/* A rota masterAcess e a rota do admin*/
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/RecuperarConta" element={<RecuperarConta />} />
    <Route path="/Usuario" element={<Usuario />}/>
    <Route path="/Dashboard" element={<ProtectedRoute><App /></ProtectedRoute>}>
      <Route path="HomePage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="MasterAcess" element={<ProtectedRoute><DasbordAdmin /></ProtectedRoute>} /> 
      <Route path="Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="Mapa" element={<ProtectedRoute><Mapa /></ProtectedRoute>} />
      <Route path="Motorista" element={<ProtectedRoute><Motorista /></ProtectedRoute>} />
      <Route path="Veiculo" element={<ProtectedRoute><Veiculos /></ProtectedRoute>} />
      <Route path="Usuario" element={<ProtectedRoute><Usuario /></ProtectedRoute>} />
      <Route path="Relatorio" element={<ProtectedRoute><Relatorio /></ProtectedRoute>} />
      <Route path="Tarefas" element={<ProtectedRoute><Tarefas /></ProtectedRoute>} />
      <Route path="ResumoTecn" element={<ProtectedRoute><Resumo /></ProtectedRoute>} />
      <Route path="TecnicosTecn" element={<ProtectedRoute><Tecnicos /></ProtectedRoute>} />
      <Route path="AtividadesTecn" element={<ProtectedRoute><Atividades /></ProtectedRoute>} />
      <Route path="VeiculosTecn" element={<ProtectedRoute><VeiculosTecn /></ProtectedRoute>} />
    </Route>
  </Routes>
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
