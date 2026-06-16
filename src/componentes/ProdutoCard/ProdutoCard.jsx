import Botao from "../Botao/Botao.jsx";

function ProdutoCard(props) {
  return (
    <div className="card">

      <span className="selo">
        {props.selo}
      </span>

      <h3>{props.nome}</h3>

      <p>{props.preco}</p>

      <Botao texto="Comprar" />

    </div>
  );
}

export default ProdutoCard;