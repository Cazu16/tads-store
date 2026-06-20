import { Link } from "react-router-dom";

function NaoEncontrado() {
  return (
    <main>

      <h1>404</h1>

      <h2>
        Página não encontrada
      </h2>

      <Link to="/">
        Voltar para a loja
      </Link>

    </main>
  );
}

export default NaoEncontrado;