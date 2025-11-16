// components/CadastroPessoaJuridica/CadastroPessoaJuridica.jsx

import NavBar from "../NavBar/NavBar.jsx";
import styles from "./CadastroPessoaJuridica.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importar o useNavigate

const CadastroPessoaJuridica = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate(); // 2. Inicializar o hook para navegação

    // 3. Adicionar estado para erros da API
    const [erroApi, setErroApi] = useState('');

    const nextStep = () => {
        // Validações simples antes de avançar
        if (step === 1 && (!dados.razao_social || !dados.nome_fantasia || !dados.cnpj)) {
            setErroApi("Por favor, preencha Razão Social, Nome Fantasia e CNPJ.");
            return;
        }
        if (step === 2 && (!dados.cep || !dados.estado || !dados.cidade || !dados.bairro || !dados.rua || !dados.numero)) {
            setErroApi("Por favor, preencha todos os campos de endereço obrigatórios.");
            return;
        }
        setErroApi(''); // Limpa o erro se a validação passar
        setStep((prev) => prev + 1);
    }

    const backStep = () => {
        setErroApi(''); // Limpa o erro ao voltar
        setStep((prev) => prev - 1);
    }

    const [dados, setDados] = useState({
        razao_social: "",
        nome_fantasia: "",
        cnpj: "",
        inscricao_estadual: "",
        cep: "",
        estado: "SP", // Valor padrão para o <select>
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
        if (erroApi) setErroApi(''); // Limpa o erro ao digitar

        setDados({
            ...dados,
            [e.target.name]: e.target.value,
        });
    };

    // --- 4. AJUSTE PRINCIPAL: LÓGICA DE API NO handleEnviar ---
    const handleEnviar = async (e) => {
        e.preventDefault();
        setErroApi(''); // Limpa erros antigos

        // 4.1 Validação de Senha
        if (dados.senha !== dados.confirmar_senha) {
            setErroApi("As senhas não coincidem!");
            return;
        }
        if (dados.senha.length < 6) {
            setErroApi("A senha deve ter pelo menos 6 caracteres.");
            return;
        }
        if (!dados.email_corporativo || !dados.nome_contato || !dados.telefone_contato) {
            setErroApi("Por favor, preencha todos os campos de contato e conta.");
            return;
        }


        // 4.2 Transformação (React snake_case -> Java camelCase DTO)
        // O seu DTO do Spring Boot (EmpresaCadastroDTO) espera os nomes em camelCase.
        const dtoParaEnviar = {
            razaoSocial: dados.razao_social,
            nomeFantasia: dados.nome_fantasia,
            cnpj: dados.cnpj,
            inscricaoEstadual: dados.inscricao_estadual,
            cep: dados.cep,
            estado: dados.estado,
            cidade: dados.cidade,
            bairro: dados.bairro,
            rua: dados.rua,
            numero: dados.numero,
            complemento: dados.complemento,
            nomeContato: dados.nome_contato,
            cargoContato: dados.cargo_contato,
            emailCorporativo: dados.email_corporativo,
            telefone: dados.telefone_contato, // Mapeamento (telefone_contato -> telefone)
            senha: dados.senha
        };

        // 4.3 Chamada da API (Fetch)
        try {
            const response = await fetch('http://localhost:8080/api/empresas/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dtoParaEnviar),
            });

            // 4.4 Tratamento da Resposta
            if (response.status === 201) { // 201 CREATED
                alert("Cadastro de Empresa realizado com sucesso! Você será redirecionado para o Login.");
                navigate('/login'); // Redireciona para a tela de Login

            } else if (response.status === 400) { // 400 BAD REQUEST
                // Erro de Validação (Ex: CNPJ/Email duplicado)
                const erroTexto = await response.text(); // O backend retorna a mensagem de erro como texto
                setErroApi(erroTexto || "Erro de validação. Verifique os dados.");

            } else {
                // Outros erros (ex: 500 Internal Server Error)
                setErroApi(`Erro ${response.status}: Ocorreu um problema no servidor.`);
            }

        } catch (error) {
            // Erro de rede (ex: API desligada)
            console.error("Erro de rede:", error);
            setErroApi("Erro de conexão. Verifique se a API (backend) está rodando.");
        }
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

                {/* 5. Exibição de Erros */}
                {erroApi && <div className={styles.erroApi}>{erroApi}</div>}

                {/* STEP 1 */}
                {step === 1 && (
                    // 6. Ajuste no onSubmit (chamar nextStep, não handleEnviar)
                    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className={styles.form}>
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
                                required
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
                                required
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
                                required
                            />
                        </div>

                        <div className={styles.form_group}>
                            <label
                                htmlFor="inscricao_estadual"
                                className={styles.inscricao_estadual}
                            >
                                Inscrição Estadual (Opcional)
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
                            type="submit"
                            className={styles.next_step}
                        >
                            Próximo
                        </button>
                    </form>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    // 6. Ajuste no onSubmit
                    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className={styles.form}>
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
                                required
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
                                required
                            >
                                <option value="SP">São Paulo</option>
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
                                required
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
                                required
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
                                required
                            />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="numero" className={styles.numero}>
                                Número
                            </label>
                            <input
                                type="text" // Mudei para text para aceitar "s/n"
                                className={styles.input_numero}
                                name="numero"
                                value={dados.numero}
                                onChange={handleChange}
                                placeholder="Digite o número"
                                required
                            />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="complemento" className={styles.complemento}>
                                Complemento (Opcional)
                            </label>
                            <input
                                type="text"
                                className={styles.input_complemento}
                                name="complemento"
                                value={dados.complemento}
                                onChange={handleChange}
                                placeholder="Digite o complemento"
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
                                type="submit"
                                className={styles.next_step}
                            >
                                Próximo
                            </button>
                        </div>
                    </form>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    // 6. onSubmit final chama handleEnviar
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
                                required
                            />
                        </div>

                        <div className={styles.form_group}>
                            <label htmlFor="cargo_contato" className={styles.cargo_contato}>
                                Cargo do Contato (Opcional)
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
                                required
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
                                required
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
                                required
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
                                required
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