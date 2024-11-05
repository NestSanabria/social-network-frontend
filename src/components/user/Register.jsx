import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";

export const Register = () => {
  // Usamos el hook personalizado useForm para cargar los datos del formulario
  const { form, changed } = useForm({});

  // Estado para mostrar resultado del registro del usuario
  const [saved, setSaved] = useState("not sended");

  // Estado para manejar el mensaje de "Conectando"
  const [loading, setLoading] = useState(false);

  // Hook para redirigir
  const navigate = useNavigate();

  // Guardar un usuario en la BD
  const saveUser = async (e) => {
    // Prevenir que se actualice la pantalla
    e.preventDefault();

    // Activar estado de carga
    setLoading(true);

    // Obtener los datos del formulario
    let newUser = form;

    try {
      // Petición a la API del Backend para guardar usuario en la BD
      const request = await fetch(Global.url + "user/register", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Obtener la información retornada por la request
      const data = await request.json();

      // Desactivar estado de carga cuando termine la solicitud
      setLoading(false);

      // Verificar si el estado de la respuesta del backend es "created"
      if (data.status === "created") {
        setSaved("saved");

        // Mostrar modal de éxito
        Swal.fire({
          title: '¡Usuario registrado correctamente!',
          icon: 'success',
          confirmButtonText: 'Continuar',
        }).then(() => {
          // Redirigir después de cerrar el modal
          navigate('/login');
        });

      } else {
        setSaved("error");

        // Mostrar modal de error
        Swal.fire({
          title: '¡El usuario no se ha registrado!',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente',
        });
      }
    } catch (error) {
      // En caso de error en la solicitud
      setLoading(false);
      setSaved("error");
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div className="public__layou">
      <div className="public__auth-form-container">
        <form className="public__auth-form" onSubmit={saveUser}>
          <h1 className="public__auth-title">Registro</h1>
          <div className="public__auth-alert-container">
            {saved === "saved" && (
              <strong className="public__auth-alert public__auth-alert-success">
                ¡Usuario registrado correctamente!
              </strong>
            )}
            {saved === "error" && (
              <strong className="public__auth-alert public__auth-alert-danger">
                ¡El usuario no se ha registrado!
              </strong>
            )}
          </div>

          {/* Mostrar el mensaje "Conectando..." mientras se está en proceso */}
          {loading && (
            <div className="public__auth-alert public__auth-alert-info">
              Conectando...
            </div>
          )}

          <div className="public__auth-form-group">
            <label htmlFor="name" className="public__auth-label">Nombres</label>
            <input type="text" name="name" required onChange={changed} className="public__auth-input" />
          </div>
          <div className="public__auth-form-group">
            <label htmlFor="last_name" className="public__auth-label">Apellidos</label>
            <input type="text" name="last_name" required onChange={changed} className="public__auth-input" />
          </div>
          <div className="public__auth-form-group">
            <label htmlFor="nick" className="public__auth-label">Nick</label>
            <input type="text" name="nick" required onChange={changed} className="public__auth-input" />
          </div>
          <div className="public__auth-form-group">
            <label htmlFor="email" className="public__auth-label">Correo Electrónico</label>
            <input type="email" name="email" required onChange={changed} className="public__auth-input" />
          </div>
          <div className="public__auth-form-group">
            <label htmlFor="password" className="public__auth-label">Contraseña</label>
            <input type="password" name="password" required onChange={changed} className="public__auth-input" />
          </div>

          {/* Deshabilitar el botón mientras se está cargando */}
          <input
            type="submit"
            value={loading ? "Conectando..." : "Regístrate"}
            className="public__auth-btn"
            disabled={loading}
          />
        </form>

        <div className="public__auth-link-container">
          <p>¿Ya estás registrado? <NavLink to="/login" className="public__auth-link">Inicia sesión</NavLink></p>
        </div>
      </div>
    </div>
  );
};
