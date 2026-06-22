import { useEffect, useState } from "react";


function Pedidos(){


const [pedidos,setPedidos] = useState([]);



useEffect(()=>{


const dados = 
JSON.parse(
localStorage.getItem("pedidos")
) || [];


setPedidos(dados);


},[]);





return(


<main className="pedidos-container">


<h1>
📦 Histórico de pedidos
</h1>




{
pedidos.length === 0 ? (


<p className="sem-pedidos">

Você ainda não possui pedidos.

</p>



):(



<div className="lista-pedidos">



{
pedidos.map((pedido,index)=>(


<div 
className="pedido-card"
key={index}
>



<h2>

Pedido #{index + 1}

</h2>




<p>

📅 Data:
{pedido.data}

</p>




<p>

💳 Pagamento:
{pedido.pagamento}

</p>




<h3>

Produtos:

</h3>



{
pedido.produtos.map(item=>(


<p key={item.id}>

{item.title}

 x {item.quantidade}

</p>


))

}




<h2>

Total:

R$ {pedido.total.toFixed(2)}

</h2>




<span className="status">

🚚 Pedido realizado

</span>



</div>



))


}



</div>


)


}



</main>


);


}


export default Pedidos;