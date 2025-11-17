import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Delete from "../../assets/Delete.png";
import Edit from "../../assets/Edit.png";
import "./Projetos.css";

const Projetos = ({ onSelectProjeto }) => {
    const [projetos, setProjetos] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        buscarProjetos();
    }, []);

    const buscarProjetos = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/projetos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Erro projeto1");

            if (!response.ok) {
                throw new Error("Erro ao buscar projetos");
            }

            const data = await response.json();
            setProjetos(data);

            // Selecionar o primeiro automaticamente
            if (data.length > 0) {
                onSelectProjeto(data[0].id);
            }

        } catch (error) {
            console.error("Erro ao carregar projetos:", error);
        }
        console.log("Erro projeto2");
    };

    const editarProjeto = (id) => {
        navigate(`/projeto/editar/${id}`);
    };

    return (
        <aside className="central-projetos">
            <div className="proj-header">
                <h2 className="projetos-titulo">Projetos</h2>
                <button className="btn-add" onClick={() => navigate("/projeto/criar")}>
                    +
                </button>
            </div>

            <ul className="lista-projetos">
                {projetos.length > 0 ? (
                    projetos.map((projeto) => (
                        <li
                            key={projeto.id}
                            className="projeto-item active"
                            onClick={() => onSelectProjeto(projeto.id)}
                        >
                            <span className="projeto-nome">{projeto.nome}</span>

                            <div className="projeto-acoes">
                                <img
                                    src={Edit}
                                    alt="Editar"
                                    className="icon-edit"
                                    onClick={() => navigate(`/projetos/editar/${projeto.id}`)}


                                />
                                <img src={Delete} alt="Excluir" className="icon-delete" />
                            </div>


                        </li>
                    ))
                ) : (
                    <p style={{ textAlign: "center", opacity: 0.7 }}>
                        Nenhum projeto encontrado.
                    </p>
                )}
            </ul>
        </aside>
    );

    console.log("Erro projeto4");
};

export default Projetos;
