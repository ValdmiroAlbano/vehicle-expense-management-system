import { useState, useEffect } from 'react';
import Logo from '../../assets/logoatlas.svg';
import { GrMapLocation} from "react-icons/gr";
import {jwtDecode} from 'jwt-decode';
import MenuItem from './MenuItem';
import './DashboardStyle.css';
/* 
Aqui criei um filtro tipoAcesso onde so renderiza os dados no dasboard de acordo as tipo de acesso
no caso do gestor e admin os dashboard deve se implementados onde estiver tipoAcesso == Gestor e tipoAcesso == Administrador
troca so os icons da manutencao e qualquer duvida estarei em casa a tomar cha
 */
const DashboardSidebar = () => {
    const [activeItem, setActiveItem] = useState("Dashboard");
    const [tipoAcesso, setTipoAcesso] = useState(""); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const Acesso = jwtDecode(token).tipoUsuario;
            setTipoAcesso(Acesso);
        }
    }, []);

    const highlightMenuItem = (itemName) => {
        setActiveItem(itemName);
    };

    return (
        <nav className="sidebar close" id="sidebar">
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src={Logo} width={30} alt="" />
                    </span>
                </div>
            </header>
            <div className="menu-bar">
                <div className="menu">
                    {tipoAcesso === "Gestor" && (
                        <>
                            <MenuItem
                                itemName="HomePage"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Home</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Mapa"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <GrMapLocation className="mapa" />
                                <span className="text nav-text">Mapa</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Home"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Histórico</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Tarefas"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Manutenções</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Motorista"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-circle icon"></i>
                                <span className="text nav-text">Motorista</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Veiculo"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-car icon"></i>
                                <span className="text nav-text">Veículos</span>
                            </MenuItem>
                        </>
                    )}

                    {tipoAcesso === "Técnico de Manutenção" && (
                        <>
                            <MenuItem
                                itemName="ResumoTecn"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Resumos</span>
                            </MenuItem>
                            <MenuItem
                                itemName="TecnicosTecn"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Tecnicos</span>
                            </MenuItem>
                            <MenuItem
                                itemName="AtividadesTecn"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Atividades</span>
                            </MenuItem>
                            <MenuItem
                                itemName="VeiculosTecn"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Historico Veiculos</span>
                            </MenuItem>
                        </>
                    )}

                    {tipoAcesso === "Administrador" && (
                        <>
                        <MenuItem
                                itemName="HomePage"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Home</span>
                            </MenuItem>

                            <MenuItem
                                itemName="Mapa"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <GrMapLocation className="mapa" />
                                <span className="text nav-text">Mapa</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Home"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-history icon"></i>
                                <span className="text nav-text">Histórico</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Usuario"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-user icon"></i>
                                <span className="text nav-text">Usuario</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Tarefas"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-card icon"></i>
                                <span className="text nav-text">Manutenções</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Motorista"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-circle icon"></i>
                                <span className="text nav-text">Motorista</span>
                            </MenuItem>
                            <MenuItem
                                itemName="Veiculo"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-car icon"></i>
                                <span className="text nav-text">Veículos</span>
                            </MenuItem>
                            <MenuItem
                                itemName="ResumoTecn"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-clipboard icon"></i>
                                <span className="text nav-text">Resumo</span>
                            </MenuItem>
                            <MenuItem
                                itemName="TecnicosTecn"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-user-plus icon"></i>
                                <span className="text nav-text">Tecnicos</span>
                            </MenuItem>
                            <MenuItem
                                itemName="AtividadesTecn"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-dialpad-alt icon"></i>
                                <span className="text nav-text">Atividades</span>
                            </MenuItem>
                            <MenuItem
                                itemName="VeiculosTecn"
                                activeItem={activeItem}
                                highlightMenuItem={highlightMenuItem}
                            >
                                <i className="bx bx-history icon"></i>
                                <span className="text nav-text">His Veiculos</span>
                            </MenuItem>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default DashboardSidebar;
