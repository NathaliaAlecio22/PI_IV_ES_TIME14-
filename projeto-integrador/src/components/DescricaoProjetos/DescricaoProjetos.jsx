import Delete from "../../assets/Delete.png"
import Edit from "../../assets/Edit.png"
import "./DescricaoProjetos.css"


const DescricaoProjetos = () => {
  return (
    <main className="container-conteudo">
      <h2 className="titulo-conteudo">Mapeamento Parque Central</h2>

      <div className="descricao">
        <h3 className="titulo-descricao">Descricao do Projeto</h3>
        <p className="paragrafo-descricao">
          Inventario completo das arvoes do Parque central
        </p>
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
  );
};

export default DescricaoProjetos;
