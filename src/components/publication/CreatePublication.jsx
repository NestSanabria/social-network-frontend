// src/components/publication/CreatePublication.jsx
import { useState } from 'react';
import { Global } from '../../helpers/Global'; // Importa la configuración global (como la URL de la API)
import useAuth from '../../hooks/useAuth'; // Importa el hook useAuth para acceder a la información de autenticación
import PropTypes from 'prop-types'; // Importa PropTypes

// Define el componente CreatePublication, que recibe una función como prop
const CreatePublication = ({ onPublicationCreated }) => {
  const { auth } = useAuth(); // Obtiene la información de autenticación del hook useAuth
  const [postText, setPostText] = useState(''); // Define un estado local para almacenar el texto de la publicación

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const token = localStorage.getItem('token'); // Obtiene el token de autenticación del almacenamiento local

    try {
      // Realiza una solicitud POST para crear una nueva publicación
      const response = await fetch(`${Global.url}publication/new-publication`, {
        method: 'POST', // Método de la solicitud
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido
          'Authorization': token, // Agrega el token a los encabezados
        },
        body: JSON.stringify({ text: postText }), // Convierte el texto de la publicación a JSON
      });

      // Verificar si la respuesta no fue exitosa
      if (!response.ok) {
        // Si hay un error, obtiene el mensaje de error
        const errorMessage = await response.text();
        console.error('Error en la petición:', errorMessage);
        return;
      }

      const data = await response.json(); // Convierte la respuesta a un objeto JSON

      // Verifica si la publicación se creó exitosamente
      if (data.status === 'success') {
        console.log('Publicación creada:', data); // Muestra los datos de la nueva publicación
        setPostText(''); // Resetea el campo de texto
        onPublicationCreated(); // Llama a la función para notificar que se ha creado una publicación
      } else {
        // Si hay un error en la creación de la publicación, muestra el mensaje de error
        console.error('Error al crear la publicación:', data.message);
      }
    } catch (error) {
      // Si hay un error en la solicitud, lo muestra en la consola
      console.error('Error en la petición:', error);
    }
  };

  // Renderiza el formulario para crear una nueva publicación
  return (
    <form className="container-form__form-post" onSubmit={handleSubmit}>
      <div className="form-post__inputs">
        <label className="form-post__label">
          {auth.username}¿qué quieres compartir hoy? {/* Suponiendo que auth tiene un username */}
        </label>
        <textarea
          name="post"
          className="form-post__textarea"
          value={postText} // Valor del textarea vinculado al estado
          onChange={(e) => setPostText(e.target.value)} // Actualiza el estado al cambiar el texto
        ></textarea>
      </div>
      <input type="submit" value="Enviar" className="form-post__btn-submit" />
    </form>
  );
};

// Define las PropTypes para el componente
CreatePublication.propTypes = {
  onPublicationCreated: PropTypes.func.isRequired, // Asegúrate de que sea una función requerida
};

export default CreatePublication;
