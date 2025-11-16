import { useState } from "react";
import Projetos from "../Projetos/Projetos";
import DescricaoProjetos from "../DescricaoProjetos/DescricaoProjetos";
import "./Main.css";

const Main = () => {
    const [projetoSelecionado, setProjetoSelecionado] = useState(null);

    return (
        <div className="dashboard-wrapper">
            <Projetos onSelectProjeto={setProjetoSelecionado} />
            <DescricaoProjetos projetoId={projetoSelecionado} />
        </div>
    );
};

export default Main;
