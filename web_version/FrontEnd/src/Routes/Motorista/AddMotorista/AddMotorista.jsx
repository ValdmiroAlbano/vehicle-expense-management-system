import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { IoClose } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import './AddMotorista.css';

const AddMotorista = ({ closeModal }) => {
  const token = localStorage.getItem('token');
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [indicativo, setIndicativo] = useState('');
  const [numero, setNumero] = useState('');
  const [errorNome, setErrorNome] = useState('');
  const [errorContato, setErrorContato] = useState('');
  const [errorSenha, setErrorSenha] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  function notificacao(tipo, message) {
    toast[tipo](message, {
      hideProgressBar: true,
      onClose: () => {
        window.location.reload();
        closeModal();
      },
    });
  }

  const handSubimit = async (e) => {
    e.preventDefault();

    setErrorNome('');
    setErrorContato('');
    setErrorEmail('');
    setErrorSenha('');

    if (!nome || !indicativo || !numero || !email || !senha) {
      if (!nome) setErrorNome('Campo vazio!');
      if (!indicativo || !numero) setErrorContato('Campo vazio!');
      if (!email) setErrorEmail('Campo vazio!');
      if (!senha) setErrorSenha('Campo vazio!');
      return;
    }

    // Verifica validade do email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/;
    if (!emailRegex.test(email)) {
      setErrorEmail('Email deve ser @gmail.com, @hotmail.com ou @yahoo.com');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('contato', `${indicativo} ${numero}`);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('tipoUsuario', 'Motorista');

    try {
      await axios.post('http://localhost:3000/administrador/cadastrar', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
      });
      notificacao("success", "Cadastrado com sucesso");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        toast.error(error.response.data.msg);
      } else {
        toast.error('Erro na requisição:');
      }
    }
  };

  // Função para limpar os campos do formulário
  const handleLimpar = () => {
    setNome('');
    setContato('');
    setEmail('');
    setSenha('');
    setIndicativo('');
    setNumero('');
    setErrorNome('');
    setErrorContato('');
    setErrorEmail('');
    setErrorSenha('');
  };

  // Função para sanitizar entrada de nomes, permitindo apenas letras, espaços, acentos e pontos finais
  const sanitizeNameInput = (input) => {
    return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s.']/g, '');
  };

  // Função para sanitizar entrada de contato, permitindo apenas números
  const sanitizeContactInput = (input) => {
    return input.replace(/[^0-9]/g, '');
  };

  const handleIndicativoChange = (e) => {
    const value = e.target.value;
    setIndicativo(value);
    setNumero(''); // Clear number when changing indicativo
  };

  const formatarNumero = (numero, indicativo) => {
    if (!numero) return '';

    switch (indicativo) {
      case '+244':
        return numero.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
      case '+55':
        return numero.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      case '+1':
        return numero.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
      case '+44':
        return numero.replace(/^(\d{4})(\d{6})$/, '$1 $2');
      case '+351':
        return numero.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
      default:
        return numero;
    }
  };

  const handleNumeroChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const maxDigits = getMaxDigits(indicativo);

    if (value.length <= maxDigits) {
      setNumero(formatarNumero(value, indicativo));
    }
  };

  const getMaxDigits = (indicativo) => {
    switch (indicativo) {
      case '+244':
        return 9; // 993 234 124
      case '+55':
        return 11; // 99 99999 9999
      case '+1':
        return 10; // 999 999 9999
      case '+44':
        return 10; // 9999 999999
      case '+351':
        return 9; // 999 999 999
      default:
        return 15; // General limit if no specific indicativo is selected
    }
  };

  return (
    <div className="motorista-drop">
      <div className="motorista-drop-start">
        <div className="veiculo-card-name">
          <div className="text-card">
            <h3>Adicionar Motorista</h3>
          </div>
          <div className="usuario-icons-close">
            <IoClose id='close' onClick={() => closeModal(false)} />
          </div>
        </div>
        <form onSubmit={handSubimit}>
          <div className="motorista-card-component">
            <div className="motorista-group">
              <div className="usuario-card-group">
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Digite o seu nome"
                  name='nome'
                  value={nome}
                  onChange={(e) => setNome(sanitizeNameInput(e.target.value))}
                />
                <label className='labelError'>{errorNome}</label>
              </div>
              <div className="usuario-card-group">
                <label>Contato</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <select
                    value={indicativo}
                    onChange={handleIndicativoChange}
                    style={{ marginRight: '8px' }}
                  >
                    <option value="">Indicativo</option>
                    <option value="+244">+244 (Angola)</option>
                    <option value="+1">+1 (EUA)</option>
                    <option value="+44">+44 (Reino Unido)</option>
                    <option value="+55">+55 (Brasil)</option>
                    <option value="+351">+351 (Portugal)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Digite o seu número"
                    value={numero}
                    onChange={handleNumeroChange}
                    disabled={!indicativo}
                  />
                </div>
                <label className='labelError'>{errorContato}</label>
              </div>
              <div className="usuario-card-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Digite o email"
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className='labelError'>{errorEmail}</label>
              </div>

              <div className="usuario-card-group">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  name='senha'
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <label className='labelError'>{errorSenha}</label>
              </div>
            </div>

            <div className="buttons usuariosbtn">
              <button type="button" onClick={handleLimpar}>Limpar</button>
              <button type="submit">Guardar</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={1000} hideProgressBar={true} />
    </div>
  );
}

export default AddMotorista;
