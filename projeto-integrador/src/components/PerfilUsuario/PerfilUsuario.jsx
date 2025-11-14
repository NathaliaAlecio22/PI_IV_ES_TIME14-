import styles from "./PerfilUsuario.module.css"
import NavBar from "../NavBar/NavBar.jsx";
import Logo_username from "../../assets/Logo_username.png"


const PerfilUsuario = () => {
    return(
        <>
            <NavBar />
            <div className={styles.container_geral}>
                <div className={styles.container_perfil}>
                    <h2 className={styles.titulo_perfil}>Perfil do Usuario</h2>
                    <img src={Logo_username} alt="logo UserName" className={styles.logo_username} />
                    <button className={styles.alterar_foto_perfil}>Alterar Foto de Perfil</button>
                </div>

                <div className={styles.container_informacoes}>
                    <h2 className={styles.titulo_informacoes}>Informacoes da Conta</h2>
                    <p><strong>Email: </strong>Exemplo@email.com</p>


                    <h2 className={styles.titulo_informacoes}>Informacoes Pessoais</h2>
                    <p><strong>Nome: </strong>Usuario</p>
                    <p><strong>Sobrenome: </strong>da Silva</p>
                    <p><strong>CPF: </strong>123.456.789-00</p>
                    <p><strong>Telefone: </strong></p>
                    <p><strong>Data de Nascimento: </strong></p>  

                    <h2 className={styles.titulo_informacoes}>Endereco do Usuario</h2>  
                    <p><strong>CEP: </strong></p>
                    <p><strong>Estado: </strong></p>
                    <p><strong>Cidade: </strong></p>
                    <p><strong>Bairro: </strong></p>
                    <p><strong>Rua: </strong></p>
                    <p><strong>Numero: </strong></p>
                    <p><strong>Complemento: </strong></p>

                </div>
            </div>
        </>
    )
}

export default PerfilUsuario;

