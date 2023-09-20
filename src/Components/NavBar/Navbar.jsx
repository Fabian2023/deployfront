import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../NavBar/NavBar.css";
import { Link } from "react-router-dom";
import Favorites from "../Favorites/Favorites";

const Navbar = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    if (storedFullName) {
      setFullName(storedFullName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fullName");
    navigate("/");
    setFullName("");
    setIsLoggedIn(false);
  };

  return (
    <nav className="nav">
      <div className="divLogo">IGNITE MOTORS</div>
      <ul className="nav__menu">
        <li className="nav__item">
          <Link to="/home" className="nav__link nav__logout ">
            VEHICULOS
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/About" className="nav__link nav__logout ">
            NOSOTROS
          </Link>
        </li>
        {/* <li className="nav__item">
          <a to="/Favorites" className="nav__link nav__logout ">
            FAVORITOS
          </a>
        </li> */}
        {isLoggedIn && (
          <li className="nav__item">
            <Link to="/Form" className="nav__link nav__logout">
              VENDER VEHICULO
            </Link>
          </li>
        )}
        {isLoggedIn && localStorage.getItem("role") === "admin" && (
          <li className="nav__item nav__logout ">
            <Link to="/admin" className="nav__link">
              ADMINISTRADOR
            </Link>
          </li>
        )}
        <li className="nav__item">
          {fullName ? (
            <>
              <span className="nav__welcome">¡Bienvenido, {fullName}! </span>
              <button className="nav__logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <div className="nav__link-group ">
                <Link to="/registro" className="nav__link nav__logout ">
                  REGISTRATE
                </Link>
                <Link to="/Login" className="nav__link nav__logout">
                  INICIAR SESION
                </Link>
              </div>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
