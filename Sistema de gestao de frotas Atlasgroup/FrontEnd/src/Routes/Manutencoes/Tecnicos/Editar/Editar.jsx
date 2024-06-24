import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { IoClose } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Editar({ closeModel, tecnico }) {
  const [indicativo, setIndicativo] = useState('');
  const [numero, setNumero] = useState('');
  const [editable, setEditable] = useState(false);
  const [id, setId] = useState(tecnico.IDTecnico);
  const [nome, setNome] = useState(tecnico.nome);
  const [contato, setContato] = useState(tecnico.contato);
  const [especialidade, setEspecialidade] = useState(tecnico.especialidade);

  const [errorNome, setErrorNome] = useState('');
  const [errorContato, setErrorContato] = useState('');
  const [errorEspecialidade, setErrorEspecialidade] = useState('');

  const handleEditClick = () => {
    setEditable(true);
  };

  function notificacao(tipo, message) {
    toast[tipo](message, {
      hideProgressBar: true,
      onClose: () => {
        setTimeout(() => {
          closeModel();
        }, 500);
      },
    });
  }

  const handleLimpar = () => {
    setNome('');
    setEspecialidade('');
    setContato('');
    setIndicativo('');
    setNumero('');
  };

  const handSubimit = async (e) => {
    e.preventDefault();

    setErrorNome('');
    setErrorEspecialidade('');
    setErrorContato('');

    if (!nome || !contato || !especialidade) {
      if (!nome) setErrorNome('Campo vazio!');
      if (!contato) setErrorContato('Campo vazio!');
      if (!especialidade) setErrorEspecialidade('Campo vazio!');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/administrador/atualizar-tecnico/${id}`, {
        nome,
        contato,
        especialidade
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      notificacao('success', "Técnico atualizado");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Erro na atualização", error);
      notificacao('error', "Erro na atualização");
    }
  };

  const handleIndicativoChange = (e) => {
    const value = e.target.value;
    setIndicativo(value);
    setNumero(''); // Limpa o número ao mudar o indicativo
  };

  const formatarNumero = (numero, indicativo) => {
    if (!numero) return '';

    switch (indicativo) {
      case '+244':
        // Formato para Angola: +244 993 234 124
        return numero.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
      case '+55':
        // Formato para Brasil: +55 (99) 99999-9999
        return numero.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      case '+1':
        // Formato para EUA: +1 (999) 999-9999
        return numero.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
      case '+44':
        // Formato para Reino Unido: +44 9999 999999
        return numero.replace(/^(\d{4})(\d{6})$/, '$1 $2');
      case '+351':
        // Formato para Portugal: +351 999 999 999
        return numero.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
      default:
        return numero;
    }
  };

  const handleNumeroChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
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
        return 15; // Limite geral se não houver indicativo selecionado
    }
  };

  return (
    <div className="motorista-drop">
      <div className="motorista-drop-start" style={{ height: '360px' }}>
        <div className="veiculo-card-name">
          <div className="text-card">
            <h3>Editar Técnico</h3>
          </div>
          <div className="usuario-icons-close">
            <IoClose id='close' onClick={() => closeModel(false)} />
          </div>
        </div>
        <form onSubmit={handSubimit}>
          <div className="motorista-Edite-card-component">
            <div className="motorista-group">
              <div className="usuario-card-group">
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Digite o seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={!editable}
                />
              </div>
              <label className="labelError-Edite">{errorNome}</label>
            </div>
            <div className="usuario-card-group">
              <div className="motorista-card-group">
                <label>Contatos</label>
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
              </div>
              <label className="labelError-Edite">{errorContato}</label>
            </div>
            <div className="usuario-card-group">
              <label>Especialidade</label>
              <input
                type="text"
                placeholder="Digite a especialidade"
                value={especialidade}
                onChange={(e) => setEspecialidade(e.target.value)}
                disabled={!editable}
              />
            </div>
            <label className="labelError-Edite">{errorEspecialidade}</label>
            <div className="buttons usuariosbtn">
              <button type="button" onClick={handleLimpar}>
                Limpar
              </button>
              {editable ? (
                <button type="submit">
                  Salvar
                </button>
              ) : (
                <button type="button" onClick={handleEditClick}>
                  Editar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
    </div>
  );
}

export default Editar;
