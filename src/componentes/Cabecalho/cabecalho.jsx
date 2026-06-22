import { useCarrinho } from "../../context/CarrinhoContext.jsx";
import { Link } from "react-router-dom";

function Cabecalho({ abrirContato }) {
  const { totalItens } = useCarrinho(); // ✅ TEM QUE FICAR AQUI

  return (
    <header className="cabecalho">
      <h1>TADS Store do Carlos</h1>

      <nav>
        <ul>

          <li>
            <Link to="/">Início</Link>
          </li>

          <li>
            <Link to="/produtos">Produtos</Link>
          </li>

          <li>
            <Link to="/promocoes">Promoções</Link>
          </li>

          {/* 🛒 CARRINHO */}
<li>
  <Link 
    to="/carrinho" 
    className="carrinho-link"
  >
    🛒 Carrinho

    <span className="contador">
      {totalItens()}
    </span>

  </Link>
</li>


{/* 📦 HISTÓRICO DE PEDIDOS */}
<li>

  <Link 
    to="/pedidos"
    className="menu-link"
  >

    📦 Pedidos

  </Link>

</li>

          <li onClick={abrirContato}>
            Contato
          </li>

        </ul>
      </nav>
    </header>
  );
}

export default Cabecalho;