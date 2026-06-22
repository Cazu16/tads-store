import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";


// Criando contexto

const CarrinhoContext = createContext();


// Provider

export function CarrinhoProvider({ children }) {


  // ============================
  // CARRINHO
  // ============================

  const [carrinho, setCarrinho] = useState(() => {

    const carrinhoSalvo =
      localStorage.getItem("carrinho");

    return carrinhoSalvo
      ? JSON.parse(carrinhoSalvo)
      : [];

  });


  // ============================
  // PEDIDOS
  // ============================

  const [pedidos, setPedidos] = useState(() => {

    const pedidosSalvos =
      localStorage.getItem("pedidos");

    return pedidosSalvos
      ? JSON.parse(pedidosSalvos)
      : [];

  });


  // ============================
  // MENSAGEM DO TOAST
  // ============================

  const [mensagem, setMensagem] = useState("");


  // ============================
  // SALVAR CARRINHO
  // ============================

  useEffect(() => {

    localStorage.setItem(
      "carrinho",
      JSON.stringify(carrinho)
    );

  }, [carrinho]);


  // ============================
  // SALVAR PEDIDOS
  // ============================

  useEffect(() => {

    localStorage.setItem(
      "pedidos",
      JSON.stringify(pedidos)
    );

  }, [pedidos]);


  // ============================
  // FECHAR TOAST AUTOMATICAMENTE
  // ============================

  useEffect(() => {

    if (mensagem) {

      const tempo = setTimeout(() => {

        setMensagem("");

      }, 2500);


      return () => clearTimeout(tempo);

    }

  }, [mensagem]);


  // ============================
  // CONTADOR DO CARRINHO
  // ============================

  function totalItens() {

    return carrinho.reduce(

      (total, item) =>

        total + item.quantidade,

      0

    );

  }


  // ============================
  // ADICIONAR PRODUTO
  // ============================

  function adicionarProduto(produto) {


    setCarrinho((itens) => {


      const produtoExiste = itens.find(

        item => item.id === produto.id

      );


      if (produtoExiste) {


        return itens.map(item =>


          item.id === produto.id

            ? {

                ...item,

                quantidade:
                  item.quantidade + 1

              }

            : item


        );

      }


      return [

        ...itens,

        {

          ...produto,

          quantidade: 1

        }

      ];


    });


    // Mostra o Toast

    setMensagem(
      "Produto adicionado ao carrinho!"
    );

  }


  // ============================
  // REMOVER PRODUTO
  // ============================

  function removerProduto(id) {


    setCarrinho((itens) =>


      itens

        .map(item =>


          item.id === id


            ? {

                ...item,

                quantidade:
                  item.quantidade - 1

              }


            : item


        )


        .filter(item =>

          item.quantidade > 0

        )


    );

  }


  // ============================
  // LIMPAR CARRINHO
  // ============================

  function limparCarrinho() {


    setCarrinho([]);

  }


  // ============================
  // FINALIZAR PEDIDO
  // ============================

  function finalizarPedido(informacoesPedido) {


    const novoPedido = {


      id: Date.now(),


      data:
        new Date()
          .toLocaleDateString("pt-BR"),


      produtos:
        carrinho,


      status:
        "Pagamento aprovado",


      ...informacoesPedido


    };


    setPedidos((lista) => [

      ...lista,

      novoPedido

    ]);


    // Limpa o carrinho após a compra

    setCarrinho([]);

  }


  // ============================
  // RETORNO DO CONTEXTO
  // ============================

  return (


    <CarrinhoContext.Provider

      value={{

        // Carrinho

        carrinho,

        adicionarProduto,

        removerProduto,

        limparCarrinho,

        totalItens,


        // Pedidos

        pedidos,

        finalizarPedido,


        // Toast

        mensagem


      }}

    >


      {children}


    </CarrinhoContext.Provider>


  );

}


// Hook personalizado

export function useCarrinho() {


  const contexto = useContext(
    CarrinhoContext
  );


  if (!contexto) {

    throw new Error(
      "useCarrinho deve ser usado dentro de CarrinhoProvider"
    );

  }


  return contexto;

}