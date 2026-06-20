import { Routes, Route } from "react-router-dom";

import "./App.css";

import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Rodape from "./componentes/Rodape/Rodape";

import Home from "./pages/Home";
import Detalhe from "./pages/Detalhe";
import NaoEncontrado from "./pages/NaoEncontrado";


function App() {

  return (
    <>
      <Cabecalho />

      <Routes>

        <Route 
          path="/"
          element={<Home />}
        />

        <Route 
          path="/produto/:id"
          element={<Detalhe />}
        />

        <Route 
          path="*"
          element={<NaoEncontrado />}
        />

      </Routes>

      <Rodape />
    </>
  );
}

export default App;