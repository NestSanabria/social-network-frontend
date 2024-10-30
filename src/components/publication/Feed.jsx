import { useEffect, useState } from 'react';
import axios from 'axios';
import { Global } from '../../helpers/Global';
import avatar from '../../assets/img/user.png';

export const Feed = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Página actual
  const [hasMore, setHasMore] = useState(true); // Indica si hay más publicaciones

  useEffect(() => {
    fetchPublications(page);
  }, [page]);

  const fetchPublications = async (currentPage) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${Global.url}publication/feed`, {
        headers: {
          Authorization: token,
        },
        params: { page: currentPage, limit: 5 }, // Enviamos los parámetros de paginación
      });

      if (response.data.status === 'success') {
        if (currentPage > 1) {
          setPublications((prev) => [...prev, ...response.data.publications]); // Agregamos nuevas publicaciones
        } else {
          setPublications(response.data.publications); // Inicializamos publicaciones
        }
        setHasMore(currentPage < response.data.pages); // Actualizamos si hay más publicaciones
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching publications:", err);
      setError('Error fetching publications: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1); // Aumentamos la página actual
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Cargando publicaciones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-publications-container"> {/* Contenedor principal */}
      <header className="user-publications-header">
        <h1 className="user-publications-title">Mi Red</h1>
      </header>

      <div className="user-publications-list">
        {publications.length === 0 ? (
          <div>No hay publicaciones para mostrar. Comienza a seguir a usuarios para ver su actividad.</div>
        ) : (
          publications.map((publication) => (
            <article className="user-publication-item" key={publication._id}>
              <div className="user-publication-container">
                <div className="user-publication-top">
                  <div className="user-publication-image">
                    <div className="avatar">
                      <div className="general-info__container-avatar">
                        {publication.user_id.image && publication.user_id.image !== "default.png" ? (
                          <img 
                            src={`${Global.url}user/avatar/${publication.user_id.image}`} 
                            className="container-avatar__img" 
                            alt="Foto de perfil" 
                          />
                        ) : (
                          <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="user-publication-info">
                    <a href="#" className="user-info__name">
                      {publication.user_id.name} {publication.user_id.last_name}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {formatDate(publication.created_at)}
                    </a>
                  </div>
                </div>

                <div className="user-publication-body">
                  <h4 className="user-publication-content">{publication.text}</h4>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {hasMore && (
        <div className="user-publications-load-more">
          <button className="content__btn-more-post" onClick={loadMore}>Ver más publicaciones</button>
        </div>
      )}
    </div> // Cierre del contenedor principal
  );
};