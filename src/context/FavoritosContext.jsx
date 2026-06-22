import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {

  const [favoritos, setFavoritos] = useState(() => {

    const dados = localStorage.getItem("favoritos");

    return dados ? JSON.parse(dados) : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );

  }, [favoritos]);

  function adicionarFavorito(produto) {

    const existe = favoritos.some(
      (item) => item.id === produto.id
    );

    if (!existe) {

      setFavoritos([
        ...favoritos,
        produto
      ]);

    }

  }

  function removerFavorito(id) {

    setFavoritos(

      favoritos.filter(
        (item) => item.id !== id
      )

    );

  }

  function favoritoExiste(id) {

    return favoritos.some(
      (item) => item.id === id
    );

  }

  function totalFavoritos() {

    return favoritos.length;

  }

  return (

    <FavoritosContext.Provider
      value={{
        favoritos,
        adicionarFavorito,
        removerFavorito,
        favoritoExiste,
        totalFavoritos
      }}
    >

      {children}

    </FavoritosContext.Provider>

  );

}

export function useFavoritos() {

  return useContext(FavoritosContext);

}