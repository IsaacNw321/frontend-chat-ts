import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

function Navigation() {
  const [menuActive, setMenuActive] = useState(false);
  const toggleMenu = () => {
    setMenuActive(!menuActive);
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
    <li>
      <Link to="/login">Iniciar Sesion</Link>
    </li>
</ul>
    </nav>
  );
}

export default Navigation;