// src/components/user/UserPublications.jsx
import { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../helpers/Global';
import avatar from '../../assets/img/user.png';
import AuthContext from '../../context/AuthProvider';

export const UserPublications = () => {
  const { userId } = useParams();
  const { decrementPublications } = useContext(AuthContext);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPublications = useCallback(async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${Global.url}publication/publications-user/${userId}?limit=${visibleCount}`, {
        headers: {
          Authorization: token,
        },
        params: {
          page: currentPage,
        },
      });

      if (response.data.status === 'success') {
        setPublications(response.data.publications);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching publications:", err);
      setError('Error fetching publications: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, [userId, visibleCount, currentPage]);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  const deletePublication = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`${Global.url}publication/delete-publication/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === 'success') {
        setPublications(publications.filter(pub => pub._id !== id));
        decrementPublications();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error al borrar la publicación: ' + (err.response?.data?.message || err.message));
      console.error("Error al borrar la publicación:", err);
    }
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setVisibleCount(prevCount => prevCount + 5);
  };

  if (loading) {
    return <div>Cargando publicaciones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="private__layout-content user-publications-container"> {/* Contenedor principal */}
      <header className="user-publications-header">
        <h1 className="user-publications-title">Mis Publicaciones</h1>
      </header>

      <div className="user-publications-list">
        {publications.length === 0 ? (
          <div>No hay publicaciones para mostrar.</div>
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
                      {new Date(publication.created_at).toLocaleString()}
                    </a>
                  </div>
                </div>

                <div className="user-publication-body">
                  <h4 className="user-publication-content">{publication.text}</h4>
                </div>

                <div className="user-publication-footer">
                  <button onClick={() => deletePublication(publication._id)} className="btn-delete">
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {publications.length === visibleCount && (
        <div className="user-publications-load-more">
          <button onClick={loadMore} className="content__btn-more-post">Ver más publicaciones</button>
        </div>
      )}
    </div>
  );
};
