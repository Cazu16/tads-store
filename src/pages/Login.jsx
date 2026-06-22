import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();


  function entrar(evento) {

    evento.preventDefault();


    const sucesso = login(nome, senha);


    if (sucesso) {

      navigate("/minha-conta");

    } else {

      setErro("Usuário ou senha inválidos.");

    }

  }


  return (
    <main className="login">

      <h2>Entrar na TADS Store</h2>


      <form onSubmit={entrar}>

        <input
          type="text"
          placeholder="Usuário"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />


        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />


   <button 
  type="submit"
  className="botao"
>
  Entrar
</button>

        {erro && (
          <p className="erro-login">
            {erro}
          </p>
        )}

      </form>

    </main>
  );
}


export default Login;