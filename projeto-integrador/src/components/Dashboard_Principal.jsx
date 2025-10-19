import logo from "../assets/logo.png";
import Logo_username from "../assets/Logo_username.png"
import Delete from "../assets/Delete.png"
import Edit from "../assets/Edit.png"


const Dashboard_Principal = () => {
    return(
        <>
            <nav className="nav-dashboard">
                <div className="nav-left">
                    <img src={logo} alt="Logo Sentinela" className="logo-nav"/>
                </div>
                


            <div className="nav-principal"> 
                <div className="nav-center">
                    <a href="#" className="nav-link active">Projetos</a>
                    <a href="#" className="nav-link">Sobre o projeto</a>
                    <a href="#" className="nav-link">Planos</a>
                </div>




                <div className="nav-right">
                    <span className="nav-username">Nome</span>
                    <div className="nav-profile-icon">
                        <img src={Logo_username} alt="Logo username" className="logo-username"/>
                    </div>

                </div>


            </div>

            </nav>

            <div className="dashboard-central">

                <aside className="central-projetos">
                    
                    <h2 className="projetos-titulo">Projetos</h2>

                    <ul className="lista-projetos">
                        <li className="projeto-item active"> 
                            <a href="#" className="projeto-nome">
                                Mapeamento
                                Parque central
                            </a>

                            <div className="projeto-acoes">
                                <img src={Edit} alt="edit" className="icon-edit"/>
                                <img src={Delete} alt="Delete" className="icon-delete"/>
                            </div>
                        </li> 


                        <li className="projeto-item active"> 
                            <a href="#" className="projeto-nome">
                                Mapeamento
                                Parque central
                            </a>

                            <div className="projeto-acoes">
                                <img src={Edit} alt="edit" className="icon-edit"/>
                                <img src={Delete} alt="Delete" className="icon-delete"/>
                            </div>
                        </li>  


                        <li className="projeto-item active"> 
                            <a href="#" className="projeto-nome">
                                Mapeamento
                                Parque central
                            </a>

                            <div className="projeto-acoes">
                                <img src={Edit} alt="edit" className="icon-edit"/>
                                <img src={Delete} alt="Delete" className="icon-delete"/>
                            </div>
                        </li>  


                        <li className="projeto-item active"> 
                            <a href="#" className="projeto-nome">
                                Mapeamento
                                Parque central
                            </a>

                            <div className="projeto-acoes">
                                <img src={Edit} alt="edit" className="icon-edit"/>
                                <img src={Delete} alt="Delete" className="icon-delete"/>
                            </div>
                        </li>  
                        
                          

                    </ul>
                </aside>

                <main className="container-conteudo">
                    <h2 className="titulo-conteudo">Mapeamento Parque Central</h2>

                    <div className="descricao">
                        <h3 className="titulo-descricao">Descricao do Projeto</h3>
                        <p className="paragrafo-descricao">Inventario completo das arvoes do Parque central</p>

                    </div>

                    <div className="data-criacao">
                        <h3 className="titulo-data-criacao">Data de Criacao</h3>
                        <p className="data">04/09/2025</p>
                    </div>



                    <h2 className="titulo-arvores-cadastradas">Árvores Cadastradas</h2>

                    <button className="botao-adicionar-arvore">Adicionar Árvore</button>

                    <div className="tabela-arvores">
        

                        <div className="tabela-cabecalho">
                            <span className="coluna-cabecalho nome-popular">Nome Popular</span>
                            <span className="coluna-cabecalho especie">Espécie</span>
                            <span className="coluna-cabecalho localizacoes">Localizações</span>
                            <span className="coluna-cabecalho acoes">Ações</span>
                        </div>
                        

                        <div className="tabela-linha">
                            <span className="nome-popular">Ipê Amarelo</span>
                            <span className="especie">Handroanthus Impetiginosus</span>
                            <span className="localizacoes">Área de lazer</span>

                            <span className="acoes">
                                <img src={Edit} alt="Editar" className="icon-edit-arvore" />
                                <img src={Delete} alt="Deletar" className="icon-delete-arvore" />
                            </span>
                        </div>
                        

                    </div>

                </main>
            </div>
        </>
    )
}

export default Dashboard_Principal;