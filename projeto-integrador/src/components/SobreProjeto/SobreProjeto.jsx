import sobre from "../../assets/floresta-com-arvores-perto.jpg";
import exclamacao from "../../assets/exclamacao.png";
import radar from "../../assets/radar.png";

import styles from "./SobreProjeto.module.css";

import { Link } from "react-router-dom";

const SobreProjeto = () => {
    return (
        <div className={styles.pageContainer}>

            {/* HERO PRINCIPAL */}
            <header className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    Mapeando o futuro das cidades verdes,<br />
                    uma árvore de cada vez.
                </h1>

                <img
                    src={sobre}
                    alt="Pessoas caminhando em um parque arborizado"
                    className={styles.heroImage}
                />
            </header>


            <section className={styles.section}>
                <div className={styles.sectionContent}>
                    <img src={exclamacao} className={styles.sectionIcon} alt="Ícone de exclamação" />

                    <div>
                        <h2>O Desafio Urbano</h2>
                        <p>
                            A gestão de árvores em áreas urbanas é prejudicada pela ausência de um
                            inventário digital confiável, resultando em controles manuais e planilhas
                            desatualizadas. Essa lacuna gera falhas no acompanhamento da saúde das árvores,
                            eleva os riscos de acidentes com quedas e força uma gestão reativa, que age
                            apenas em emergências com custos mais altos.
                        </p>
                    </div>
                </div>
            </section>


            <section className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.sectionContentReverse}>
                    <div>
                        <h2>Nossa Solução:</h2>
                        <p>
                            O Sentinela é a solução digital que transforma a gestão arbórea, permitindo
                            inventariar e monitorar árvores com georreferenciamento e dados fitossanitários.
                            Nossa plataforma registra históricos, dá manutenção e emite alertas preventivos
                            baseados em dados, permitindo que gestores tomem decisões estratégicas e ajam
                            de forma proativa para garantir a segurança e a sustentabilidade urbana.
                        </p>
                    </div>

                    <img src={radar} className={styles.sectionIcon} alt="Ícone de radar" />
                </div>
            </section>


            <section className={styles.ctaSection}>
                <p className={styles.ctaText}>
                    Faça parte da transformação. Seja um gestor parceiro ou um cidadão Sentinela.
                </p>

                <Link to="/cadastro" className={styles.ctaButton}>
                    Cadastre-se agora!
                </Link>
            </section>

        </div>
    );
};

export default SobreProjeto;
