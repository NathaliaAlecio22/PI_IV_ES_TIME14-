// components/CadastroPessoaFisica/CadastroPessoaFisica.jsx

import "./CadastroPessoaFisica.css";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate para redirecionar

const CadastroPessoaFisica = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate(); // Hook para redirecionamento

    // Estado para armazenar mensagens de erro do backend ou validação
    const [erroApi, setErroApi] = useState('');

    const nextStep = () => {
        // Validação simples antes de avançar (exemplo no passo 1)
        if (step === 1) {
            if(!dados.nome || !dados.sobrenome || !dados.cpf || !dados.telefone || !dados.dia || !dados.mes || !dados.ano) {
                setErroApi("Por favor, preencha todos os campos obrigatórios.");
                return; // Impede de avançar se o passo 1 estiver incompleto
            }
        }
        if (step === 2) {
            if(!dados.cep || !dados.estado || !dados.cidade || !dados.bairro || !dados.rua || !dados.numero) {
                setErroApi("Por favor, preencha todos os campos de endereço.");
                return;
            }
        }
        setErroApi(''); // Limpa o erro se a validação passar
        setStep(prev => prev + 1);
    }

    const backStep = () => {
        setErroApi(''); // Limpa erros ao voltar
        setStep(prev => prev - 1)
    }

    const [dados, setDados] = useState({
        nome: '',
        sobrenome: '',
        cpf: '',
        telefone: '',
        dia: '',
        mes: '',
        ano: '',
        cep: '',
        estado: 'SP', // Definindo um valor padrão
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
        email: '',
        senha: '',
        confirma_senha: '',
    });

    const handleChange = (e) => {
        // Limpa o erro da API ao digitar novamente
        if (erroApi) setErroApi('');

        setDados({
            ...dados,
            [e.target.name] : e.target.value,
        })
    }

    // --- IMPLEMENTAÇÃO DA LÓGICA DE SUBMISSÃO (PASSO 3) ---
    const handleEnviar = async (e) => {
        e.preventDefault();
        setErroApi(''); // Limpa erros antigos

        // --- 1. Validação do Frontend (Senha) ---
        if (dados.senha !== dados.confirma_senha) {
            setErroApi("As senhas não coincidem!");
            return;
        }

        if (dados.senha.length < 6) {
            setErroApi("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (!dados.email) {
            setErroApi("O e-mail é obrigatório.");
            return;
        }

        // --- 2. Transformação (React State -> DTO do Backend) ---
        // O Backend (UsuarioCadastroDTO) espera 'nomeCompleto' e 'dataNascimento' (AAAA-MM-DD)
        const dtoParaEnviar = {
            nomeCompleto: `${dados.nome} ${dados.sobrenome}`,
            cpf: dados.cpf,
            // Formata a data para AAAA-MM-DD (ex: 2025-05-01)
            dataNascimento: `${dados.ano}-${dados.mes.padStart(2, '0')}-${dados.dia.padStart(2, '0')}`,

            rua: dados.rua,
            numero: dados.numero,
            complemento: dados.complemento,
            bairro: dados.bairro,
            cidade: dados.cidade,
            estado: dados.estado,
            cep: dados.cep,

            telefone: dados.telefone,
            email: dados.email,
            senha: dados.senha
        };
        console.log("Erro 0");

        // --- 3. Chamada da API (Fetch) ---
        // Rota pública, não precisamos do Token JWT aqui.
        try {
            const response = await fetch('http://localhost:8080/api/usuarios/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dtoParaEnviar),
            });
            console.log("Erro1");

            // --- 4. Tratamento da Resposta ---
            if (response.status === 201) { // 201 CREATED
                // Sucesso
                alert("Cadastro realizado com sucesso! Você será redirecionado para o Login.");
                navigate('/login'); // Redireciona para a tela de Login

            } else if (response.status === 400) { // 400 BAD REQUEST
                // Erro de Validação (Ex: CPF/Email duplicado)
                const erroTexto = await response.text(); // O backend retorna a mensagem de erro como texto
                setErroApi(erroTexto || "Erro de validação. Verifique seus dados.");

            } else {
                // Outros erros (ex: 500 Internal Server Error)
                setErroApi(`Erro ${response.status}: Ocorreu um problema no servidor.`);
            }

        } catch (error) {
            // Erro de rede (ex: API desligada)
            console.error("Erro de rede:", error);
            setErroApi("Erro de conexão. Verifique se a API (backend) está rodando.");
        }
    }

    const titulos = ['Informações do Usuario', 'Endereço do usuario', 'Informações da Conta']


    return(
        <>
            <NavBar />
            <div className="container">
                {/* --- TOPO --- */}
                <div className="topo">
                    <h2 className="titulo">{titulos[step-1]}</h2>
                    <p className="passos">Passo {step} de 3</p>
                </div>

                {/* Exibe a mensagem de erro da API ou validação, se houver */}
                {erroApi && <div className="erro-api">{erroApi}</div>}

                {/* --- PASSO 1: INFORMAÇÕES PESSOAIS --- */}
                {step === 1 &&(
                    // O onSubmit aqui deve apenas validar e ir para o próximo passo
                    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="form">

                        <div className="form-group"> {/* Agrupamento para Nome */}
                            <label htmlFor="nome" className="nome">Nome</label>
                            <input type="text" className="input-nome" value={dados.nome} name="nome" onChange={handleChange} placeholder="Digite seu nome" required/>
                        </div>

                        <div className="form-group"> {/* Agrupamento para Sobrenome */}
                            <label htmlFor="sobrenome" className="sobrenome">Sobrenome</label>
                            <input type="text" className="input-sobrenome" value={dados.sobrenome} name="sobrenome" onChange={handleChange} placeholder="Digite seu sobrenome" required/>
                        </div>

                        <div className="form-group"> {/* Agrupamento para CPF */}
                            <label htmlFor="cpf" className="cpf">CPF</label>
                            <input type="text" className="input-cpf" value={dados.cpf} name="cpf" onChange={handleChange} placeholder="123.456.789-00" required/>
                        </div>

                        <div className="form-group"> {/* Agrupamento para Telefone */}
                            <label htmlFor="telefone" className="telefone">Telefone</label>
                            <input type="text" className="input-telefone" value={dados.telefone} name="telefone" onChange={handleChange} placeholder="(00) 12345-6789" required/>
                        </div>


                        {/* Agrupamento Especial para Data de Nascimento (Ocupa 2 Colunas) */}
                        <label htmlFor="data-nascimento" className="data-nascimennto">Data de Nascimento</label>
                        <div className="data-group">
                            <input type="text" className="input-dia" value={dados.dia} name="dia" onChange={handleChange} placeholder="Dia" maxLength="2" required/>
                            <input type="text" className="input-mes" value={dados.mes} name="mes" onChange={handleChange} placeholder="Mês" maxLength="2" required/>
                            <input type="text" className="input-ano" value={dados.ano} name="ano" onChange={handleChange} placeholder="Ano" maxLength="4" required/>
                        </div>

                        <button type="submit" className="next-step">Próximo</button>
                    </form>
                )}


                {/* --- PASSO 2: ENDEREÇO --- */}
                {step === 2 &&(
                    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="form">

                        <div className="form-group"> {/* Agrupamento para CEP */}
                            <label htmlFor="cep" className="cep">CEP</label>
                            <input type="text" className="input-cep" value={dados.cep} name="cep" onChange={handleChange} placeholder="12345-678" required/>
                        </div>

                        <div className="form-group"> {/* Agrupamento para Estado */}
                            <label htmlFor="estado" className="estado">Estado</label>
                            <select name="estado" onChange={handleChange} value={dados.estado} className="input-estado" required>
                                <option value="SP">Sao Paulo</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="ES">Espírito santo</option>
                                <option value="GO">Goiás</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="PA">Pára</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="RO">Rondonia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                                <option value="PI">Piaui</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                            </select>
                        </div>

                        <div className="form-group"> {/* Agrupamento para Cidade */}
                            <label htmlFor="cidade" className="cidade">Cidade</label>
                            <input type="text" className="input-cidade" name="cidade" value={dados.cidade} onChange={handleChange} placeholder="Digite sua Cidade" required/>
                        </div>

                        <div className="form-group"> {/* Agrupamento para Bairro */}
                            <label htmlFor="bairro" className="bairro">Bairro</label>
                            <input type="text" className="input-bairro" name="bairro" value={dados.bairro} onChange={handleChange} placeholder="Digite seu bairro" required/>
                        </div>

                        <div className="form-group"> {/* Agrupamento para Rua */}
                            <label htmlFor="rua" className="rua">Rua</label>
                            <input type="text" className="input-rua" name="rua" value={dados.rua} onChange={handleChange} placeholder="Digite sua rua" required/>
                        </div>

                        <div className="form-group"> {/* Agrupamento para Número */}
                            <label htmlFor="numero" className="numero">Número</label>
                            <input type="text" className="input-numero" name="numero" value={dados.numero} onChange={handleChange} placeholder="Digite seu número" required/>
                        </div>

                        {/* Complemento ocupa a largura total */}
                        <div className="form-group full-width">
                            <label htmlFor="complemento" className="complemento">Complemento</label>
                            <input type="text" className="input-complemento" name="complemento" value={dados.complemento} onChange={handleChange} placeholder="Digite seu Complemento (Opcional)"/>
                        </div>

                        <button type="button" className="back-step" onClick={backStep}>Voltar</button>
                        <button type="submit" className="next-step">Próximo</button>
                    </form>
                )}


                {/* --- PASSO 3: INFORMAÇÕES DA CONTA --- */}
                {step === 3 &&(
                    // O onSubmit aqui é o único que chama a API
                    <form className="form" onSubmit={handleEnviar}>

                        <div className="form-group full-width">
                            <label htmlFor="email" className="email">Email</label>
                            <input type="email" className="input-email" name="email" value={dados.email} onChange={handleChange} placeholder="Digite seu Email" required/>
                        </div>

                        <div className="form-group"> {/* Senha */}
                            <label htmlFor="senha" className="senha">Senha</label>
                            <input type="password" className="input-senha" name="senha" value={dados.senha} onChange={handleChange} placeholder="Digite sua senha" required/>
                        </div>

                        <div className="form-group"> {/* Confirmar Senha */}
                            <label htmlFor="confirmar-senha" className="confirmar-senha">Confirmar Senha</label>
                            <input type="password" className="input-senha" name="confirma_senha" value={dados.confirma_senha} onChange={handleChange} placeholder="Confirme sua senha" required/>
                        </div>

                        <button type="button" className="back-step" onClick={backStep}>Voltar</button>
                        <button type="submit" className="btn-submit">Enviar</button>
                    </form>
                )}
            </div>
        </>
    )
}

export default CadastroPessoaFisica;