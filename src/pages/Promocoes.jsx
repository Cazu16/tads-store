import { useState, useEffect } from "react";
import ProdutoCard from "../componentes/ProdutoCard/ProdutoCard";

function Promocoes() {

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {

    fetch("https://dummyjson.com/products?limit=12")
      .then((resposta) => resposta.json())
      .then((dados) => {

        // Produtos escolhidos para promoção
        const produtosPromocao = dados.products.filter(
          (produto) =>
            produto.id === 1 ||
            produto.id === 3 ||
            produto.id === 5 ||
            produto.id === 8
        );

        setProdutos(produtosPromocao);

      });

  }, []);


  return (
    <main className="vitrine">

      <h2>
        🔥 Produtos em Promoção
      </h2>


      <div className="cards">

        {produtos.map((produto) => (

          <ProdutoCard

            key={produto.id}

            id={produto.id}

            title={produto.title}

            price={produto.price}

            thumbnail={produto.thumbnail}

          />

        ))}

      </div>

    </main>
  );
}


export default Promocoes;