import NavBar from "../NavBar/NavBar.jsx";
import styles from "./CadastroPessoaJuridica.module.css";
import { useState } from "react";

const CadastroPessoaJuridica = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const backStep = () => setStep((prev) => prev - 1);

  const [dados, setDados] = useState({
    razao_social: "",
    nome_fantasia: "",
    cnpj: "",
    inscricao_estadual: "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    nome_contato: "",
    cargo_contato: "",
    email_corporativo: "",
    telefone_contato: "",
    senha: "",
    confirmar_senha: "",
  });

  const handleChange = (e) => {
    setDados({
      ...dados,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!dados.razao_social || !dados.nome_fantasia) return;
  };

  const titulos = [
    "Dados da empresa",
    "Endereço da empresa",
    "Informações do responsável e conta",
  ];

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.topo}>
          <h2 className={styles.titulo}>{titulos[step - 1]}</h2>
          <p className={styles.passos}>Passo {step} de 3</p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleEnviar} className={styles.form}>
            <div className={styles.form_group}>
              <label htmlFor="razao_social" className={styles.razao_social}>
                Razão Social
              </label>
              <input
                type="text"
                className={styles.input_razao_social}
                name="razao_social"
                value={dados.razao_social}
                onChange={handleChange}
                placeholder="Razão Social"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="nome_fantasia" className={styles.nome_fantasia}>
                Nome Fantasia
              </label>
              <input
                type="text"
                className={styles.input_nome_fantasia}
                name="nome_fantasia"
                value={dados.nome_fantasia}
                onChange={handleChange}
                placeholder="Nome Fantasia"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="cnpj" className={styles.cnpj}>
                CNPJ
              </label>
              <input
                type="text"
                className={styles.input_cnpj}
                name="cnpj"
                value={dados.cnpj}
                onChange={handleChange}
                placeholder="XX.XXX.XXX/XXXX-XX"
              />
            </div>

            <div className={styles.form_group}>
              <label
                htmlFor="inscricao_estadual"
                className={styles.inscricao_estadual}
              >
                Inscrição Estadual
              </label>
              <input
                type="text"
                className={styles.input_inscricao_estadual}
                name="inscricao_estadual"
                value={dados.inscricao_estadual}
                onChange={handleChange}
                placeholder="ex: 110.042.490.114"
              />
            </div>

            <button
              type="button"
              className={styles.next_step}
              onClick={nextStep}
            >
              Próximo
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleEnviar} className={styles.form}>
            <div className={styles.form_group}>
              <label htmlFor="cep" className={styles.cep}>
                CEP
              </label>
              <input
                type="text"
                className={styles.input_cep}
                name="cep"
                value={dados.cep}
                onChange={handleChange}
                placeholder="12345-678"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="estado" className={styles.estado}>
                Estado
              </label>
              <select
                name="estado"
                className={styles.input_estado}
                value={dados.estado}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MG">Minas Gerais</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MT">Mato Grosso</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>

            <div className={styles.form_group}>
              <label htmlFor="cidade" className={styles.cidade}>
                Cidade
              </label>
              <input
                type="text"
                className={styles.input_cidade}
                name="cidade"
                value={dados.cidade}
                onChange={handleChange}
                placeholder="Digite sua cidade"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="bairro" className={styles.bairro}>
                Bairro
              </label>
              <input
                type="text"
                className={styles.input_bairro}
                name="bairro"
                value={dados.bairro}
                onChange={handleChange}
                placeholder="Digite seu bairro"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="rua" className={styles.rua}>
                Rua
              </label>
              <input
                type="text"
                className={styles.input_rua}
                name="rua"
                value={dados.rua}
                onChange={handleChange}
                placeholder="Digite sua rua"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="numero" className={styles.numero}>
                Número
              </label>
              <input
                type="number"
                className={styles.input_numero}
                name="numero"
                value={dados.numero}
                onChange={handleChange}
                placeholder="Digite o número"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="complemento" className={styles.complemento}>
                Complemento
              </label>
              <input
                type="text"
                className={styles.input_complemento}
                name="complemento"
                value={dados.complemento}
                onChange={handleChange}
                placeholder="Digite o complemento (opcional)"
              />
            </div>
            
            <div className={styles.button_group}>
            <button
              type="button"
              className={styles.back_step}
              onClick={backStep}
            >
              Voltar
            </button>
            <button
              type="button"
              className={styles.next_step}
              onClick={nextStep}
            >
              Próximo
            </button>
            </div>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleEnviar} className={styles.form}>
            <div className={styles.form_group}>
              <label htmlFor="nome_contato" className={styles.nome_contato}>
                Nome do Contato
              </label>
              <input
                type="text"
                className={styles.input_nome_contato}
                name="nome_contato"
                value={dados.nome_contato}
                onChange={handleChange}
                placeholder="Digite o nome de contato"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="cargo_contato" className={styles.cargo_contato}>
                Cargo do Contato
              </label>
              <input
                type="text"
                className={styles.input_cargo_contato}
                name="cargo_contato"
                value={dados.cargo_contato}
                onChange={handleChange}
                placeholder="Digite o cargo"
              />
            </div>

            <div className={styles.form_group}>
              <label
                htmlFor="email_corporativo"
                className={styles.email_corporativo}
              >
                E-mail Corporativo
              </label>
              <input
                type="email"
                className={styles.input_email_corporativo}
                name="email_corporativo"
                value={dados.email_corporativo}
                onChange={handleChange}
                placeholder="exemplo@gmail.com"
              />
            </div>

            <div className={styles.form_group}>
              <label
                htmlFor="telefone_contato"
                className={styles.telefone_contato}
              >
                Telefone Contato
              </label>
              <input
                type="text"
                className={styles.input_telefone_contato}
                name="telefone_contato"
                value={dados.telefone_contato}
                onChange={handleChange}
                placeholder="(99) 12345-6789"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="senha" className={styles.senha}>
                Senha
              </label>
              <input
                type="password"
                className={styles.input_senha}
                name="senha"
                value={dados.senha}
                onChange={handleChange}
                placeholder="Digite sua senha"
              />
            </div>

            <div className={styles.form_group}>
              <label
                htmlFor="confirmar_senha"
                className={styles.confirmar_senha}
              >
                Confirmar Senha
              </label>
              <input
                type="password"
                className={styles.input_confirmar_senha}
                name="confirmar_senha"
                value={dados.confirmar_senha}
                onChange={handleChange}
                placeholder="Confirme sua senha"
              />
            </div>

            <button
              type="button"
              className={styles.back_step}
              onClick={backStep}
            >
              Voltar
            </button>
            <button type="submit" className={styles.btn_submit}>
              Enviar
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default CadastroPessoaJuridica;
