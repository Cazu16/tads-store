import { useState } from "react";
import { useCarrinho } from "../context/CarrinhoContext.jsx";
import { useNavigate } from "react-router-dom";


function Checkout() {


  const {
    carrinho,
    limparCarrinho
  } = useCarrinho();



  const navigate = useNavigate();



  const [formaPagamento, setFormaPagamento] = useState("");


  const [cliente, setCliente] = useState({

    nome:"",
    email:"",
    telefone:"",
    cpf:"",
    endereco:"",
    numero:"",
    cidade:"",
    estado:"",
    cep:""

  });





  const subtotal = carrinho.reduce(

    (acc,item)=>
      acc + item.price * item.quantidade,

    0

  );




  const frete = 0;


  const total = subtotal + frete;







  function atualizarCampo(e){


    setCliente({

      ...cliente,

      [e.target.name]: e.target.value

    });


  }







  function finalizarPedido(){


    if(
      !cliente.nome ||
      !cliente.email ||
      !cliente.endereco ||
      !formaPagamento
    ){

      alert(
        "Preencha todos os campos obrigatórios!"
      );

      return;

    }



    const pedido = {


      cliente,

      produtos:carrinho,

      pagamento:formaPagamento,

      total,

      data:new Date().toLocaleDateString()


    };



    const pedidosSalvos =
JSON.parse(localStorage.getItem("pedidos")) || [];


pedidosSalvos.push(pedido);


localStorage.setItem(
  "pedidos",
  JSON.stringify(pedidosSalvos)


    );



    limparCarrinho();



    alert(
      "Pedido realizado com sucesso! 🎉"
    );


    navigate("/");

  }









  return (


    <main className="checkout-container">



      <h1>
        Finalizar compra 💳
      </h1>





      <div className="checkout-layout">






        {/* DADOS DO CLIENTE */}

        <section className="checkout-card">


          <h2>
            Dados pessoais
          </h2>



          <input
            name="nome"
            placeholder="Nome completo"
            value={cliente.nome}
            onChange={atualizarCampo}
          />



          <input
            name="email"
            placeholder="E-mail"
            value={cliente.email}
            onChange={atualizarCampo}
          />



          <input
            name="telefone"
            placeholder="Telefone"
            value={cliente.telefone}
            onChange={atualizarCampo}
          />



          <input
            name="cpf"
            placeholder="CPF"
            value={cliente.cpf}
            onChange={atualizarCampo}
          />



        </section>









        {/* ENDEREÇO */}

        <section className="checkout-card">


          <h2>
            Endereço de entrega 🚚
          </h2>




          <input

            name="endereco"

            placeholder="Rua"

            value={cliente.endereco}

            onChange={atualizarCampo}

          />




          <input

            name="numero"

            placeholder="Número"

            value={cliente.numero}

            onChange={atualizarCampo}

          />





          <input

            name="cidade"

            placeholder="Cidade"

            value={cliente.cidade}

            onChange={atualizarCampo}

          />





          <input

            name="estado"

            placeholder="Estado"

            value={cliente.estado}

            onChange={atualizarCampo}

          />





          <input

            name="cep"

            placeholder="CEP"

            value={cliente.cep}

            onChange={atualizarCampo}

          />



        </section>









        {/* PAGAMENTO */}

        <section className="checkout-card">


          <h2>
            Forma de pagamento 💰
          </h2>



          <select

            value={formaPagamento}

            onChange={
              (e)=>
              setFormaPagamento(e.target.value)
            }

          >

            <option value="">
              Escolha uma opção
            </option>


            <option value="Cartão">
              💳 Cartão de crédito
            </option>


            <option value="Pix">
              ⚡ Pix
            </option>


            <option value="Boleto">
              📄 Boleto
            </option>


          </select>



        </section>










        {/* RESUMO */}

        <section className="checkout-resumo">


          <h2>
            Resumo do pedido
          </h2>




          {
            carrinho.map(item=>(


              <p key={item.id}>

                {item.title}

                x{item.quantidade}

              </p>


            ))

          }





          <hr/>




          <h3>

            Total:
            R$ {total.toFixed(2)}

          </h3>






          <button

            className="botao-finalizar"

            onClick={finalizarPedido}

          >

            Confirmar pedido

          </button>





        </section>





      </div>






    </main>


  );

}



export default Checkout;