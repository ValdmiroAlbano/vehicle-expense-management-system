import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { IoClose } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import "./AddUsuario.css";

const AddUsuario = ({ closeModal }) => {
  const token = localStorage.getItem('token');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [funcao, setFuncao] = useState('');
  const [contacto, setContacto] = useState('');
  const [indicativo, setIndicativo] = useState('');
  const [numero, setNumero] = useState('');

  // Error states
  const [erroNome, setErroNome] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroFuncao, setErroFuncao] = useState('');
  const [erroContacto, setErroContacto] = useState('');

  const notificacao = (tipo, message) => {
    toast[tipo](message, {
      hideProgressBar: true,
      onClose: () => {
        setTimeout(() => {
          closeModal();
        }, 1000);
      },
    });
  };

  const addUsuario = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErroNome('');
    setErroEmail('');
    setErroSenha('');
    setErroFuncao('');
    setErroContacto('');

    // Validate fields
    if (!nome || !email || !senha || !funcao || !numero) {
      if (!nome) setErroNome('Preencha o Nome');
      if (!contacto) setErroContacto('Preencha o Contacto');
      if (!email) setErroEmail('Preencha o Email');
      if (!senha) setErroSenha('Preencha a Senha');
      if (!funcao) setErroFuncao('Selecione a Função');
      return;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/;
    if (!emailRegex.test(email)) {
      setErroEmail('Email deve ser @gmail.com, @hotmail.com ou @yahoo.com');
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('contato', `${indicativo} ${numero}`);
    formData.append('tipoUsuario', funcao);

    try {
      await axios.post('http://localhost:3000/administrador/cadastrar', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
      });
      notificacao('success', "Usuário cadastrado com sucesso");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        toast.error(error.response.data.msg);
      } else {
        toast.error('Erro na requisição:');
      }
    }
  };

  const handleLimpar = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setFuncao('');
    setContacto('');
    setIndicativo('');
    setNumero('');
    setErroNome('');
    setErroEmail('');
    setErroSenha('');
    setErroFuncao('');
    setErroContacto('');
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

  const sanitizeNameInput = (input) => {
    return input.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s.']/g, '');
  };

  return (
    <div className='usuario-drop'>
      <div className="usuario-drop-start">
        <form onSubmit={addUsuario}>
          <div className="veiculo-card-component">
            <div className="veiculo-card-name">
              <div className="text-card">
                <h3>Adicionar Usuário</h3>
              </div>
              <div className="usuario-icons-close">
                <IoClose id='close' onClick={() => closeModal(false)} />
              </div>
            </div>

            <div className="usuario-group-select">
              <div className='usuario-card-group'>
                <label>Nome</label>
                <input
                  type="text"
                  name='Nome'
                  placeholder='Digite o nome'
                  value={nome}
                  onChange={(e) => setNome(sanitizeNameInput(e.target.value))}
                />
                <label className='labelError'>{erroNome}</label>
              </div>
            </div>
            <div className="usuario-group-select">
            <div className="motorista-card-group">
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
              <label className="labelError">{erroContacto}</label>
            </div>
            </div>

           

            <div className='usuario-card-group'>
              <label>Função</label>
              <select value={funcao} onChange={(e) => setFuncao(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="Administrador">Administrador</option>
                <option value="Gestor">Gestor</option>
                <option value="Técnico de Manutenção">Técnico de Manutenção</option>
              </select>
              <label className='labelError'>{erroFuncao}</label>
            </div>

            <div className='usuario-card-group'>
              <label>Email</label>
              <input
                type="email"
                name='Email'
                placeholder='Digite o email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className='labelError'>{erroEmail}</label>
            </div><br />

            <div className='usuario-card-group'>
              <label>Senha</label>
              <input
                type="password"
                name='Senha'
                placeholder='Digite a senha'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <label className='labelError'>{erroSenha}</label>
            </div>

            <div className="buttons usuariosbtn">
              <button type="button" onClick={handleLimpar}>Limpar</button>
              <button type="submit">Guardar</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default AddUsuario;
