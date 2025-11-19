import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/Logo_username.png";

const NavBar = () => {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const nome = localStorage.getItem("nome");
        if (nome) {
            const primeiroNome = nome.split(" ")[0];
            setNomeUsuario(primeiroNome);
        } else {
            setNomeUsuario("Nome");
        }
    }, []);

    const realizarLogout = () => {
        localStorage.clear();
        navigate("/sobre-projeto");
    };

    return (
        <nav className="nav-dashboard">

            {/* LOGO */}
            <div className="nav-left">
                <img src={logo} alt="Logo Sentinela" className="logo-nav" />
            </div>

            {/* BARRA VERDE */}
            <div className="nav-bar-green">
                <div className="nav-links">
                    <button className="nav-link active" onClick={() => navigate("/")}>
                        Projetos
                    </button>
                    <button className="nav-link" onClick={() => navigate("/sobre-projeto")}>
                        Sobre o projeto
                    </button>
                    <button className="nav-link" onClick={() => navigate("/chatbot")}>
                        Dúvidas
                    </button>
                </div>

                {/* PERFIL + SAIR*/}
                <div className="nav-profile">
                    <span className="nav-username">{nomeUsuario}</span>

                    <img
                        src={userIcon}
                        className="nav-user-icon"
                        alt="Perfil"
                        onClick={() => navigate("/perfil")}
                    />

                    <button className="logout-button" onClick={realizarLogout}>
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
