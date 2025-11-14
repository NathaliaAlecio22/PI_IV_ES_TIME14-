import NavBar from "../NavBar/NavBar";
import styles from "./Login.module.css"

const Login = () => {
    return(
        <>
            <NavBar />
            <div className={styles.container_geral}>
                <div className={styles.container_titulo}>
                    <h1 className={styles.titulo}>O sistema de monitoramento mais eficiente do mercado</h1>
                </div>

                <div className={styles.container_form}>
                    <h2 className={styles.titulo_bemvindo}>Bem-Vindo!</h2>
                    <h3 className={styles.titulo_login}>Login</h3>


                    <form className={styles.form}>
                        <input type="text" placeholder="Digite seu e-mail" name="email" className={styles.input_email}/>
                        <input type="password" placeholder="Senha" name="senha" className={styles.input_senha}/>
                        <a href="#">Esqueceu sua senha? </a>
                        <button type="submit" className={styles.btn_login}>Fazer Login</button>
                    </form>

                    <div className={styles.container_sem_conta}>
                        <p className={styles.paragrafo}>Nao tem uma conta ?</p> <a className={styles.cadastrar_aqui} href="#">Cadastre-se aqui</a>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default Login;