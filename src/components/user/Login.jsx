// src/components/user/Login.jsx
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Login = () => {
  // Estado para obtener los datos desde el formulario
  const { form, changed } = useForm({});

  // Estado para validar si el usuario se identificó correctamente
  const [logged, setLogged] = useState("not_logged");

  // Estado para manejar el mensaje de "Conectando"
  const [loading, setLoading] = useState(false);

  // Estado para usar useAuth y setear los valores del usuario autenticado en el Provider automáticamente
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    // Prevenir que se actualice la pantalla
    e.preventDefault();

    // Mostrar el mensaje de "Conectando" cuando comienza la solicitud
    setLoading(true);

    // Datos del formulario
    let userToLogin = form;

    try {
      // Petición al backend
      const request = await fetch(Global.url + "user/login", {
        method: "POST",
        body: JSON.stringify(userToLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Obtener la información retornada por la request
      const data = await request.json();

      // Ocultar el mensaje de "Conectando" cuando termina la solicitud
      setLoading(false);

      if (data.status === "success") {
        // Persistir los datos en el navegador guardando en el localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setLogged("logged");

        // Setear los datos del usuario en el Auth
        setAuth(data.user);

        // Redirección de 1 segundo
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setLogged("error");
      }
    } catch (error) {
      // En caso de error en la solicitud
      setLoading(false);
      setLogged("error");
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="public__layou">
      <div className="public__auth-form-container">
        <h1 className="public__auth-title">Iniciar sesión</h1>

        <div className="public__auth-alert-container">
          {logged === "logged" && (
            <strong className="public__auth-alert public__auth-alert-success">
              ¡Usuario identificado correctamente!
            </strong>
          )}
          {logged === "error" && (
            <strong className="public__auth-alert public__auth-alert-danger">
              ¡El usuario no se ha identificado!
            </strong>
          )}
        </div>

        {/* Mostrar mensaje de "Conectando" mientras se está en proceso de login */}
        {loading && (
          <div className="public__auth-alert public__auth-alert-info">
            Conectando...
          </div>
        )}

        <form className="form-login" onSubmit={loginUser}>
          <div className="public__auth-form-group">
            <label htmlFor="email" className="public__auth-label">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              required
              onChange={changed}
              className="public__auth-input"
            />
          </div>

          <div className="public__auth-form-group">
            <label htmlFor="password" className="public__auth-label">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              onChange={changed}
              className="public__auth-input"
            />
          </div>

          <button type="submit" className="public__auth-btn">
            Identifícate
          </button>
        </form>

        <div className="public__auth-link-container">
          <p>
            ¿No tienes cuenta?{" "}
            <NavLink to="/registro" className="public__auth-link">
              Regístrate
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
