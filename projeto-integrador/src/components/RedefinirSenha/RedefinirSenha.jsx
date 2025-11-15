import NavBar from "../NavBar/NavBar";
import styles from "./RedefinirSenha.module.css";
import { useState } from "react";


const RedefinirSenha = () => {

    const [dados, setDados] = useState({
        novaSenha: "",
        confirmarSenha: "",
    });

    const handleChange = (e) => {
        setDados({
            ...dados,
            [e.target.name]: e.target.value,
        });


    };

    const handleRedefinir = (e) => {
        e.preventDefault();
        console.log(dados);

        setDados({
            novaSenha: "",
            confirmarSenha: "",
        })
    };



    return(
        <div>
            <NavBar />
            
            <div className={styles.container_redefinirSenha}>
                <h1 className={styles.titulo}>Redefinir Senha</h1>

                <form onSubmit={handleRedefinir} className={styles.form_redefinirSenha}>
                    <input type="password" name="novaSenha" className={styles.input_nova_senha} placeholder="Digite a nova senha" value={dados.novaSenha} onChange={handleChange} />
                    <input type="password" name="confirmarSenha" className={styles.input_confirmar_senha} placeholder="Confirme a nova senha" value={dados.confirmarSenha} onChange={handleChange} />

                    <button type="submit" className={styles.btn_redefinir_senha}>Redefinir Senha</button>
                </form>
            </div>
        </div>
    )
}

export default RedefinirSenha;