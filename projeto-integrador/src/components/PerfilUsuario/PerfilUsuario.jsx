import { useState, useEffect } from "react";
import styles from "./PerfilUsuario.module.css";
import NavBar from "../NavBar/NavBar.jsx";
import Logo_username from "../../assets/Logo_username.png";

const PerfilUsuario = () => {
    const [dados, setDados] = useState(null);
    const [editando, setEditando] = useState(false);
    const [form, setForm] = useState({});
    const token = localStorage.getItem("token");
    const [mensagemSucesso, setMensagemSucesso] = useState("");


    useEffect(() => {
        const carregarDados = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/usuarios/perfil", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Erro ao carregar dados");

                const data = await response.json();
                setDados(data);
                setForm(data); // preencher os campos no modo edição
            } catch (error) {
                console.error("Erro ao obter perfil:", error);
            }
        };

        carregarDados();
    }, [token]);

    const formatarData = (dataISO) => {
        if (!dataISO) return "";
        const dataObj = new Date(dataISO);
        return dataObj.toISOString().split("T")[0]; // manter formato yyyy-MM-dd para input
    };

    const atualizarCampo = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const salvarAlteracoes = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/usuarios/perfil", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const msg = await response.text();
                alert("Erro ao atualizar: " + msg);
                return;
            }

            setMensagemSucesso("Alterações realizadas com sucesso!");
            setTimeout(() => setMensagemSucesso(""), 3000);
            setDados(form);
            setEditando(false);

        } catch (error) {
            console.error("Erro ao salvar perfil:", error);
        }
    };

    if (!dados) return <p>Carregando dados do perfil...</p>;

    return (
        <>
            <NavBar />

            {mensagemSucesso && (
                <div className={styles.card_sucesso}>
                    {mensagemSucesso}
                </div>
            )}


            <div className={styles.container_geral}>

                <div className={styles.container_perfil}>
                    <h2 className={styles.titulo_perfil}>Perfil do Usuário</h2>
                    <img src={Logo_username} alt="Foto perfil" className={styles.logo_username} />
                </div>

                <div className={styles.container_informacoes}>

                    {/* INFORMAÇÕES DE CONTA */}
                    <h2 className={styles.titulo_informacoes}>Informações de Conta</h2>
                    <p><strong>Email:</strong> {dados.email}</p>

                    {/* CABEÇALHO + BOTÃO EDITAR */}
                    <div className={styles.header_editar}>
                        <h2 className={styles.titulo_informacoes}>Informações Pessoais</h2>

                        {!editando && (
                            <button className={styles.btn_editar} onClick={() => setEditando(true)}>
                                Editar
                            </button>
                        )}
                    </div>

                    {/* VISUALIZAÇÃO */}
                    {!editando && (
                        <>
                            <p><strong>Nome Completo:</strong> {dados.nomeCompleto}</p>
                            <p><strong>CPF:</strong> {dados.cpf}</p>
                            <p><strong>Telefone:</strong> {dados.telefone}</p>
                            <p><strong>Data de Nascimento:</strong> {dados.dataNascimento}</p>
                        </>
                    )}

                    {/* FORMULÁRIO */}
                    {editando && (
                        <div className={styles.form_editar}>
                            <label>Nome Completo</label>
                            <input name="nomeCompleto" value={form.nomeCompleto} onChange={atualizarCampo} />

                            <label>CPF</label>
                            <input name="cpf" value={form.cpf} onChange={atualizarCampo} />

                            <label>Telefone</label>
                            <input name="telefone" value={form.telefone} onChange={atualizarCampo} />

                            <label>Data de Nascimento</label>
                            <input
                                type="date"
                                name="dataNascimento"
                                value={formatarData(form.dataNascimento)}
                                onChange={atualizarCampo}
                            />

                            <div className={styles.botoes}>
                                <button className={styles.btn_salvar} onClick={salvarAlteracoes}>Salvar</button>
                                <button className={styles.btn_cancelar} onClick={() => setEditando(false)}>Cancelar</button>
                            </div>
                        </div>
                    )}

                    {/* ENDEREÇO */}
                    <h2 className={styles.titulo_informacoes}>Endereço</h2>

                    {!editando && (
                        <>
                            <p><strong>CEP:</strong> {dados.cep}</p>
                            <p><strong>Estado:</strong> {dados.estado}</p>
                            <p><strong>Cidade:</strong> {dados.cidade}</p>
                            <p><strong>Bairro:</strong> {dados.bairro}</p>
                            <p><strong>Rua:</strong> {dados.rua}</p>
                            <p><strong>Número:</strong> {dados.numero}</p>
                            <p><strong>Complemento:</strong> {dados.complemento || "Nenhum"}</p>
                        </>
                    )}

                    {editando && (
                        <div className={styles.form_editar}>
                            <label>CEP</label>
                            <input name="cep" value={form.cep} onChange={atualizarCampo} />

                            <label>Estado</label>
                            <input name="estado" value={form.estado} onChange={atualizarCampo} />

                            <label>Cidade</label>
                            <input name="cidade" value={form.cidade} onChange={atualizarCampo} />

                            <label>Bairro</label>
                            <input name="bairro" value={form.bairro} onChange={atualizarCampo} />

                            <label>Rua</label>
                            <input name="rua" value={form.rua} onChange={atualizarCampo} />

                            <label>Número</label>
                            <input name="numero" value={form.numero} onChange={atualizarCampo} />

                            <label>Complemento</label>
                            <input name="complemento" value={form.complemento} onChange={atualizarCampo} />
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default PerfilUsuario;
