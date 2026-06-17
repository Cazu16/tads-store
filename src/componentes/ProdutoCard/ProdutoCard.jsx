import Botao from "../Botao/Botao.jsx";

function ProdutoCard(props) {
  return (
    <div className="card">

      <img 
        src={props.thumbnail} 
        alt={props.title}
        className="imagem-produto"
      />

      <h3>{props.title}</h3>

      <p>R$ {props.price}</p>

      <Botao texto="Comprar" />

    </div>
  );
}

export default ProdutoCard;