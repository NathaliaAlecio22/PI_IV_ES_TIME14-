import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Delete from "../../assets/Delete.png";
import Edit from "../../assets/Edit.png";
import "./Projetos.css";

const Projetos = ({ onSelectProjeto }) => {
    const [projetos, setProjetos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [projetoDeletarId, setProjetoDeletarId] = useState(null);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        buscarProjetos();
    }, []);

    const buscarProjetos = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/projetos", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Erro ao buscar projetos");

            const data = await response.json();
            setProjetos(data);

            if (data.length > 0) onSelectProjeto(data[0].id);

        } catch (error) {
            console.error("Erro ao carregar projetos:", error);
        }
    };

    const abrirModal = (id) => {
        setProjetoDeletarId(id);
        setShowModal(true);
    };

    const fecharModal = () => {
        setProjetoDeletarId(null);
        setShowModal(false);
    };

    const deletarProjeto = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/projetos/${projetoDeletarId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                alert("Erro ao excluir projeto");
                return;
            }

            setProjetos((prev) => prev.filter((p) => p.id !== projetoDeletarId));
            fecharModal();

        } catch (error) {
            alert("Erro desconhecido ao excluir projeto");
        }
    };

    return (
        <>
            <aside className="central-projetos">
                <div className="proj-header">
                    <h2 className="projetos-titulo">Projetos</h2>
                    <button className="btn-add" onClick={() => navigate("/projeto/criar")}>+</button>
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/projetos/editar/${projeto.id}`);
                                        }}
                                    />

                                    <img
                                        src={Delete}
                                        alt="Excluir"
                                        className="icon-delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            abrirModal(projeto.id);
                                        }}
                                    />
                                </div>
                            </li>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", opacity: 0.7 }}>Nenhum projeto encontrado.</p>
                    )}
                </ul>
            </aside>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h3>Excluir Projeto?</h3>
                        <p>Tem certeza que deseja excluir este projeto?</p>
                        <p className="alert-text">⚠ Todas as árvores vinculadas serão removidas!</p>

                        <div className="modal-buttons">
                            <button className="btn-confirm" onClick={deletarProjeto}>Sim</button>
                            <button className="btn-cancel" onClick={fecharModal}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Projetos;
