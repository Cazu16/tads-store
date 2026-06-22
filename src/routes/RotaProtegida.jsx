import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


function RotaProtegida({ children }) {

  const { usuario } = useAuth();


  if (!usuario) {
    return <Navigate to="/login" />;
  }


  return children;
}


export default RotaProtegida;