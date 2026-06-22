import { useCarrinho } from "../context/CarrinhoContext.jsx";
import Toast from "./Toast.jsx";


function ToastContainer(){

const { mensagem } = useCarrinho();


return (

<Toast mensagem={mensagem}/>

);

}


export default ToastContainer;