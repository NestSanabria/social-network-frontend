// src/components/follow/Followers.jsx
import { Global } from "../../helpers/Global";
import { useEffect, useState } from 'react';
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import avatar from '../../assets/img/user.png';

export const Followers = () => {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const { incrementFollowing, decrementFollowing } = useAuth();
  const { auth: userAuth } = useAuth();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);

  const params = useParams();

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (nextPaginate = 1) => {
    try {
      const userId = params.userId;
      const response = await fetch(Global.url + "follow/followers/" + userId + "/" + nextPaginate, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      const data = await response.json();
      let cleanUsers = [];
      data.follows.forEach(follow => {
        cleanUsers = [...cleanUsers, follow.following_user];
      });
      data.users = cleanUsers;

      if (data.users && data.status === "success") {
        let newUsers = data.users;
        if (users.length >= 1) {
          newUsers = [...users, ...data.users];
        }
        setUsers(newUsers);
        setFollowing(data.users_following);

        if (users.length >= (data.total - 5)) {
          setMore(false);
        }
      }
    } catch (error) {
      console.error("Error en la petición al backend:", error);
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
      incrementFollowing(); // Incrementar el contador de seguidos
      // También puedes incrementar el contador de seguidores aquí si es aplicable
      // incrementFollowers(); 
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
      decrementFollowing(); // Decrementar el contador de seguidos
      // También puedes decrementar el contador de seguidores aquí si es aplicable
      // decrementFollowers(); 
    }
  };

  const nextPage = () => {
    const next = page + 1;
    setPage(next);
    getUsers(next);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <header className="content__header">
        <h1 className="content__title">Seguidores de {userAuth.name} {userAuth.last_name}</h1>
      </header>

      <div className="people__list">
        {users.length === 0 ? (
          <div>No hay seguidores para mostrar.</div>
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

      {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>Ver más personas</button>
        </div>
      )}
    </div>
  );
};