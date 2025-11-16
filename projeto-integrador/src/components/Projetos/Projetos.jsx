import { useEffect, useState } from "react";
import Delete from "../../assets/Delete.png";
import Edit from "../../assets/Edit.png";
import "./Projetos.css";

const Projetos = ({ onSelectProjeto }) => {
    const [projetos, setProjetos] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        buscarProjetos();
    }, []);


    console.log("Erro 0");

    const buscarProjetos = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/projetos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Erro 1");

            if (!response.ok) {
                throw new Error("Erro ao buscar projetos");
            }

            const data = await response.json();
            setProjetos(data);

            console.log("Erro 2");

            // Se houver pelo menos 1 projeto, já seleciona o primeiro automaticamente
            if (data.length > 0) {
                onSelectProjeto(data[0].id);
            }

            console.log("Erro 3");
        } catch (error) {
            console.error("Erro ao carregar projetos:", error.message);
        }
    };

    console.log("Erro 4");
    return (
        <aside className="central-projetos">
            <div className="proj-header">
                <h2 className="projetos-titulo">Projetos</h2>
                <button className="btn-add">+</button>
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
                                <img src={Edit} alt="Editar" className="icon-edit" />
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
};

export default Projetos;
