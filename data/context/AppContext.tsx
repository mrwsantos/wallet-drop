import { createContext, useState, useEffect } from "react";

interface AppContextPrps {
  tema?: string;
  alternarTema?: () => void;
}

const AppContext = createContext<AppContextPrps>({
  tema: '',
  alternarTema: null
});

export function AppProvider({children}:any) {
  const [tema, setTema] = useState<string>("dark");

  function alternarTema() {
    const novoTema = tema === "" ? "dark" : "";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema);
  }

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema") || '';
    setTema(temaSalvo);
  }, []);

  return (
    <AppContext.Provider
      value={{
        tema,
        alternarTema,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
