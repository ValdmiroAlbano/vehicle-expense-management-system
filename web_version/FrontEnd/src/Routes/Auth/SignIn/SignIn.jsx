import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importação correta
import Preload from '../../../components/preload/preload';
import Logo from '../../../assets/AtlasGroup.svg';
import icontop from '../../../assets/input-icon/top-rig.svg';
import './SignIn.css';
import { useAuth } from '../../../contexts/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErroEmail('');
    setErroSenha('');

    if (!email || !senha) {
      if (!email) setErroEmail('Preencha o email!');
      if (!senha) setErroSenha('Preencha a Senha');
      return;
    }

    try {
      const resposta = await axios.post('http://localhost:3000/usuario/login', { email, senha });
      const novoToken = resposta.data.token;

      if (novoToken && novoToken.split('.').length === 3) {
        localStorage.setItem('token', novoToken);
        const storedToken = localStorage.getItem('token');
        console.log("Token armazenado no localStorage:", storedToken);

        if (!storedToken) {
          console.error("Falha ao armazenar o token no localStorage");
          return;
        }

        let decodedToken;
        try {
          decodedToken = jwtDecode(novoToken);
          console.log("Token decodificado com sucesso:", decodedToken);
        } catch (error) {
          console.error('Token inválido:', error);
          return;
        }

        login(novoToken);

        if (decodedToken.tipoUsuario === 'Administrador') {
          setTimeout(() => {
            navigate('/Dashboard/HomePage');
          }, 1000);
        } else if (decodedToken.tipoUsuario === 'Gestor') {
          setTimeout(() => {
            navigate('/Dashboard/HomePage');
          }, 1000);
        } else if (decodedToken.tipoUsuario === 'Técnico de Manutenção') {
          setTimeout(() => {
            navigate('/Dashboard/ResumoTecn');
          }, 1000);
        } else if (decodedToken.tipoUsuario === 'Motorista') {
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } else {
        console.error('Formato de token inválido:', novoToken);
        toast.error('Erro ao processar o token de autenticação.');
      }
    } catch (err) {
      console.log('Erro na requisição de login', err);
      if (err.response && err.response.data && err.response.data.msg) {
        toast.error(err.response.data.msg);
      }
    }
  };

  return (
    <div className="tags">
      <Preload />
      <div className="grid-columns">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="logo">
              <img src={Logo} width={50} alt="Logo" />
            </div>
            <div className="card-text">
              <h2>Login !</h2>
              <p>Gerenciar as frotas</p>
            </div>
            <div className="card-group">
              <p>Email ou número de telefone</p>
              <div className="email-input">
                <input
                  type="email"
                  placeholder="Example@AtlasGroup.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label className="labelError">{erroEmail}</label>
            </div>
            <div className="card-group">
              <p>Senha</p>
              <div className="senha-input">
                <input
                  type="password"
                  placeholder="Digite a sua senha"
                  name="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <label className="labelError">{erroSenha}</label>
            </div>
            <br />
            <br />
            <div className="buttons">
              <button type="submit">
                Login <img src={icontop} alt="Icon" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  );
};

export default SignIn;
