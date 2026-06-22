import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AvaliacoesProvider } from "./context/AvaliacoesContext.jsx";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CarrinhoProvider } from "./context/CarrinhoContext.jsx";
import { FavoritosProvider } from "./context/FavoritosContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <CarrinhoProvider>
      <FavoritosProvider>
        <AvaliacoesProvider>
          <App />
        </AvaliacoesProvider>
      </FavoritosProvider>
    </CarrinhoProvider>
  </AuthProvider>
</BrowserRouter>
);