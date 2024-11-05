import { NavLink } from 'react-router-dom';
import avatar from '../../../assets/img/user.png';
import { Global } from '../../../helpers/Global';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import logo from "../../../assets/img/logo.png"

export const NavPriv = () => {
  const { auth } = useAuth();
  
  // Estado para manejar la visibilidad del menú en pantallas pequeñas
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="layout__navbar">
      {/* Logo de la barra de navegación */}
      <div className="navbar__title">
        <img src={logo} className="logo" alt="brand" /> {/* Logo de la aplicación */}
      </div>

      {/* Botón hamburguesa (solo visible en pantallas pequeñas) */}
      <button className="navbar-toggler" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Lista de enlaces de navegación (se muestra solo cuando isMenuOpen es true) */}
      <ul className={`container-lists__menu-list ${isMenuOpen ? 'show' : ''}`}>
        {/* Enlaces de la parte izquierda */}
        <li className="menu-list__item">
          <NavLink to="/rsocial" className="menu-list__link">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title">Inicio</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/rsocial/feed-global" className="menu-list__link">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title">Feed Global</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/rsocial/feed" className="menu-list__link">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title">Feed</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/rsocial/Usuarios" className="menu-list__link">
            <i className="fa-solid fa-users"></i>
            <span className="menu-list__title">Usuarios</span>
          </NavLink>
        </li>

        {/* Enlaces de la parte derecha (usuario, ajustes, cerrar sesión) */}
        <li className="menu-list__item">
          <NavLink to={`/rsocial/mis-publicaciones/${auth._id}`} className="menu-list__link">
            <span className="menu-list__name">{auth.nick}</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/rsocial/ajustes" className="menu-list__link">
            <i className="fa-solid fa-gear"></i>
            <span className="menu-list__name"> Ajustes</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/rsocial/logout" className="menu-list__link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="menu-list__name"> Cerrar sesión</span>
          </NavLink>
        </li>

        {/* Avatar */}
        <li className="menu-list__item">
          <div className="img-avatar-nav">
            {auth.image !== "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil" />}
            {auth.image === "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
          </div>
        </li>
      </ul>
    </nav>
  );
};
