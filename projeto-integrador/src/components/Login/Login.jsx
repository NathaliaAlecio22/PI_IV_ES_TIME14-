import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: email,
                    password: senha
                })
            });

            if (!response.ok) {
                throw new Error("Credenciais inválidas");
            }

            const data = await response.json();
            const { token, tipoUsuario, id, nome } = data;

            localStorage.setItem("token", token);
            localStorage.setItem("tipoUsuario", tipoUsuario);
            localStorage.setItem("id", id);
            localStorage.setItem("nome", nome);

            console.log("Login realizado com sucesso!");

            // Redirecionamento por tipo de usuário
            if (tipoUsuario === "PF") {
                navigate("/dashboard");
            } else if (tipoUsuario === "PJ") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error("Erro no login:", error);
            setErro("Credenciais inválidas! Verifique e tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.container_geral}>
                <div className={styles.container_titulo}>
                    <h1 className={styles.titulo}>
                        O sistema de monitoramento mais eficiente do mercado
                    </h1>
                </div>

                <div className={styles.container_form}>
                    <h2 className={styles.titulo_bemvindo}>Bem-Vindo!</h2>
                    <h3 className={styles.titulo_login}>Login</h3>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Digite seu e-mail ou CNPJ"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input_email}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className={styles.input_senha}
                            required
                        />

                        {erro && <p className={styles.error}>{erro}</p>}

                        <a href="#">Esqueceu sua senha?</a>
                        <button type="submit" className={styles.btn_login}>
                            Fazer Login
                        </button>
                    </form>

                    <div className={styles.container_sem_conta}>
                        <p className={styles.paragrafo}>Não tem uma conta?</p>
                        <a className={styles.cadastrar_aqui} href="/cadastro">
                            Cadastre-se aqui
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
