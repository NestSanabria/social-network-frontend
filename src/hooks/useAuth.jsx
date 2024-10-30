// srs/hooks/useAuth.jsx
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  // Carga el contexto de Auth
  const context = useContext(AuthContext);

  // Asegúrate de que el contexto no sea undefined
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }

  return context;
};

export default useAuth;
