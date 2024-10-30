// src/components/user/People.jsx
import { Global } from "../../helpers/Global";
import { useEffect, useState } from 'react';
import useAuth from "../../hooks/useAuth";
import avatar from '../../assets/img/user.png';
import axios from 'axios';

export const People = () => {
  const token = localStorage.getItem("token");
  const { auth, incrementFollowing, decrementFollowing } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Página actual
  const [hasMore, setHasMore] = useState(true); // Indica si hay más usuarios
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (currentPage) => {
    try {
      const response = await axios.get(`${Global.url}user/list/${currentPage}`, {
        headers: {
          Authorization: token,
        },
        params: { limit: 5 }, // Límite de usuarios por solicitud
      });

      if (response.data.status === 'success') {
        const filteredUsers = response.data.users.filter(user => user._id !== auth._id);
        
        setUsers((prev) => [...prev, ...filteredUsers]); // Agregamos nuevos usuarios
        setFollowing(response.data.users_following); // Actualizamos la lista de usuarios seguidos
        setHasMore(currentPage < response.data.totalPages); // Actualizamos si hay más usuarios
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError('Error fetching users: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const follow = async (userId) => {
    const request = await fetch(Global.url + "follow/follow", {
      method: "POST",
      body: JSON.stringify({ followed_user: userId }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    const data = await request.json();
    if (data.status === "success") {
      setFollowing([...following, userId]);
      incrementFollowing();
    }
  };

  const unfollow = async (userId) => {
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    const data = await request.json();
    if (data.status === "success") {
      const updatedFollowing = following.filter(followingUserId => userId !== followingUserId);
      setFollowing(updatedFollowing);
      decrementFollowing();
    }
  };

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1); // Aumentamos la página actual
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Usuarios</h1>
      </header>

      <div className="people__list">
        {users.length === 0 ? (
          <div>No hay usuarios para mostrar.</div>
        ) : (
          users.map((user) => (
            <article className="people__card" key={user._id}>
              <div className="people__container">
                <div className="people__image">
                  <div className="people__avatar">
                    <div className="people__avatar-container">
                      {user.image && user.image !== "default.png" ? (
                        <img src={`${Global.url}user/avatar/${user.image}`} className="people__avatar-img" alt="Foto de perfil" />
                      ) : (
                        <img src={avatar} className="people__avatar-img" alt="Foto de perfil" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="people__info">
                  <div className="people__user-info">
                    <a href="#" className="people__name">{user.name} {user.last_name}</a>
                    <p className="people__bio">{user.bio}</p>
                  </div>
                </div>
                <div className="people__buttons">
                  {user._id !== auth._id && (
                    <div>
                      {!following.includes(user._id) ? (
                        <button className="people__button people__button--follow" onClick={() => follow(user._id)}>Seguir</button>
                      ) : (
                        <button className="post__button" onClick={() => unfollow(user._id)}>Dejar de Seguir</button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {hasMore && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={loadMore}>Ver más usuarios</button>
        </div>
      )}
    </>
  );
};