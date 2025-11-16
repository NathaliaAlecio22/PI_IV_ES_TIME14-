import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./EditarArvore.css";

const EditarArvore = () => {
    const { projetoId, arvoreId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        nomePopular: "",
        nomeCientifico: "",
        localizacao: "",
        alturaMetros: "",
        idadeEstimadaAnos: "",
        inclinacaoTroncoGraus: "",
        raizesExpostas: false,
        formaCopa: "",
        pragasDoencas: "",
        ocoTronco: false,
        rachadurasFissuras: "",
        dataUltimaPoda: "",
        tipoUltimaPoda: "",
        proximidadeRisco: "",
        avaliacaoRisco: "",
        responsavelInspecao: "",
        observacoesAdicionais: "",
        situacaoRecomendada: "",
        proximaInspecao: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarArvore = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/projetos/${projetoId}/arvores/${arvoreId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (!response.ok) throw new Error("Erro ao carregar árvore");

                const data = await response.json();

                setForm({
                    nomePopular: data.nomePopular || "",
                    nomeCientifico: data.nomeCientifico || "",
                    localizacao: data.localizacao || "",
                    alturaMetros: data.alturaMetros ?? "",
                    idadeEstimadaAnos: data.idadeEstimadaAnos ?? "",
                    inclinacaoTroncoGraus: data.inclinacaoTroncoGraus ?? "",
                    raizesExpostas: data.raizesExpostas ?? false,
                    formaCopa: data.formaCopa || "",
                    pragasDoencas: data.pragasDoencas || "",
                    ocoTronco: data.ocoTronco ?? false,
                    rachadurasFissuras: data.rachadurasFissuras || "",
                    dataUltimaPoda: data.dataUltimaPoda || "",
                    tipoUltimaPoda: data.tipoUltimaPoda || "",
                    proximidadeRisco: data.proximidadeRisco || "",
                    avaliacaoRisco: data.avaliacaoRisco || "",
                    responsavelInspecao: data.responsavelInspecao || "",
                    observacoesAdicionais: data.observacoesAdicionais || "",
                    situacaoRecomendada: data.situacaoRecomendada || "",
                    proximaInspecao: data.proximaInspecao || "",
                });

            } catch (error) {
                console.error(error);
                alert("Não foi possível carregar os dados da árvore.");
            } finally {
                setLoading(false);
            }
        };

        carregarArvore();
    }, [projetoId, arvoreId, token]);

    function handleChange(e) {
        const { name, value } = e.target;

        if (["alturaMetros", "idadeEstimadaAnos", "inclinacaoTroncoGraus"].includes(name)) {
            setForm(prev => ({ ...prev, [name]: value === "" ? "" : Number(value) }));
            return;
        }

        if (["raizesExpostas", "ocoTronco"].includes(name)) {
            setForm(prev => ({ ...prev, [name]: value === "true" }));
            return;
        }

        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:8080/api/projetos/${projetoId}/arvores/${arvoreId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            if (!response.ok) throw new Error("Erro ao atualizar");

            alert("Alterações salvas com sucesso!");
            navigate("/");

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar alterações.");
        }
    }

    if (loading) {
        return (
            <>
                <NavBar />
                <p style={{ textAlign: "center", marginTop: "2rem" }}>Carregando dados...</p>
            </>
        );
    }

    return (
        <>
            <NavBar />

            <div className="editar-arvore-page">
                <div className="editar-card">
                    <h2 className="editar-titulo">Editar árvore</h2>

                    <form className="editar-form" onSubmit={handleSubmit}>
                        <div className="editar-grid">

                            <div className="campo">
                                <label>Nome Popular</label>
                                <input type="text" name="nomePopular" value={form.nomePopular} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Nome científico</label>
                                <input type="text" name="nomeCientifico" value={form.nomeCientifico} onChange={handleChange} />
                            </div>

                            <div className="campo campo-full">
                                <label>Localização</label>
                                <input type="text" name="localizacao" value={form.localizacao} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Altura (m)</label>
                                <input type="number" step="0.1" name="alturaMetros" value={form.alturaMetros} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Idade (anos)</label>
                                <input type="number" name="idadeEstimadaAnos" value={form.idadeEstimadaAnos} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Inclinação (°)</label>
                                <input type="number" step="0.1" name="inclinacaoTroncoGraus" value={form.inclinacaoTroncoGraus} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Raízes expostas?</label>
                                <select name="raizesExpostas" value={form.raizesExpostas ? "true" : "false"} onChange={handleChange}>
                                    <option value="false">Não</option>
                                    <option value="true">Sim</option>
                                </select>
                            </div>

                            <div className="campo">
                                <label>Forma da copa</label>
                                <input type="text" name="formaCopa" value={form.formaCopa} onChange={handleChange} />
                            </div>

                            <div className="campo campo-full">
                                <label>Pragas / doenças</label>
                                <textarea name="pragasDoencas" value={form.pragasDoencas} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Tronco oco?</label>
                                <select name="ocoTronco" value={form.ocoTronco ? "true" : "false"} onChange={handleChange}>
                                    <option value="false">Não</option>
                                    <option value="true">Sim</option>
                                </select>
                            </div>

                            <div className="campo">
                                <label>Rachaduras</label>
                                <input type="text" name="rachadurasFissuras" value={form.rachadurasFissuras} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Última poda</label>
                                <input type="date" name="dataUltimaPoda" value={form.dataUltimaPoda || ""} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Tipo da poda</label>
                                <input type="text" name="tipoUltimaPoda" value={form.tipoUltimaPoda} onChange={handleChange} />
                            </div>

                            <div className="campo campo-full">
                                <label>Proximidade de risco</label>
                                <input type="text" name="proximidadeRisco" value={form.proximidadeRisco} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Avaliação de risco</label>
                                <input type="text" name="avaliacaoRisco" value={form.avaliacaoRisco} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Responsável</label>
                                <input type="text" name="responsavelInspecao" value={form.responsavelInspecao} onChange={handleChange} />
                            </div>

                            <div className="campo campo-full">
                                <label>Observações</label>
                                <textarea name="observacoesAdicionais" value={form.observacoesAdicionais} onChange={handleChange} />
                            </div>

                            <div className="campo campo-full">
                                <label>Situação recomendada</label>
                                <input type="text" name="situacaoRecomendada" value={form.situacaoRecomendada} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Próxima inspeção</label>
                                <input type="date" name="proximaInspecao" value={form.proximaInspecao || ""} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="editar-btns">
                            <button type="button" className="btn-voltar" onClick={() => navigate("/")}>
                                Voltar
                            </button>

                            <button type="submit" className="btn-salvar">
                                Salvar alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditarArvore;
