import { useState, useEffect } from "react";
import styles from "./PerfilUsuario.module.css";
import NavBar from "../NavBar/NavBar.jsx";
import Logo_username from "../../assets/Logo_username.png";

const PerfilUsuario = () => {
    const [dados, setDados] = useState(null);
    const token = localStorage.getItem("token");

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
            } catch (error) {
                console.error("Erro ao obter perfil:", error);
            }
        };

        carregarDados();
    }, [token]);

    if (!dados) return <p>Carregando dados do perfil...</p>;

    const isPF = dados.cpf !== undefined;

    return (
        <>
            <NavBar />
            <div className={styles.container_geral}>

                <div className={styles.container_perfil}>
                    <h2 className={styles.titulo_perfil}>Perfil do Usuário</h2>
                    <img src={Logo_username} alt="Foto perfil" className={styles.logo_username} />
                    <button className={styles.alterar_foto_perfil}>Alterar Foto</button>
                </div>

                <div className={styles.container_informacoes}>

                    <h2 className={styles.titulo_informacoes}>Informações de Conta</h2>
                    <p><strong>Email:</strong> {isPF ? dados.email : dados.emailCorporativo}</p>

                    {isPF ? (
                        <>
                            <h2 className={styles.titulo_informacoes}>Informações Pessoais</h2>
                            <p><strong>Nome Completo:</strong> {dados.nomeCompleto}</p>
                            <p><strong>CPF:</strong> {dados.cpf}</p>
                            <p><strong>Telefone:</strong> {dados.telefone}</p>
                            <p><strong>Data de Nascimento:</strong> {dados.dataNascimento}</p>
                        </>
                    ) : (
                        <>
                            <h2 className={styles.titulo_informacoes}>Informações da Empresa</h2>
                            <p><strong>Razão Social:</strong> {dados.razaoSocial}</p>
                            <p><strong>Nome Fantasia:</strong> {dados.nomeFantasia}</p>
                            <p><strong>CNPJ:</strong> {dados.cnpj}</p>
                            <p><strong>Contato:</strong> {dados.telefone}</p>
                        </>
                    )}

                    <h2 className={styles.titulo_informacoes}>Endereço</h2>
                    <p><strong>CEP:</strong> {dados.cep}</p>
                    <p><strong>Estado:</strong> {dados.estado}</p>
                    <p><strong>Cidade:</strong> {dados.cidade}</p>
                    <p><strong>Bairro:</strong> {dados.bairro}</p>
                    <p><strong>Rua:</strong> {dados.rua}</p>
                    <p><strong>Número:</strong> {dados.numero}</p>
                    <p><strong>Complemento:</strong> {dados.complemento || "Nenhum"}</p>

                </div>
            </div>
        </>
    );
};

export default PerfilUsuario;
