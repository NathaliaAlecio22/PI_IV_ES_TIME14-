import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/Logo_username.png";

const NavBar = () => {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const nome = localStorage.getItem("nome");
        if (nome) {
            setNomeUsuario(nome.split(" ")[0]); // pega primeiro nome
        } else {
            setNomeUsuario("");
        }
    }, []);

    const realizarLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const estaNaHome = location.pathname === "/";

    return (
        <nav className="nav-dashboard">


            <div className="nav-left">
                <img
                    src={logo}
                    alt="Logo Sentinela"
                    className="logo-nav"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                />
            </div>


            <div className="nav-bar-green">

                {/* LINKS CENTRAIS */}
                <div className="nav-links">
                    <button className="nav-link" onClick={() => navigate("/dashboard")}>
                        Projetos
                    </button>

                    <button className="nav-link" onClick={() => navigate("/chatbot")}>
                        ChatBot
                    </button>
                </div>


                <div className="nav-actions">

                    {/* 🔥 MOSTRA LOGIN SOMENTE NA HOME */}
                    {estaNaHome && (
                        <button
                            className="login-button"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    )}


                    {!estaNaHome && (
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
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
