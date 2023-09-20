import { Link } from "react-router-dom";
import "../Footer/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="logo">IGNITE MOTORS</div>
      <nav className="footer-nav">
        <Link to="/About">Acerca de</Link>
        <Link to="/Home">Inicio</Link>
        {/* <Link to="/Ayuda">Ayuda</Link>
        <Link to="/"> </Link> */}
      </nav>
    </footer>
  );
}

export default Footer;
