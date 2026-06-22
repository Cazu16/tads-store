import { useCarrinho } from "../../context/CarrinhoContext.jsx";
import { useFavoritos } from "../../context/FavoritosContext.jsx";
import { useAvaliacoes } from "../../context/AvaliacoesContext.jsx";
import { Link } from "react-router-dom";
import Botao from "../Botao/Botao.jsx";

function ProdutoCard({ id, title, price, thumbnail }) {

  // ============================
  // CONTEXTOS
  // ============================

  const { adicionarProduto } = useCarrinho();

  const {
    adicionarFavorito,
    removerFavorito,
    favoritoExiste
  } = useFavoritos();

  const {
    mediaAvaliacao,
    totalAvaliacoes,
    adicionarAvaliacao
  } = useAvaliacoes();


  // ============================
  // CARRINHO
  // ============================

  function handleAdicionar() {
    adicionarProduto({
      id,
      title,
      price,
      thumbnail
    });
  }


  // ============================
  // FAVORITOS
  // ============================

  function handleFavorito() {

    if (favoritoExiste(id)) {

      removerFavorito(id);

    } else {

      adicionarFavorito({
        id,
        title,
        price,
        thumbnail
      });

    }
  }


  // ============================
  // AVALIAÇÕES
  // ============================

  function avaliar(nota) {

    adicionarAvaliacao(id, nota);

  }


  // Converte a nota em estrelas
  function renderEstrelas(nota) {

    const estrelas = [];

    const notaArredondada = Math.round(nota);

    for (let i = 1; i <= 5; i++) {

      if (i <= notaArredondada) {

        estrelas.push("★");

      } else {

        estrelas.push("☆");

      }
    }

    return estrelas.join("");

  }


  // ============================
  // RENDERIZAÇÃO
  // ============================

  return (

    <div className="card">


      {/* ❤️ Favoritos */}

      <button
        className="botao-favorito"
        onClick={handleFavorito}
      >
        {favoritoExiste(id) ? "❤️" : "🤍"}
      </button>


      {/* Imagem do produto */}

      <img
        src={thumbnail}
        alt={title}
        className="imagem-produto"
      />


      {/* Nome */}

      <h3>{title}</h3>


      {/* ⭐ Média das avaliações */}

      <div className="avaliacao">

        <span className="estrelas">
          {renderEstrelas(mediaAvaliacao(id))}
        </span>

        <span className="nota-texto">
          ({mediaAvaliacao(id)}) - {totalAvaliacoes(id)} avaliações
        </span>

      </div>


     <div className="avaliar">
  <span className="texto-avaliar">
    Avalie:
  </span>

  {[1, 2, 3, 4, 5].map((nota) => (
    <button
      key={nota}
      className="estrela-botao"
      onClick={() => avaliar(nota)}
    >
      ★
    </button>
  ))}
</div>


      {/* Preço */}

      <p>
        R$ {price}
      </p>


      {/* Detalhes */}

      <Link to={`/produto/${id}`}>
        <Botao texto="Ver detalhes" />
      </Link>


      {/* Carrinho */}

      <button
        className="botao"
        onClick={handleAdicionar}
      >
        ➕ Adicionar ao carrinho
      </button>


    </div>

  );

}

export default ProdutoCard;