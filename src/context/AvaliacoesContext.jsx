import { createContext, useContext, useState, useEffect } from "react";

const AvaliacoesContext = createContext();

export function AvaliacoesProvider({ children }) {
  const [avaliacoes, setAvaliacoes] = useState(() => {
    const dados = localStorage.getItem("avaliacoes");
    return dados ? JSON.parse(dados) : {};
  });

  useEffect(() => {
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
  }, [avaliacoes]);

  function adicionarAvaliacao(produtoId, nota) {
    setAvaliacoes((prev) => {
      const atuais = prev[produtoId] || [];

      return {
        ...prev,
        [produtoId]: [...atuais, nota],
      };
    });
  }

  function mediaAvaliacao(produtoId) {
    const notas = avaliacoes[produtoId];

    if (!notas || notas.length === 0) return 0;

    const soma = notas.reduce((acc, n) => acc + n, 0);

    return (soma / notas.length).toFixed(1);
  }

  function totalAvaliacoes(produtoId) {
    return avaliacoes[produtoId]?.length || 0;
  }

  return (
    <AvaliacoesContext.Provider
      value={{
        avaliacoes,
        adicionarAvaliacao,
        mediaAvaliacao,
        totalAvaliacoes,
      }}
    >
      {children}
    </AvaliacoesContext.Provider>
  );
}

export function useAvaliacoes() {
  return useContext(AvaliacoesContext);
}