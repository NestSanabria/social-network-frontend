// src/components/layout/public/NavPub.jsx
import { NavLink } from "react-router-dom";

export const NavPub = () => {
  return (
    <nav className="navbar__container-lists">
      <ul className="public-menu__list">
        <li className="public-menu__item">
          <NavLink to="/login" className="public-menu__link">
            <i className="fa-solid fa-user"></i>
            <span className="public-menu__title">Login</span>
          </NavLink>
        </li>

        <li className="public-menu__item">
          <NavLink to="/registro" className="public-menu__link">
            <i className="fa-solid fa-users"></i>
            <span className="public-menu__title">Registro</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
