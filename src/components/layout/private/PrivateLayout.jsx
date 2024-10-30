// src/components/layout/private/PrivateLayout.jsx
import { Navigate, Outlet } from "react-router-dom";
import { HeaderPriv } from "./HeaderPriv";
import { Sidebar } from "./Sidebar";
import useAuth from '../../../hooks/useAuth';

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <div className="private__layout">
        {/* Cabecera y navegación */}
        <HeaderPriv style={{ gridArea: 'nav' }} />

        {/* Contenedor principal que ocupa el espacio central */}
        <section className="private__layout-content" style={{ gridArea: 'content' }}>
          {/* Contenido Principal */}
          <main className="main-content">
            {auth._id ? <Outlet /> : <Navigate to="/login" />}
          </main>
        </section>

        {/* Barra Lateral en su propio contenedor */}
        <aside className="layout__aside">
          <Sidebar />
        </aside>
      </div>
    );
  }
};
