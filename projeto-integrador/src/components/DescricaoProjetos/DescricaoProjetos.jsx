import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Delete from "../../assets/Delete.png";
import Edit from "../../assets/Edit.png";
import "./DescricaoProjetos.css";

const DescricaoProjetos = ({ projetoId }) => {
    const [projeto, setProjeto] = useState(null);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(true);

    // controle do modal
    const [showModal, setShowModal] = useState(false);
    const [arvoreDeletarId, setArvoreDeletarId] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!projetoId) return;

        const buscarProjeto = async () => {
            setLoading(true);
            setErro("");

            try {
                const response = await fetch(`http://localhost:8080/api/projetos/${projetoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Não foi possível carregar os dados do projeto.");
                }

                const data = await response.json();
                setProjeto(data);
            } catch (error) {
                setErro(error.message);
                setProjeto(null);
            } finally {
                setLoading(false);
            }
        };

        buscarProjeto();
    }, [projetoId]);

    const abrirModalDeletar = (idArvore) => {
        setArvoreDeletarId(idArvore);
        setShowModal(true);
    };

    const fecharModalDeletar = () => {
        setShowModal(false);
        setArvoreDeletarId(null);
    };

    const deletarArvore = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/projetos/${projetoId}/arvores/${arvoreDeletarId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                alert("Erro ao tentar excluir a árvore.");
                return;
            }

            // remove da tela sem recarregar
            setProjeto((prev) => ({
                ...prev,
                arvores: prev.arvores.filter((a) => a.id !== arvoreDeletarId),
            }));

            fecharModalDeletar();
        } catch (error) {
            alert("Erro inesperado ao excluir árvore.");
        }
    };

    if (!projetoId) return <p className="msg-inicial">Selecione um projeto ao lado para visualizar os detalhes.</p>;
    if (loading) return <p className="msg-loading">Carregando informações do projeto...</p>;
    if (erro) return <p className="msg-erro">{erro}</p>;

    return (
        <>
            <main className="container-conteudo">
                <h2 className="titulo-conteudo">{projeto.nome}</h2>

                <div className="descricao">
                    <h3 className="titulo-descricao">Descrição do projeto</h3>
                    <p className="paragrafo-descricao">{projeto.descricao || "Nenhuma descrição cadastrada."}</p>
                </div>

                <div className="data-criacao">
                    <h3 className="titulo-data-criacao">Data de criação</h3>
                    <p className="data">
                        {projeto.dataCriacao ? projeto.dataCriacao.split("T")[0] : "Indisponível"}
                    </p>
                </div>

                <div className="arvores-header">
                    <h2 className="titulo-arvores-cadastradas">Árvores Cadastradas</h2>
                    <button
                        className="btn-add-arvore"
                        onClick={() => navigate(`/projeto/${projetoId}/arvores/criar`)}
                    >
                        +
                    </button>
                </div>

                <div className="tabela-arvores">
                    <div className="tabela-cabecalho">
                        <span className="coluna-cabecalho nome-popular">Nome Popular</span>
                        <span className="coluna-cabecalho especie">Espécie</span>
                        <span className="coluna-cabecalho localizacoes">Localização</span>
                        <span className="coluna-cabecalho acoes">Ações</span>
                    </div>

                    {projeto.arvores && projeto.arvores.length > 0 ? (
                        projeto.arvores.map((arvore) => (
                            <div className="tabela-linha" key={arvore.id}>
                                <span className="nome-popular">{arvore.nomePopular}</span>
                                <span className="especie">{arvore.nomeCientifico}</span>
                                <span className="localizacoes">{arvore.localizacao}</span>

                                <span className="acoes">
                                    <img
                                        src={Edit}
                                        alt="Editar"
                                        className="icon-edit-arvore"
                                        onClick={() => navigate(`/projeto/${projetoId}/arvores/${arvore.id}/editar`)}
                                    />
                                    <img
                                        src={Delete}
                                        alt="Deletar"
                                        className="icon-delete-arvore"
                                        onClick={() => abrirModalDeletar(arvore.id)}
                                    />
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="msg-sem-arvores">Nenhuma árvore cadastrada ainda.</p>
                    )}
                </div>
            </main>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-confirmacao">
                        <h3>Confirmar Exclusão</h3>
                        <p>Tem certeza que deseja excluir esta árvore?</p>

                        <div className="modal-botoes">
                            <button className="btn-confirmar" onClick={deletarArvore}>Sim</button>
                            <button className="btn-cancelar" onClick={fecharModalDeletar}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DescricaoProjetos;
