import NavBar from "../NavBar/NavBar.jsx"
import './CadastroPessoaJuridica.css'
import { useState } from "react"


const CadastroPessoaJuridica = () => {

    const [step, setStep] = useState(1);
    const nextStep = () => {
        setStep(prev => prev + 1)
    }
    const backStep = () => {
        setStep(prev => prev - 1)
    }

    const [dados, setDados] = useState({
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        incricao_estadual: '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
        nome_contato: '',
        cargo_contato: '',
        email_corporativo: '',
        telefone_contato: '',
        senha: '',
        confirmar_senha: '',
    });

    const handleChange = (e) => {
        setDados({
            ...dados,
            [e.target.name]: e.target.value
        })
    }

    const handleEnviar = (e) => {
        e.preventDefault();

        //Valida simples (mudar dps)

        if(!dados.razao_social || !dados.nome_fantasia) return;
    }

    const titulos = ['Dados da empresa', 'Endereço da empresa', 'Informações do responsável e conta']



    return(
        <>
            <NavBar />
            <div className="container">
                <div className="topo">
                    <h2 className="titulo">{titulos[step - 1]}</h2>
                    <p className="passos">Passo {step} de 3</p>
                </div>

                {step === 1 && (
                    <form onSubmit={handleEnviar} className="form">
                        <div className="form-group">
                            <label htmlFor="razao-racial" className="razao-racial">Razão Racial</label>
                            <input type="text" className="input-razao-racial" name="razao-social" value={dados.razao_social} onChange={handleChange} placeholder="Razão Racial"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nome-fantasia" className="nome-fantasia">Nome Fantasia</label>
                            <input type="text" className="input-nome-fantasia" value={dados.nome_fantasia} name="nome-fantasia" onChange={handleChange} placeholder="Nome Fantasia"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cnpj" className="cnpj">CNPJ</label>
                            <input type="text" className="input-cnpj" value={dados.cnpj} name="cnpj" onChange={handleChange} placeholder="XX.XXX.XXX/XXXX-XX"/>

                        </div>

                        <div className="form-group">
                            <label htmlFor="inscricao-estadual" className="inscricao-estadual">Incrição Estadual</label>
                            <input type="text"  className="input-inscricao-estadual" name="inscricao-estadual" value={dados.incricao_estadual} onChange={handleChange} placeholder="ex: 110.042.490.114"/>
                        </div>

                        <button type="button" className="next-step" onClick={nextStep}>Próximo</button>
               
                    </form>
                )}


                {step === 2 && (
                    <form onSubmit={handleEnviar} className="form">
                        <div className="form-group">
                            <label htmlFor="cep" className="cep">CEP</label>
                            <input type="text" className="input-cep" name="cep" value={dados.cep} onChange={handleChange} placeholder="12345-678" />

                        </div>


                        <div className="form-group">
                            <label htmlFor="estado" className="estado">Estado</label>
                            <select name="estado" className="estado" value={dados.estado}>
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


                        <div className="form-group">
                            <label htmlFor="cidade" className="cidade">Cidade</label>
                            <input type="text" className="input-cidade" name="cidade" value={dados.cidade} onChange={handleChange} placeholder="Digite sua Cidade"/>

                        </div>

                        <div className="form-group">
                            <label htmlFor="bairro" className="bairro">Bairro</label>
                            <input type="text" className="input-bairro" name="bairro" value={dados.bairro} onChange={handleChange} placeholder="Digite seu Bairro"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="rua" className="rua">Rua</label>
                            <input type="text" className="input-rua" name="rua" value={dados.rua} onChange={handleChange} placeholder="Digite sua rua"/>
                        </div>

                        <div className="form-group"> 
                            <label htmlFor="numero" className="numero">Número</label>
                            <input type="number" className="input-numero" name="numero" value={dados.numero} onChange={handleChange} placeholder="Digite seu número"/>
                        </div>

                    
                        
                        <div className="form-group full-width"> 
                            <label htmlFor="complemento" className="complemento">Complemento</label>
                            <input type="text" className="input-complemento" name="complemento" value={dados.complemento} onChange={handleChange} placeholder="Digite seu Complemento (Opcional)"/>
                        </div>

                        <button type="button" className="back-step" onClick={backStep}>Voltar</button>
                        <button type="button" className="next-step" onClick={nextStep}>Próximo</button>
                    </form>


                    
                )}


                {step === 3 &&(
                    <form onSubmit={handleEnviar} className="form">
                        <div className="form-group">
                            <label htmlFor="nome-contato" className="nome-contato">Nome do Contato</label>
                            <input type="text" className="input-nome-contato" name="nome-contato" value={dados.nome_contato} onChange={handleChange} placeholder="Digite o Nome de Contato"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cargo-contato" className="cargo-contato">Cargo do Contato</label>
                            <input type="text" className="input-cargo-contato" name="cargo-contato" value={dados.cargo_contato} onChange={handleChange} placeholder="Digite o Nome do cargo"/>
                        </div>


                        <div className="form-group">
                            <label htmlFor="email-corporativo" className="email-corporativo">E-mail Corporativo</label>
                            <input type="email" className="input-email-corporarivo" name="email-corporativo" value={dados.email_corporativo} onChange={handleChange} placeholder="exemplo@gmail.com"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefone-contato" className="telefone-contato">Telefone Contato</label>
                            <input type="text" className="input-telefone-contato" name="telefone-contato" value={dados.telefone_contato} onChange={handleChange} placeholder="(99) 12345-6789"/>

                        </div>


                        <div className="form-group">
                            <label htmlFor="senha" className="senha">Senha</label>
                            <input type="password" className="input-senha" name="senha" value={dados.senha} onChange={handleChange} placeholder="Digite sua senha"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmar-senha" className="confirmar-senha">Confirmar Senha</label>
                            <input type="password" className="confirmar-senha" name="confirmar-senha" value={dados.confirmar_senha} onChange={handleChange} placeholder="Confirme sua senha" />
                        </div>

                        <button type="button" className="back-step" onClick={backStep}>Voltar</button>
                        <button type="submit" className="btn-submit">Enviar</button>
                    </form>
                )}
            </div>
        </>
    )
}

export default CadastroPessoaJuridica