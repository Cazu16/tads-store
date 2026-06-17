import { useState, useEffect } from "react";
import ProdutoCard from "../ProdutoCard/ProdutoCard.jsx";

function Vitrine() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados da pesquisa e categoria
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");

  // Busca os produtos na API quando o componente carrega
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

  // Filtra por nome e categoria
  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeBusca = produto.title
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeCategoria =
      categoria === "" || produto.category === categoria;

    return correspondeBusca && correspondeCategoria;
  });

  // Mensagem de carregamento
  if (carregando) {
    return <p>Carregando produtos...</p>;
  }

  // Mensagem de erro
  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <main className="vitrine">

      <h2>Nossos Produtos</h2>

      {/* Barra de pesquisa e filtro */}
      <div className="filtros">

        <div className="barra-busca">

          <span className="icone">🔎</span>

          <input
            type="text"
            placeholder="Pesquisar"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

        </div>


        <div className="categoria-container">

          <span className="icone">📂</span>

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >

            <option value="">Categorias</option>

            {[...new Set(produtos.map((p) => p.category))]
              .map((cat) => (

              <option key={cat} value={cat}>
                {cat}
              </option>

            ))}

          </select>

        </div>

      </div>


      {/* Lista de produtos */}
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

