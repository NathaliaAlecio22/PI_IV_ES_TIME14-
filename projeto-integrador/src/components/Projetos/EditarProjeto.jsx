import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./EditarProjeto.css";

const EditarProjeto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        nome: "",
        descricao: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarProjeto = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/projetos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Erro ao carregar dados");

                const data = await response.json();
                setForm({
                    nome: data.nome,
                    descricao: data.descricao
                });
            } catch (error) {
                alert("Não foi possível carregar os dados do projeto.");
            } finally {
                setLoading(false);
            }
        };

        buscarProjeto();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/projetos/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error("Erro ao salvar");

            alert("Projeto atualizado com sucesso!");
            navigate("/");
        } catch (error) {
            alert("Erro ao atualizar projeto.");
        }
    };

    if (loading) return <p style={{ textAlign: "center" }}>Carregando...</p>;

    return (
        <>
            <NavBar />
            <div className="editar-projeto-container">
                <div className="editar-projeto-card">
                    <h2>Editar Projeto</h2>

                    <form onSubmit={handleSubmit} className="form-edit-projeto">

                        <label>Nome do Projeto</label>
                        <input
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                        />

                        <label>Descrição</label>
                        <textarea
                            name="descricao"
                            rows="4"
                            value={form.descricao}
                            onChange={handleChange}
                            required
                        />

                        <div className="botoes-editar-projeto">
                            <button type="button" className="btn-voltar" onClick={() => navigate(-1)}>Voltar</button>
                            <button type="submit" className="btn-salvar">Salvar Alterações</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditarProjeto;
