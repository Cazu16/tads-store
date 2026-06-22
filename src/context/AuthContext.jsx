import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();


export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(null);


 function login(nome, senha) {

  // Login simulado
  if (senha === "1234") {

    setUsuario({
      nome: nome
    });

    return true;
  }

  return false;
}

  function logout() {
    setUsuario(null);
  }


  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// Hook para acessar o contexto
export function useAuth() {
  return useContext(AuthContext);
}