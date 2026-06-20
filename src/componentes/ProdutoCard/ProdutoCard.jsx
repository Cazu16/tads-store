import { Link } from "react-router-dom";
import Botao from "../Botao/Botao.jsx";

function ProdutoCard({ id, title, price, thumbnail }) {
  return (
    <div className="card">

      <img
        src={thumbnail}
        alt={title}
        className="imagem-produto"
      />

      <h3>{title}</h3>

      <p>R$ {price}</p>

      <Link to={`/produto/${id}`}>
        <Botao texto="Ver detalhes" />
      </Link>

    </div>
  );
}

export default ProdutoCard;