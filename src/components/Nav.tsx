import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";
import useAuth from "../hooks/useAuth"; 
function Navigation() {
  const [menuActive, setMenuActive] = useState(false);
  const { handleLogout} = useAuth()
   
  const { auth } = useAuth();
  const isLoggedIn = !!auth?.access_token;

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  
  const onLogout = () => {
    handleLogout();
    setMenuActive(false);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-brand">
        <Link to="/">Inicio</Link>
      </div>
      <button className="nav-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav-menu ${menuActive ? "active" : ""}`}>
          {isLoggedIn ?  <li> <Link to="/dashboard">Empezar a chatear</Link> </li> : null}  
        <li>
          {
            isLoggedIn ? 
            <button onClick={onLogout} className="button">
              Cerrar Sesión
            </button>
            :
            <Link to="/login" onClick={() => setMenuActive(false)}>
              Iniciar Sesión
            </Link>
          }
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;