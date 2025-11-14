import NavBar from "../NavBar/NavBar";
import styles from "./EsquecerSenha.module.css";
import { useState } from "react";


const EsquecerSenha = () => {

    const [dados, setDados] = useState({
        email: "",
    });

    const handleChange = (e) => {
        setDados({
            ...dados,
            [e.target.name]: e.target.value,
        });

    };

    const handleEnviar = (e) => {
        e.preventDefault();
        console.log(dados);

        setDados({
            email: "",
        })
    }

    return(
        <div>
            <>
                <NavBar />
                
                <div className={styles.container_geral}>
                    <h2 className={styles.titulo}>Esqueci minha senha</h2>
                    <p className={styles.paragrafo}>Digite o e-mail associado à sua conta e siga as instruções enviadas para redefinir sua senha.</p>

                    <form onSubmit={handleEnviar} className={styles.form_esquecer_senha}>
                        <input type="email" name="email" className={styles.input_email}  placeholder="Digite seu e-mail" value={dados.email} onChange={handleChange}/>
                        <button type="submit" className={styles.btn_enviar_email}>Enviar e-mail</button>
                    </form>
                </div>
            </>
        </div>
    )
}

export default EsquecerSenha;