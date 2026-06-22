import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Rodape from "./componentes/Rodape/Rodape";

import Checkout from "./pages/Checkout.jsx";
import Pedidos from "./pages/Pedidos.jsx";

import ToastContainer from "./componentes/ToastContainer.jsx";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Promocoes from "./pages/Promocoes";
import Detalhe from "./pages/Detalhe";
import Login from "./pages/Login";
import MinhaConta from "./pages/MinhaConta";
import Carrinho from "./pages/Carrinho";
import NaoEncontrado from "./pages/NaoEncontrado";

import RotaProtegida from "./routes/RotaProtegida";
function App() {


  const [mostrarContato, setMostrarContato] = useState(false);



  return (

    <>


      <Cabecalho
        abrirContato={() =>
          setMostrarContato(true)
        }
      />




      <Routes>



        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />




        {/* PRODUTOS */}

        <Route

          path="/produtos"

          element={

            <RotaProtegida>

              <Produtos />

            </RotaProtegida>

          }

        />





        {/* PROMOÇÕES */}

        <Route

          path="/promocoes"

          element={

            <RotaProtegida>

              <Promocoes />

            </RotaProtegida>

          }

        />





        {/* DETALHE */}

        <Route

          path="/produto/:id"

          element={<Detalhe />}

        />





        {/* LOGIN */}

        <Route

          path="/login"

          element={<Login />}

        />





        {/* MINHA CONTA */}

        <Route

          path="/minha-conta"

          element={

            <RotaProtegida>

              <MinhaConta />

            </RotaProtegida>

          }

        />





        {/* CARRINHO */}

        <Route

          path="/carrinho"

          element={<Carrinho />}

        />






        {/* CHECKOUT */}

        <Route

          path="/checkout"

          element={<Checkout />}

        />






        {/* HISTÓRICO DE PEDIDOS */}

        <Route

          path="/pedidos"

          element={<Pedidos />}

        />






        {/* NÃO ENCONTRADO - SEMPRE POR ÚLTIMO */}

        <Route

          path="*"

          element={<NaoEncontrado />}

        />



      </Routes>







      {/* MODAL CONTATO */}


      {

      mostrarContato && (


        <div className="modal">


          <div className="modal-conteudo">


            <h2>
              Contato da Loja
            </h2>



            <p>
              <strong>
                Loja:
              </strong>

              TADS Store do Carlos
            </p>




            <p>
              <strong>
                Telefone:
              </strong>

              (27) 99999-9999
            </p>




            <p>
              <strong>
                E-mail:
              </strong>

              contato@tadsstore.com
            </p>




            <p>
              <strong>
                Endereço:
              </strong>

             Rua Primavera, Canaã Viana - ES
            </p>





            <button

              className="botao"

              onClick={() =>
                setMostrarContato(false)
              }

            >

              Fechar

            </button>



          </div>


        </div>


      )


      }






      <Rodape />



<ToastContainer />

    </>


  );


}



export default App;