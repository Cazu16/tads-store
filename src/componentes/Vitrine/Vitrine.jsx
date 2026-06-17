import { useState, useEffect } from "react";
import ProdutoCard from "../ProdutoCard/ProdutoCard.jsx";

function Vitrine() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados novos
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");

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

  // Filtra os produtos pelo nome e categoria
  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeBusca = produto.title
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeCategoria =
      categoria === "" || produto.category === categoria;

    return correspondeBusca && correspondeCategoria;
  });

  if (carregando) {
    return <p>Carregando produtos...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <main className="vitrine">
      <h2>Nossos Produtos</h2>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Pesquisar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {/* Filtro de categoria */}
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Todas as categorias</option>

        {[...new Set(produtos.map((p) => p.category))].map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="cards">
        {produtosFiltrados.map((produto) => (
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