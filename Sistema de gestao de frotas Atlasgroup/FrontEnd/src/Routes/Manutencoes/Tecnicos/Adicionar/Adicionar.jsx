import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';

function Adicionar({ closeModal }) {
  const [nome, setNome] = useState("");
  const [indicativo, setIndicativo] = useState("");
  const [numero, setNumero] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  const [errorNome, setErrorNome] = useState("");
  const [errorContato, setErrorContato] = useState("");
  const [errorEspecialidade, setErrorEspecialidade] = useState("");

  const token = localStorage.getItem('token');

  function notificacao(tipo, message) {
    toast[tipo](message, {
      hideProgressBar: true,
      onClose: () => {
        window.location.reload();
        closeModal();
      },
    });
  }

  const handleLimpar = () => {
    setNome('');
    setEspecialidade('');
    setIndicativo('');
    setNumero('');
  };

  const handleIndicativoChange = (e) => {
    const value = e.target.value;
    setIndicativo(value);
    setNumero(''); 
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
    const value = e.target.value.replace(/\D/g, ''); // Remover caracteres não numéricos
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
        return 15; // Limitar geral se não houver indicativo selecionado
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorNome("");
    setErrorContato("");
    setErrorEspecialidade("");

    if (!nome || !numero || !especialidade) {
      if (!nome) setErrorNome("Campo vazio!");
      if (!numero) setErrorContato("Campo vazio!");
      if (!especialidade) setErrorEspecialidade("Campo vazio!");
      return;
    }

    const contato = `${indicativo} ${numero}`;

    try {
      await axios.post(
        "http://localhost:3000/administrador/adicionar-tecnico", 
        { nome, contato, especialidade }, 
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      notificacao("success", "Cadastrado com sucesso");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Erro na requisição:");
      }
    }
  };

  return (
    <div className="motorista-drop">
      <div className="motorista-drop-start" style={{ height: '380px' }}>
        <div className="veiculo-card-name">
          <div className="text-card">
            <h3>Adicionar Técnico</h3>
          </div>
          <div className="usuario-icons-close">
            <IoClose id="close" onClick={() => closeModal(false)} />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="motorista-card-component">
            <div className="motorista-group">
              <div className="usuario-card-group">
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Digite o seu nome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <label className="labelError">{errorNome}</label>
              </div>
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
                <label className="labelError">{errorContato}</label>
              </div>
              <div className="usuario-card-group">
                <label>Especialidade</label>
                <input
                    type="text"
                    placeholder="Digite o seu número"
                    value={especialidade} 
                    onChange={(e) => setEspecialidade(e.target.value)}
                  />
                <label className="labelError">{errorEspecialidade}</label>
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

export default Adicionar;
