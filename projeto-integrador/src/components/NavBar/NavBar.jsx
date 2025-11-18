import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/logo.png"; // CORRETO
import userIcon from "../../assets/Logo_username.png"; // usa o preto e transforma via CSS

const NavBar = () => {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const nome = localStorage.getItem("nome");
        setNomeUsuario(nome || "Nome");
    }, []);

    return (
        <nav className="nav-dashboard">

            {/* LOGO */}
            <div className="nav-left">
                <img src={logo} alt="Logo Sentinela" className="logo-nav" />
            </div>

            {/* BARRA VERDE */}
            <div className="nav-bar-green">
                <div className="nav-links">
                    <button className="nav-link active" onClick={() => navigate("/")}>Projetos</button>
                    <button className="nav-link" onClick={() => navigate("/sobre-projeto")}>Sobre o projeto</button>

                </div>

                <div className="nav-profile" onClick={() => navigate("/perfil")}>
                    <span className="nav-username">{nomeUsuario}</span>
                    <img src={userIcon} className="nav-user-icon" alt="Perfil" />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
