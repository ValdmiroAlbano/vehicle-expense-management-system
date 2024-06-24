import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import './EditarUsuario.css'
import axios  from 'axios';
const EditarUsuario = ({ closeModal, user }) => {
    const token = localStorage.getItem('token');
    const [editable, setEditable] = useState(false); 

    const [id, setId] = useState(user.IDUsuario)
    const [nome, setNome] = useState(user.nome);
    const [email, setEmail] = useState(user.email);    
    const [contato, setContato] = useState(user.contato);
   


    // Estado para mensagens de erro
    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroContacto, setErroContacto] = useState('');

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

    async function addUsuario(e) {
        e.preventDefault();

        // Limpa os erros anteriores
        setErroNome('');
        setErroEmail('');
        setErroContacto('');

        // Verifica se todos os campos foram preenchidos
        if (!nome || !email || !contato) {
            if (!nome) setErroNome('Campo vazio!');
            if (!contato) setErroContacto('Campo vazio!');
            if (!email) setErroEmail('Campo vazio!');
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
            notificacao('success', "Usuario atializado");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
        } catch (error) {
            console.error("Erro na atualizacao", error);
            notificacao('erro', "Erro na atualizacao");
        }
    }

    const handleLimpar = () => {
        setNome('');
        setEmail('');
        setContato('');
      };

    return (
        <div className='usuario-drop'>
            <div className="usuario-editar-start">
                <form>
                    <div className="veiculo-card-component">
                        <div className="veiculo-card-name">
                            <div className="text-card">
                                <h3>Editar Usuário</h3>
                            </div>
                            <div className="usuario-icons-close">
                                <IoClose onClick={() => closeModal(false)} />
                            </div>
                        </div>
                    
                        <div className="usuario-group">
                            <div className='usuario-card-group'>
                                <label>Nome</label>
                                <input
                                    type="text"
                                    name='nome'
                                    placeholder='Digite o nome'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    disabled={!editable}
                                />
                                <label className='labelError'>{erroNome}</label>
                            </div>
                        </div>
                        <div className="usuario-group-select">
                        
                            <div className='usuario-card-group'>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Digite o seu email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={!editable}
                                />
                                <label className='labelError'>{erroEmail}</label>
                            </div>
                       

                        
                            <div className='usuario-card-group'>
                                <label>Contato</label>
                                <input
                                    type="text"
                                    name='contato'
                                    placeholder='Digite o seu contato'
                                    value={contato}
                                    onChange={(e) => setContato(e.target.value)}
                                    disabled={!editable} 
                                />
                                <label className='labelError'>{erroContacto}</label>
                            </div>
                        
                        </div>
                        <div className="buttons usuariosbtn">
                            <button type="button" onClick={handleLimpar}>Limpar</button>
                            {editable ? (
                                <button type="button" onClick={addUsuario}>Guardar</button>
                            ) : (
                                <button type="button" onClick={handleEditClick}>Editar</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarUsuario;
