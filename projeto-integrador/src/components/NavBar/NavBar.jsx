import "./NavBar.css"
import Logo_username from "../../assets/Logo_username.png"
import logo from "../../assets/logo.png";


const NavBar = () => {
  return (
    <div>
      <nav className="nav-dashboard">
        <div className="nav-left">
          <img src={logo} alt="Logo Sentinela" className="logo-nav" />
        </div>

        <div className="nav-principal">
          <div className="nav-center">
            <a href="#" className="nav-link active">
              Projetos
            </a>
            <a href="#" className="nav-link">
              Sobre o projeto
            </a>
            <a href="#" className="nav-link">
              Planos
            </a>
          </div>

          <div className="nav-right">
            <span className="nav-username">Nome</span>
            <div className="nav-profile-icon">
              <img
                src={Logo_username}
                alt="Logo username"
                className="logo-username"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
