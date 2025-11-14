import sobre from "../../assets/sobre.png";
import exclamacao from "../../assets/exclamacao.png"
import radar from "../../assets/radar.png"

import styles from "./SobreProjeto.module.css"

import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";



const SobreProjeto = () => {
  return (
    <div className={styles.sentinela_page}>


      <header className={styles.main_header}>
        <h1>
          Mapeando o futuro das cidades verdes, uma árvore de cada vez.
        </h1>
        <div className={styles.banner_container}>
          <img src={sobre} alt="Pessoas caminhando em um parque arborizado" className={styles.banner_image} />
        </div>
      </header>



      <section className={styles.urban_challenge}>
        <div className={styles.content_wrapper}>
          <div className={styles.icon_container}>
            <img src={exclamacao} alt="Ícone de exclamação" className={styles.challenge_icon} />
          </div>
          <div className={styles.text_content}>
            <h2>O Desafio Urbano</h2>
            <p>
              A gestão de árvores em áreas urbanas é prejudicada pela ausência de um inventário digital confiável, resultando em controles manuais e planilhas desatualizadas. Essa lacuna gera falhas no acompanhamento da saúde das árvores, eleva os riscos de acidentes com quedas e força uma gestão reativa, que age apenas em emergências com custos mais altos.
            </p>
          </div>
        </div>
      </section>



      <section className={styles.our_solution}>
        <div className={styles.content_wrapper}>
          <div className={styles.text_content}>
            <h2>A Nossa Solução: Sentinela</h2>
            <p>
              O Sentinela é a solução digital que transforma a gestão arbórea, permitindo inventariar e monitorar árvores com georreferenciamento e dados fitossanitários. Nossa plataforma registra o histórico, dá manutenção e emite alertas preventivos baseados em dados, permitindo que gestores tomem decisões estratégicas e ajam de forma proativa para garantir a segurança e a sustentabilidade urbana.
            </p>
          </div>
          <div className={styles.icon_container}>
            <img src={radar} alt="Ícone de radar" className={styles.solution_icon} />
          </div>
        </div>
      </section>

  

      <section className={styles.final_cta}>
        <p>
          Faça parte da transformação. Seja um gestor parceiro ou um cidadão Sentinela.
        </p>
        <Link to="/cadastro-fisica" className={styles.cta_button}>
          Cadastre-se agora!
        </Link>
      </section>
    </div>
  );
};

export default SobreProjeto;