import NavBar from "../NavBar/NavBar";
import styles from "./Cadastro.module.css"  
import Logo_username from "../../assets/Logo_username.png"
import empresa from "../../assets/empresa.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Cadastro = () => {
    const [opcao, setOpcao] = useState('');
    const navigate = useNavigate();

    const handleContinuar = () => {
        if (opcao === 'fisica'){
            console.log('Redirecionar para cadastro de pessoa física');
            navigate('/cadastro-fisica');

        } else if (opcao === 'juridica') {
            console.log('Redirecionar para cadastro de pessoa jurídica');
            navigate('/cadastro-juridica');
        }
    };



    return (
        <div>
            <NavBar />
            <div className={styles.container_geral}>
                <div className={styles.container_titulo}>
                    <h1 className={styles.titulo}>O sistema de monitoramento <br />mais eficiente do mercado</h1>
                </div>

                <div className={styles.container_form}>
                    <h2 className={styles.form_titulo}>Como gostaria de contribuir?</h2>

                    <div className={`${styles.pessoa_fisica} ${opcao === 'fisica' ? styles.selecionado : ''}`} onClick={() => setOpcao('fisica')}>
                        <img src={Logo_username} alt="Logo" />
                        <strong>Pessoa Física</strong>
                        <p>Quero cadastrar árvores na minha comunidade e ajudar no monitoramento</p>
                    </div>


                    <div className={`${styles.pessoa_juridica} ${opcao === 'juridica' ? styles.selecionado : ''}`} onClick={() => setOpcao('juridica')}>
                        <img src={empresa} alt="Logo" />
                        <strong>Pessoa Jurídica</strong>
                        <p>Represento uma prefeitura, condomínio ou empresa e quero gerenciar nosso patrimônio arbóreo</p>
                    </div>

                    <button onClick={handleContinuar} disabled={!opcao}>Continuar</button>
                </div>
            </div>

        </div>
    );
};
export default Cadastro;