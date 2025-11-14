import Delete from "../../assets/Delete.png"
import Edit from "../../assets/Edit.png"
import "./Projetos.css"


const Projetos = () => {
  return (
    <aside className="central-projetos">
      <h2 className="projetos-titulo">Projetos</h2>

      <ul className="lista-projetos">
        <li className="projeto-item active">
          <a href="#" className="projeto-nome">
            Mapeamento Parque central
          </a>

          <div className="projeto-acoes">
            <img src={Edit} alt="edit" className="icon-edit" />
            <img src={Delete} alt="Delete" className="icon-delete" />
          </div>
        </li>

        <li className="projeto-item active">
          <a href="#" className="projeto-nome">
            Mapeamento Parque central
          </a>

          <div className="projeto-acoes">
            <img src={Edit} alt="edit" className="icon-edit" />
            <img src={Delete} alt="Delete" className="icon-delete" />
          </div>
        </li>

        <li className="projeto-item active">
          <a href="#" className="projeto-nome">
            Mapeamento Parque central
          </a>

          <div className="projeto-acoes">
            <img src={Edit} alt="edit" className="icon-edit" />
            <img src={Delete} alt="Delete" className="icon-delete" />
          </div>
        </li>

        <li className="projeto-item active">
          <a href="#" className="projeto-nome">
            Mapeamento Parque central
          </a>

          <div className="projeto-acoes">
            <img src={Edit} alt="edit" className="icon-edit" />
            <img sr={Delete} alt="Delete" className="icon-delete" />
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Projetos;
