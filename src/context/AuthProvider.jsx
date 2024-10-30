// src/context/AuthProvider.jsx
import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from "prop-types"; // Para validar tipos de propiedades
import { Global } from "../helpers/Global"; // Importa configuración global (URL base de la API)

// Crea un contexto para la autenticación
const AuthContext = createContext();

// Define el proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información de autenticación del usuario
  const [auth, setAuth] = useState({});
  
  // Estado para almacenar los contadores de seguidores, seguidos y publicaciones
  const [counters, setCounters] = useState({
    following: 0,
    followers: 0,
    publications: 0,
  });

  // Estado para manejar la carga de datos
  const [loading, setLoading] = useState(true);

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    authUser(); // Llama a la función para autenticar al usuario
  }, []); // Dependencias vacías indican que se ejecuta solo al montar

  // Función asíncrona para autenticar al usuario
  const authUser = async () => {
    // Obtiene el token y la información del usuario del almacenamiento local
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Verifica si no hay token o usuario
    if (!token || !user) {
      setLoading(false); // Cambia el estado de carga a falso
      return; // Si no hay token o usuario, no se hace nada
    }

    // Convierte la cadena JSON del usuario en un objeto de JavaScript
    const userObj = JSON.parse(user);
    const userId = userObj.id; // Obtiene el ID del usuario

    try {
      // Solicita el perfil del usuario
      const request = await fetch(Global.url + "user/profile/" + userId, {
        method: "GET", // Método de solicitud
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
          "Authorization": token, // Agrega el token a los encabezados
        },
      });

      // Verifica si la solicitud fue exitosa
      if (!request.ok) throw new Error("Error al obtener el perfil");

      const data = await request.json(); // Convierte la respuesta a JSON

      // Solicita los contadores del usuario
      const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
        method: "GET", // Método de solicitud
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
          "Authorization": token, // Agrega el token a los encabezados
        },
      });

      // Verifica si la solicitud de contadores fue exitosa
      if (!requestCounters.ok) throw new Error("Error al obtener los contadores");

      const dataCounters = await requestCounters.json(); // Convierte la respuesta a JSON

      // Actualiza el estado con los datos del usuario y los contadores
      setAuth(data.user);
      setCounters(dataCounters);
    } catch (error) {
      console.error("Error al autenticar usuario:", error); // Muestra el error en la consola
      setAuth({}); // Limpia el estado de autenticación en caso de error
      setCounters({ following: 0, followers: 0, publications: 0 }); // Resetea los contadores
    } finally {
      setLoading(false); // Establece el estado de carga a falso al finalizar
    }
  };

  // Función para incrementar el contador de seguidos
  const incrementFollowing = () => {
    setCounters((prev) => ({ ...prev, following: prev.following + 1 })); // Incrementa el contador
  };

  // Función para decrementar el contador de seguidos
  const decrementFollowing = () => {
    setCounters((prev) => ({
      ...prev,
      following: Math.max(prev.following - 1, 0), // Evita que el contador sea negativo
    }));
  };

  // Función para incrementar el contador de seguidores
  const incrementFollowers = () => {
    setCounters((prev) => ({ ...prev, followers: prev.followers + 1 })); // Incrementa el contador
  };

  // Función para decrementar el contador de seguidores
  const decrementFollowers = () => {
    setCounters((prev) => ({
      ...prev,
      followers: Math.max(prev.followers - 1, 0), // Evita que el contador sea negativo
    }));
  };

  // Función para incrementar el contador de publicaciones
  const incrementPublications = () => {
    setCounters((prev) => ({ ...prev, publications: prev.publications + 1 })); // Incrementa el contador
  };

  // Función para decrementar el contador de publicaciones
  const decrementPublications = () => {
    setCounters((prev) => ({
      ...prev,
      publications: Math.max(prev.publications - 1, 0), // Evita que el contador sea negativo
    }));
  };

  // Retorna el contexto de autenticación con sus valores
  const value = useMemo(() => ({
    auth, // Información de autenticación del usuario
    setAuth, // Función para actualizar el estado de autenticación
    counters, // Contadores de seguidores, seguidos y publicaciones
    setCounters, // Función para actualizar los contadores
    loading, // Estado de carga
    incrementFollowing, // Función para incrementar seguidos
    decrementFollowing, // Función para decrementar seguidos
    incrementFollowers, // Función para incrementar seguidores
    decrementFollowers, // Función para decrementar seguidores
    incrementPublications, // Función para incrementar publicaciones
    decrementPublications, // Función para decrementar publicaciones
  }), [auth, counters, loading]); // Se recrea solo cuando cambian auth, counters o loading

  return (
    <AuthContext.Provider value={value}>
      {children} {/* Renderiza los componentes hijos envueltos por el proveedor */}
    </AuthContext.Provider>
  );
};

// Valida que el componente AuthProvider reciba hijos
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
