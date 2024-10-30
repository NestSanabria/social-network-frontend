// src/components/layout/private/Sidebar.jsx
import { Link } from 'react-router-dom';
import avatar from '../../../assets/img/user.png';
import { Global } from '../../../helpers/Global';
import useAuth from '../../../hooks/useAuth';
import CreatePublication from '../../publication/CreatePublication';

export const Sidebar = () => {
  const { auth, counters, incrementPublications } = useAuth();

  const handlePublicationCreated = () => {
    incrementPublications(); // Incrementa el contador de publicaciones
  };

  return (
    <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">Hola, {auth.name}</h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              <img 
                src={auth.image !== "default.png" ? Global.url + "user/avatar/" + auth.image : avatar} 
                className="container-avatar__img" 
                alt="Foto de perfil" 
              />
            </div>

            <div className="general-info__container-names">
              <a href="#" className="container-names__name">{auth.name} {auth.last_name}</a>
              <p className="container-names__nickname">{auth.nick}</p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link to={"siguiendo/" + auth._id} className="following__link">
                <span className="following__title">Siguiendo</span>
                <span className="following__number">{counters.following}</span>
              </Link>
            </div>
            <div className="stats__following">
              <Link to={"seguidores/" + auth._id} className="following__link">
                <span className="following__title">Seguidores</span>
                <span className="following__number">{counters.followers}</span>
              </Link>
            </div>
            <div className="stats__following">
              <Link to={`/rsocial/mis-publicaciones/${auth._id}`} className="following__link">
                <span className="following__title">Publicaciones</span>
                <span className="following__number">{counters.publications}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="aside__container-form">
          <CreatePublication onPublicationCreated={handlePublicationCreated} />
        </div>
      </div>
    </aside>
  );
};
