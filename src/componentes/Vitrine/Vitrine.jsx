import { useState, useEffect } from "react";
import ProdutoCard from "../ProdutoCard/ProdutoCard.jsx";

function Vitrine() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=12")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setProdutos(dados.products);
        setCarregando(false);
      })
      .catch(() => {
        setErro("Erro ao carregar os produtos.");
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <p>Carregando produtos...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <main className="vitrine">
      <h2>Nossos Produtos</h2>

      <div className="cards">
        {produtos.map((produto) => (
          <ProdutoCard
            key={produto.id}
            title={produto.title}
            price={produto.price}
            thumbnail={produto.thumbnail}
          />
        ))}
      </div>
    </main>
  );
}

export default Vitrine;