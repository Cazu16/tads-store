import ProdutoCard from "../ProdutoCard/ProdutoCard.jsx";

function Vitrine() {

  const produtos = [
    {
      nome: "Notebook Gamer",
      preco: "R$ 4.999,00",
      selo: "Promoção"
    },
    {
      nome: "Smartphone",
      preco: "R$ 2.299,00",
      selo: "Novo"
    },
    {
      nome: "Fone Bluetooth",
      preco: "R$ 299,00",
      selo: "Mais vendido"
    }
  ];

  return (
    <main className="vitrine">
      <h2>Nossos Produtos</h2>

      <div className="cards">
        {produtos.map((produto, index) => (
          <ProdutoCard
            key={index}
            nome={produto.nome}
            preco={produto.preco}
            selo={produto.selo}
          />
        ))}
      </div>
    </main>
  );
}

export default Vitrine;