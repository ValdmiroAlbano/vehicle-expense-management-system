import React from 'react';
import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import './AttTarefas.css'

const AttTarefas = () => {

  const token = localStorage.getItem('token');
  const [openAddMotorista, setAddMotorista] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [funcao, setFuncao] = useState('');
  const [contacto, setContacto] = useState('');
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null); // Estado para armazenar a pré-visualização da foto

    // Estado para mensagens de erro
    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroFuncao, setErroFuncao] = useState('');
    const [erroContacto, setErroContacto] = useState('');
  
    function notificacao(tipo, message) {
        toast[tipo](message, {
          hideProgressBar: true,
          onClose: () => {
            setTimeout(() => {
              closeModal();
            }, 1000);
          },
        });
      }
    
      async function addUsuario(e) {
        e.preventDefault();
    
        // Limpa os erros anteriores
        setErroNome('');
        setErroEmail('');
        setErroSenha('');
        setErroFuncao('');
        setErroContacto('');
    
        // Verifica se todos os campos foram preenchidos
        if (!nome || !email || !senha || !funcao || !contacto) {
          if (!nome) setErroNome('Preencha o Nome');
          if (!contacto) setErroContacto('Preencha o Contacto');
          if (!email) setErroEmail('Preencha o Email');
          if (!senha) setErroSenha('Preencha a Senha');
          if (!funcao) setErroFuncao('Selecione a Função');
          return;
        }
    
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('funcao', funcao);
        formData.append('contacto', contacto);
        formData.append('foto', foto);
    
        try {
          const response = await axios.post('http://localhost:3000/veiculo/cadastrar', formData, {
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
          });
          console.log('Usuário inserido com sucesso:', response.data);
          notificacao("success", "Usuário cadastrado com sucesso");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          console.error("Erro ao cadastrar usuário!", error);
          toast.error("Erro ao cadastrar usuário")
        }
      }
    
      // Função para limpar os campos do formulário
      const handleLimpar = () => {
        setNome('');
        setEmail('');
        setSenha('');
        setFuncao('');
        setContacto('');
        setFoto(null); // Limpar também o estado da foto
        setFotoPreview(null); // Limpar a pré-visualização da foto
        setErroNome('');
        setErroEmail('');
        setErroSenha('');
        setErroFuncao('');
        setErroContacto('');
      };
    
      // Função para lidar com a mudança do arquivo de foto
      const handleFotoChange = (e) => {
        const fotoSelecionada = e.target.files[0];
        setFoto(fotoSelecionada); // Armazenar o arquivo de foto no estado
    
        // Criar uma URL para a pré-visualização da foto
        const fotoUrl = URL.createObjectURL(fotoSelecionada);
        setFotoPreview(fotoUrl); // Armazenar a URL da pré-visualização da foto
      };
    return (
        <div className='usuario-drop'>
        <div className="tarefas-drop-start">
          <form>
            <div className="veiculo-card-component">
              <div className="veiculo-card-name">
                <div className="text-card">
                  <h3>Agendar TarefaS</h3>
                </div>
                <div className="usuario-icons-close">
                  <IoClose onClick={() => closeModal(false)} />
                </div>
              </div><br />

              <div className='usuario-card-group'>
                  <label>Data de agendamento</label>
                 <input type="date" name="" id="" />
                  <label className='labelError'>{erroContacto}</label>
              </div>
              <div className='usuario-card-group'>
                  <label >Descrição tarefa</label>
                  <textarea name="" placeholder='Digite a descrição' id="" cols="30" rows="10"></textarea>
                  <label className='labelError'>{erroNome}</label>
                </div>

              <div className="usuario-group-select">
              </div>
              <div className="veiculo-buttons">
              <button onClick={() => setAtMotorista(true)}>Atribuir Veiculos</button>
            </div>
            </div>
          </form>
          {AddMotorista && <AddMotorista closeModal = {AddMotorista}/>}
        </div>
       
      </div>
    );
}

export default AttTarefas;
