import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Dashboard_Principal from "./Pages/Dashboard_Principal";
import Tela_CadastroPessoaFisica from "./Pages/Tela_CadastroPessoaFisica";
import Tela_CadastroPessoaJuridica from "./Pages/Tela_CadastroPessoaJuridica";
import Tela_Perfilusuario from "./Pages/Tela_PerfilUsuario";
import Tela_SobreProjeto from "./Pages/Tela_SobreProjeto";
import Tela_Login from "./Pages/Tela_Login";

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard_Principal />} />
                <Route path="/cadastro-juridica" element={<Tela_CadastroPessoaJuridica />} />
                <Route path="/perfil" element={<Tela_Perfilusuario />} />
                <Route path="/sobre-projeto" element={<Tela_SobreProjeto />} />
                <Route path="/cadastro-fisica" element={<Tela_CadastroPessoaFisica />} />
                <Route path="/login" element={<Tela_Login />} />

            </Routes>
        </Router>
    )
}

export default App;