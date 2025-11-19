import { useState } from "react";
import Projetos from "../Projetos/Projetos";
import DescricaoProjetos from "../DescricaoProjetos/DescricaoProjetos";
import ChatBot from "../ChatBot/ChatBot"; // 👈 IMPORTAR CHATBOT
import "./Main.css";

const Main = () => {
    const [projetoSelecionado, setProjetoSelecionado] = useState(null);

    return (
        <>
            <div className="main-container">
                <Projetos onSelectProjeto={setProjetoSelecionado} />
                <DescricaoProjetos projetoId={projetoSelecionado} />
            </div>
        </>
    );
};

export default Main;
