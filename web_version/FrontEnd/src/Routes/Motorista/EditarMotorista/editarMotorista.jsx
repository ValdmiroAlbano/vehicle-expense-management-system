import {useState} from 'react';
import {ToastContainer, toast } from 'react-toastify';
import { IoClose } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../AddMotorista/AddMotorista.css'

const EditarMotorista = ({ closeModalEdite, motorista }) => {
    const token = localStorage.getItem('token');
  const [editable, setEditable] = useState(false); 
  const [id, setId] = useState(motorista.IDUsuario)
  const [nome, setNome] = useState(motorista.nome);
  const [email, setEmail] = useState(motorista.email);    
  const [contato, setContato] = useState(motorista.contato);


  const [errorNome, setErrorNome] = useState('');
  const [errorContato, setErrorContato] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  function notificacao(tipo, message) {
      toast[tipo](message, {
          hideProgressBar: true,
          onClose: () => {
              setTimeout(() => {
                  closeModalEdite(false);
              }, 1000);
          },
      });
  }

    // Função para lidar com o clique no botão de edição
  const handleEditClick = () => {
    setEditable(true); 
  };

  function notificacao(tipo, message) {
    toast[tipo](message, {
        hideProgressBar: true,
        onClose: () => {
            setTimeout(() => {
                closeModal();
                 
            }, 500);
        },

        });
  }

  const handleLimpar = () => {
    setNome('');
    setEmail('');
    setContato('');
  };


  const handSubimit = async (e) => {
      e.preventDefault();

      setErrorNome('');
      setErrorEmail('');
      setErrorContato('');

      if (!nome || !contato || !email) {
          if (!nome) setErrorNome('Campo vazio!');
          if (!contato) setErrorContato('Campo vazio!');
          if (!email) setErrorEmail('Campo vazio!');
          return;
      }

      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('contato', contato);

      try {
        await axios.put(`http://localhost:3000/administrador/atualizar/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
      });
      notificacao('success', "Motorista atializado");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
    } catch (error) {
      console.error("Erro na atualizacao", error);
      notificacao('erro', "Erro na atualizacao");
    }

  };

  return (
      <div className="motorista-drop">
          <div className="motorista-drop-start" style={{height:'360px',
          }}>
          <div className="veiculo-card-name">
              <div className="text-card">
                <h3>Editar Motorista</h3>
              </div>
              <div className="usuario-icons-close">
                <IoClose id='close'  onClick={() => closeModalEdite(false)} />
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
                                  value={nome}
                                  onChange={(e) => setNome(e.target.value)}
                                  disabled={!editable}
                              />
                          </div>
                          <label className='labelError-Edite'>{errorNome}</label>
                          <div className="usuario-card-group">
                              <label>Email</label>
                              <input
                                  type="email"
                                  placeholder="Digite o seu email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  disabled={!editable}
                              />
                          </div>
                          <label className='labelError-Edite'>{errorEmail}</label>
                      </div>
                      <div className="motorista-docs-input">
                          <div className="usuario-card-group">
                              <label>Contacto</label>
                              <input
                                  type="text"
                                  placeholder="Digite o seu número"
                                  value={contato}
                                  onChange={(e) => setContato(e.target.value)}
                                  disabled={!editable}
                              />
                          </div>
                          <label className='labelError-Edite'>{errorContato}</label>
                      </div>
                      <div className="buttons usuariosbtn">
                      <button type="button" onClick={handleLimpar}>Limpar</button>
                            {editable ? (
                                <button type="button" onClick={handSubimit}>Salvar</button>
                            ) : (
                                <button type="button" onClick={handleEditClick}>Editar</button>
                            )}
                      </div>
                  </div>
              </form>
          </div>
          <ToastContainer autoClose={2000} hideProgressBar={true} />
      </div>
  );
}

export default EditarMotorista;
