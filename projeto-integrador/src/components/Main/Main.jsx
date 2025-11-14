import Projetos from "../Projetos/Projetos.jsx";
import DescricaoProjetos from "../DescricaoProjetos/DescricaoProjetos.jsx";
import "./Main.css";

const Main = () => {
  return (
    <div className="dashboard-central">
      <Projetos />
      <DescricaoProjetos />
    </div>
  );
};

export default Main;
