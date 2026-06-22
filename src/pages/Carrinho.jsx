import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext.jsx";
import { cupons } from "../utils/cupons.js";

function Carrinho() {


  const {
    carrinho,
    adicionarProduto,
    removerProduto,
    limparCarrinho
  } = useCarrinho();



  const [frete, setFrete] = useState(0);

  const [cupom, setCupom] = useState("");

  const [desconto, setDesconto] = useState(0);

  const [mensagemCupom, setMensagemCupom] = useState("");





  // ==========================
  // SUBTOTAL DOS PRODUTOS
  // ==========================

  const subtotal = carrinho.reduce(
    (acc, item) =>
      acc + item.price * item.quantidade,
    0
  );




  // ==========================
  // DESCONTO DO CUPOM
  // ==========================

  const valorDesconto =
    subtotal * desconto / 100;





  // ==========================
  // TOTAL FINAL
  // ==========================

  const total =
    subtotal + frete - valorDesconto;







function aplicarCupom(){

  const codigo = cupom.toUpperCase();


  const cupomEncontrado = cupons[codigo];


  if(!cupomEncontrado){

    setDesconto(0);

    setMensagemCupom(
      "Cupom inválido ❌"
    );

    return;

  }



  if(cupomEncontrado.tipo === "percentual"){


    setDesconto(
      cupomEncontrado.valor
    );


  }



  if(cupomEncontrado.tipo === "frete"){


    setFrete(
      frete - cupomEncontrado.valor
    );


  }



  setMensagemCupom(
    `Cupom aplicado 🎉 ${cupomEncontrado.descricao}`
  );


}
//Cupons de desconto:DESCONTO10,FRETEGRATIS e FRETE5






  return (

    <main className="carrinho-container">



      <h1 className="titulo-carrinho">

        Seu Carrinho 🛒

      </h1>






      {carrinho.length === 0 ? (


        <p className="carrinho-vazio">

          Seu carrinho está vazio

        </p>



      ) : (



        <div className="carrinho-layout">







          {/* ==========================
              PRODUTOS
          ========================== */}



          <div className="carrinho-lista">



            {carrinho.map((item) => (


              <div
                className="carrinho-item"
                key={item.id}
              >




                <img
                  src={item.thumbnail}
                  alt={item.title}
                />







                <div className="info">


                  <h3>
                    {item.title}
                  </h3>



                  <p>
                    R$ {item.price.toFixed(2)}
                  </p>



                  <p>
                    Subtotal:
                    R$ {(item.price * item.quantidade).toFixed(2)}
                  </p>



                </div>








                {/* QUANTIDADE */}


                <div className="quantidade">


                  <button

                    className="botao-quantidade"

                    onClick={() =>
                      removerProduto(item.id)
                    }

                  >

                    -

                  </button>





                  <span>

                    {item.quantidade}

                  </span>





                  <button

                    className="botao-quantidade"

                    onClick={() =>
                      adicionarProduto(item)
                    }

                  >

                    +

                  </button>



                </div>







                {/* REMOVER */}


                <button

                  className="botao-remover"

                  onClick={() =>
                    removerProduto(item.id)
                  }

                >

                  🗑

                </button>





              </div>



            ))}



          </div>









          {/* ==========================
                RESUMO
          ========================== */}



          <div className="carrinho-resumo">





            <h2>

              Resumo da compra

            </h2>







            <div className="linha-resumo">


              <span>
                Subtotal:
              </span>


              <strong>
                R$ {subtotal.toFixed(2)}
              </strong>


            </div>








            <h3>

              Frete

            </h3>






            <select

              value={frete}

              onChange={(e) =>
                setFrete(parseFloat(e.target.value))
              }

            >



              <option value={0}>

                🚚 Frete grátis - 7 dias

              </option>





              <option value={15}>

                🚚 Econômico - R$15,00

              </option>





              <option value={30}>

                ⚡ Expressa - R$30,00

              </option>




            </select>









            <h3>

              Cupom de desconto

            </h3>







            <input

              type="text"

              placeholder="Digite seu cupom"

              value={cupom}

              onChange={(e) =>
                setCupom(e.target.value)
              }

            />








            <button

              className="botao-cupom"

              onClick={aplicarCupom}

            >

              Aplicar cupom

            </button>








            {mensagemCupom && (


              <p className="mensagem-cupom">

                {mensagemCupom}

              </p>


            )}









            <div className="linha-resumo">


              <span>
                Frete:
              </span>


              <strong>
                R$ {frete.toFixed(2)}
              </strong>


            </div>







            <div className="linha-resumo desconto">


              <span>
                Desconto:
              </span>


              <strong>
                - R$ {valorDesconto.toFixed(2)}
              </strong>


            </div>









            <div className="linha-total">


              <span>
                Total:
              </span>


              <strong>
                R$ {total.toFixed(2)}
              </strong>


            </div>









            <Link

              to="/checkout"

              className="link-finalizar"

            >


              <button

                className="botao-finalizar"

              >

                Finalizar compra

              </button>



            </Link>









            <button

              className="botao-limpar"

              onClick={limparCarrinho}

            >

              Limpar carrinho

            </button>






          </div>






        </div>



      )}



    </main>

  );

}



export default Carrinho;