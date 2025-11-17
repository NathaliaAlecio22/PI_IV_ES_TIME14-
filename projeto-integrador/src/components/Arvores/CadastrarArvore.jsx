import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./CadastrarArvore.css";

const CadastrarArvore = () => {
    const { projetoId } = useParams();
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

    // Atualiza valores
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["alturaMetros", "idadeEstimadaAnos", "inclinacaoTroncoGraus"].includes(name)) {
            setForm({ ...form, [name]: value === "" ? "" : Number(value) });
        } else if (["raizesExpostas", "ocoTronco"].includes(name)) {
            setForm({ ...form, [name]: value === "true" });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // Envia ao backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/projetos/${projetoId}/arvores`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error("Erro ao cadastrar árvore");

            alert("Árvore cadastrada com sucesso!");
            navigate(`/`);
        } catch (error) {
            alert("Erro ao cadastrar, tente novamente.");
            console.error(error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="cadastro-arvore-page">
                <div className="cadastro-card">
                    <h2 className="cadastro-titulo">Cadastrar Árvore</h2>

                    <form className="cadastro-form" onSubmit={handleSubmit}>
                        <div className="cadastro-grid">

                            <div className="campo">
                                <label>Nome Popular</label>
                                <input type="text" name="nomePopular" value={form.nomePopular} onChange={handleChange} required />
                            </div>

                            <div className="campo">
                                <label>Nome Científico</label>
                                <input type="text" name="nomeCientifico" value={form.nomeCientifico} onChange={handleChange} required />
                            </div>

                            <div className="campo campo-full">
                                <label>Localização</label>
                                <input type="text" name="localizacao" value={form.localizacao} onChange={handleChange} required />
                            </div>

                            <div className="campo">
                                <label>Altura (m)</label>
                                <input type="number" step="0.1" name="alturaMetros" value={form.alturaMetros} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Idade Estimada (anos)</label>
                                <input type="number" name="idadeEstimadaAnos" value={form.idadeEstimadaAnos} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Inclinação do Tronco (°)</label>
                                <input type="number" step="0.1" name="inclinacaoTroncoGraus" value={form.inclinacaoTroncoGraus} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Raízes Expostas?</label>
                                <select name="raizesExpostas" value={form.raizesExpostas} onChange={handleChange}>
                                    <option value="false">Não</option>
                                    <option value="true">Sim</option>
                                </select>
                            </div>

                            <div className="campo">
                                <label>Forma da Copa</label>
                                <input type="text" name="formaCopa" value={form.formaCopa} onChange={handleChange} />
                            </div>

                            <div className="campo campo-full">
                                <label>Pragas / Doenças</label>
                                <textarea name="pragasDoencas" value={form.pragasDoencas} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Tronco Oco?</label>
                                <select name="ocoTronco" value={form.ocoTronco} onChange={handleChange}>
                                    <option value="false">Não</option>
                                    <option value="true">Sim</option>
                                </select>
                            </div>

                            <div className="campo">
                                <label>Rachaduras / Fissuras</label>
                                <input type="text" name="rachadurasFissuras" value={form.rachadurasFissuras} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Última Poda</label>
                                <input type="date" name="dataUltimaPoda" value={form.dataUltimaPoda} onChange={handleChange} />
                                <input type="text" placeholder="Tipo da Poda" name="tipoUltimaPoda" value={form.tipoUltimaPoda} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Proximidade de Risco</label>
                                <input type="text" name="proximidadeRisco" value={form.proximidadeRisco} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Avaliação de Risco</label>
                                <input type="text" name="avaliacaoRisco" value={form.avaliacaoRisco} onChange={handleChange} />
                            </div>

                            <div className="campo campo-full">
                                <label>Responsável pela Inspeção</label>
                                <input type="text" name="responsavelInspecao" value={form.responsavelInspecao} onChange={handleChange} />
                            </div>

                            <div className="campo campo-full">
                                <label>Observações</label>
                                <textarea name="observacoesAdicionais" value={form.observacoesAdicionais} onChange={handleChange} />
                            </div>

                            <div className="campo campo-full">
                                <label>Situação Recomendada</label>
                                <input type="text" name="situacaoRecomendada" value={form.situacaoRecomendada} onChange={handleChange} />
                            </div>

                            <div className="campo">
                                <label>Próxima Inspeção</label>
                                <input type="date" name="proximaInspecao" value={form.proximaInspecao} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="cadastro-btns">
                            <button type="button" className="btn-voltar" onClick={() => navigate(`/`)}>
                                Voltar
                            </button>
                            <button type="submit" className="btn-salvar">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CadastrarArvore;
