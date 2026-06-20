import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detalhe() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((dados) => setProduto(dados));
  }, [id]);

  if (!produto) {
    return (
      <h2 className="carregando">
        Carregando produto...
      </h2>
    );
  }

  return (
    <main className="detalhe">

      <div className="detalhe-card">

        <img
          className="detalhe-imagem"
          src={produto.thumbnail}
          alt={produto.title}
        />

        <div className="detalhe-info">

          <h2>
            {produto.title}
          </h2>

          <p className="descricao">
            {produto.description}
          </p>

          <h3 className="preco">
            R$ {produto.price}
          </h3>

          <p className="categoria">
            Categoria: {produto.category}
          </p>

          <Link className="voltar" to="/">
            ← Voltar para a loja
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Detalhe;