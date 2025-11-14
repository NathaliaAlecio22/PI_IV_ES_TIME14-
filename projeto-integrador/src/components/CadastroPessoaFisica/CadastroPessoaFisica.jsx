import "./CadastroPessoaFisica.css";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";

const CadastroPessoaFisica = () => {
    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(prev => prev + 1)
    }
    const backStep = () => {
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
        estado: '',
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
        setDados({
            ...dados,
            [e.target.name] : e.target.value,
        })
    }

    const handleEnviar = (e) => {
        e.preventDefault();

        //validacao simples
        if(!dados.nome || !dados.sobrenome || !dados.cpf || !dados.telefone ) return;

        // No passo 3 (Enviar), você pode querer redirecionar ou mostrar sucesso.
        if (step === 3) {
            console.log("Dados Enviados:", dados);
            alert("Cadastro enviado com sucesso!");
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
            
            {/* --- PASSO 1: INFORMAÇÕES PESSOAIS --- */}
            {step === 1 &&(
                <form onSubmit={handleEnviar} className="form">
                    
                    <div className="form-group"> {/* Agrupamento para Nome */}
                        <label htmlFor="nome" className="nome">Nome</label>
                        <input type="text" className="input-nome" value={dados.nome} name="nome" onChange={handleChange} placeholder="Digite seu nome"/>
                    </div>

                    <div className="form-group"> {/* Agrupamento para Sobrenome */}
                        <label htmlFor="sobrenome" className="sobrenome">Sobrenome</label>
                        <input type="text" className="input-sobrenome" value={dados.sobrenome} name="sobrenome" onChange={handleChange} placeholder="Digite seu sobrenome"/>
                    </div>

                    <div className="form-group"> {/* Agrupamento para CPF */}
                        <label htmlFor="cpf" className="cpf">CPF</label>
                        <input type="text" className="input-cpf" value={dados.cpf} name="cpf" onChange={handleChange} placeholder="123.456.789.-00"/>
                    </div>

                    <div className="form-group"> {/* Agrupamento para Telefone */}
                        <label htmlFor="telefone" className="telefone">Telefone</label>
                        <input type="text" className="input-telefone" value={dados.telefone} name="telefone" onChange={handleChange} placeholder="(00) 12345-6789"/>
                    </div>

                    
                    {/* Agrupamento Especial para Data de Nascimento (Ocupa 2 Colunas) */}
                    <label htmlFor="data-nascimento" className="data-nascimennto">Data de Nascimento</label>
                    <div className="data-group">
                        <input type="text" className="input-dia" value={dados.dia} name="dia" onChange={handleChange} placeholder="Dia"/>
                        <input type="text" className="input-mes" value={dados.mes} name="mes" onChange={handleChange} placeholder="Mês" />
                        <input type="text" className="input-ano" value={dados.ano} name="ano" onChange={handleChange} placeholder="Ano"/>
                    </div>
                    
                    <button type="button" className="next-step" onClick={nextStep}>Próximo</button>
                </form>
            )}


            {/* --- PASSO 2: ENDEREÇO --- */}
            {step === 2 &&(
                <form onSubmit={handleEnviar} className="form">
                    
                    <div className="form-group"> {/* Agrupamento para CEP */}
                        <label htmlFor="cep" className="cep">CEP</label>
                        <input type="text" className="input-cep" value={dados.cep} name="cep" onChange={handleChange} placeholder="12345-678"/>
                    </div>
                    
                    <div className="form-group"> {/* Agrupamento para Estado */}
                        <label htmlFor="estado" className="estado">Estado</label>
                        <select name="estado" onChange={handleChange} value={dados.estado} className="input-estado">
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
                           <option value="SP">Sao Paulo</option> 
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
                        <input type="text" className="input-cidade" name="cidade" value={dados.cidade} onChange={handleChange} placeholder="Digite sua Cidade"/>
                    </div>

                    <div className="form-group"> {/* Agrupamento para Bairro */}
                        <label htmlFor="bairro" className="bairro">Bairro</label>
                        <input type="text" className="input-bairro" name="bairro" value={dados.bairro} onChange={handleChange} placeholder="Digite seu bairro"/>
                    </div>

                    <div className="form-group"> {/* Agrupamento para Rua */}
                        <label htmlFor="rua" className="rua">Rua</label>
                        <input type="text" className="input-rua" name="rua" value={dados.rua} onChange={handleChange} placeholder="Digite sua rua"/>
                    </div>

                    <div className="form-group"> {/* Agrupamento para Número */}
                        <label htmlFor="numero" className="numero">Número</label>
                        <input type="number" className="input-numero" name="numero" value={dados.numero} onChange={handleChange} placeholder="Digite seu número"/>
                    </div>

                    {/* Complemento ocupa a largura total */}
                    <div className="form-group full-width"> 
                        <label htmlFor="complemento" className="complemento">Complemento</label>
                        <input type="text" className="input-complemento" name="complemento" value={dados.complemento} onChange={handleChange} placeholder="Digite seu Complemento (Opcional)"/>
                    </div>
                    
                    <button type="button" className="back-step" onClick={backStep}>Voltar</button> {/* Mudei a ordem para o botão 'Próximo' ficar no final */}
                    <button type="button" className="next-step" onClick={nextStep}>Próximo</button>
                </form>
            )}


            {/* --- PASSO 3: INFORMAÇÕES DA CONTA --- */}
            {step === 3 &&(
                <form className="form" onSubmit={handleEnviar}>
                    
                    <div className="form-group full-width"> {/* Email ocupa largura total (exemplo) */}
                        <label htmlFor="email" className="email">Email</label>
                        <input type="email" className="input-email" name="email" value={dados.email} onChange={handleChange} placeholder="Digite seu Email"/>
                    </div>

                    <div className="form-group"> {/* Senha */}
                        <label htmlFor="senha" className="senha">Senha</label>
                        <input type="password" className="input-senha" name="senha" value={dados.senha} onChange={handleChange} placeholder="Digite sua senha"/>
                    </div>

                    <div className="form-group"> {/* Confirmar Senha */}
                        <label htmlFor="confirmar-senha" className="confirmar-senha">Confirmar Senha</label>
                        <input type="password" className="input-senha" name="confirma_senha" value={dados.confirma_senha} onChange={handleChange} placeholder="Confirme sua senha"/>
                    </div>
                    
                    <button type="button" className="back-step" onClick={backStep}>Voltar</button> {/* Mudei a ordem */}
                    <button type="submit" className="btn-submit">Enviar</button>
                </form>
            )}
        </div>
    </>
    )
}

export default CadastroPessoaFisica;