import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./CriarProjeto.css";

const CriarProjeto = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        nome: "",
        descricao: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/projetos", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Erro ao criar projeto.");
            }

            alert("Projeto criado com sucesso!");
            navigate("/"); // volta ao dashboard
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />

            <div className="criar-projeto-container">
                <div className="criar-projeto-card">
                    <h2>Criar Projeto</h2>

                    <form className="form-criar-projeto" onSubmit={handleSubmit}>
                        <label>Nome do Projeto</label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Digite o nome do projeto"
                            value={form.nome}
                            onChange={handleChange}
                            required
                        />

                        <label>Descrição</label>
                        <textarea
                            name="descricao"
                            rows="4"
                            placeholder="Digite uma breve descrição"
                            value={form.descricao}
                            onChange={handleChange}
                            required
                        />

                        <div className="criar-projeto-buttons">
                            <button
                                type="button"
                                className="btn-voltar"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn-criar"
                                disabled={loading}
                            >
                                {loading ? "Salvando..." : "Criar Projeto"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CriarProjeto;
