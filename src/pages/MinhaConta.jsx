import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function MinhaConta() {

  const { usuario, logout } = useAuth();

  const navigate = useNavigate();


  function sair() {

    logout();

    navigate("/login");

  }


  return (
    <main className="minha-conta">

      <h2>Minha Conta</h2>


      <p>
        Olá, {usuario.nome}!
      </p>


      <p>
        Você está logado na TADS Store do Carlos.
      </p>


      <button 
  className="botao"
  onClick={sair}
>
  Sair
</button>

    </main>
  );

}


export default MinhaConta;