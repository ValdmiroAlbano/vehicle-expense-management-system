import React, { useState, useEffect } from "react";
import AddUsuario from "./AddUsuario/AddUsuario";
import EditarUsuario from "./EditarUsuario/EditarUsuario";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import UserPerfil from "../../assets/user/user-icon.svg";
import "./Usuario.css";

const Usuario = () => {
  const token = localStorage.getItem('token');
  const [openCardEdit, setCardEdit] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/administrador/listar", {headers: { 'Authorization': `Bearer ${token}`}}
        );
        if (response.data) {
          const filteredUseres = response.data.filter(
            (user) =>
              user.tipoUsuario === "Administrador" ||
              user.tipoUsuario === "Técnico de Manutenção" ||
              user.tipoUsuario === "Gestor"
          );
          setUsers(filteredUseres);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.log("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleRemoveClick = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:3000/administrador/excluir/${userId}`, {headers: { 'Authorization': `Bearer ${token}`}}
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.IDUsuario !== userId)
      );
      toast.success(`Apagado com sucesso!`, {
        autoClose: 500,
        hideProgressBar: false,
      });
    } catch (err) {
      toast.error("Erro ao remover usuario!", {
        autoClose: 1000,
        hideProgressBar: false,
      });
    }
  };

  // Função para formatar o nome com a primeira letra maiúscula
  const formatName = (name) => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div>
      <div className="main-content">
        <div className="maind">
          <div className="maind-text">
            <h2>Usuários</h2>
          </div>
          <div className="inp">
            <input
              type="search"
              placeholder="Pesquisar aqui..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="comp-arqu">
          <div className="btn-click">
            <div className="butttons">
              <button onClick={() => setOpenAdd(true)}>
                Adicionar Usuario
                <i className="bx bx-plus"></i>
              </button>
            </div>
          </div>
        </div>
        {users.length !== 0 ? (
          <div className="card-perfil">
            {users.map((user) => (
              <div className="user-card" key={user.IDUsuario}>
                <div className="name-func">
                  <h1 title={user.nome} onClick={() => setCardEdit(true)} className="truncate">
                    {formatName(user.nome)}
                  </h1>
                </div>
                <div className="profile-user">
                  <img src={UserPerfil} width={65} alt="Profile" />
                </div>
                <div className="name-f">
                  <span className="truncate">{user.tipoUsuario}</span>
                </div>

                <div className="buttons app">
                  <button onClick={() => handleEditClick(user)}>Editar</button>
                  <button
                    id="rem"
                    onClick={() => handleRemoveClick(user.IDUsuario)}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-users">Nenhum usuário cadastrado.</p>
        )}
      </div>
      {openAdd && <AddUsuario closeModal={setOpenAdd} />}
      {openCardEdit && <CardEdit closeModal={setCardEdit} />}
      {openEdit && (
        <EditarUsuario closeModal={setOpenEdit} user={selectedUser} />
      )}
      <ToastContainer />
    </div>
  );
};

export default Usuario;
