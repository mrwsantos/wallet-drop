import React, { useState, useEffect, createContext } from "react";
import route from "next/router";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./../../src/services/FirebaseConfig";
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

import Cookies from "js-cookie";
import Usuario from "../../src/model/Usuario";

interface AuthContextProps {
  usuario: Usuario;
  carregando?: boolean;
  cadastrar: (email: string, senha: string) => Promise<void>;
  login: (email: string, senha: string) => Promise<void>;
  loginGoogle: () => void;
  logout: () => Promise<void>;
  erro: string;
  setErro: (msg: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  usuario: {
    uid: "",
    email: "",
    nome: "",
    token: "",
    provedor: "",
    imagemUrl: "",
  },
  cadastrar: () => Promise.resolve(),
  login: () => Promise.resolve(),
  loginGoogle: () => {},
  logout: () => Promise.resolve(),
  erro: "",
  setErro: () => {},
});

async function usuarioNormalizado(usuarioFirebase: any) {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName,
    email: usuarioFirebase.email,
    token,
    provedor: usuarioFirebase.providerData[0].providerId,
    imagemUrl: usuarioFirebase.photoURL,
  };
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set("wallet-drop-coder-auth", `${logado}`, {
      expires: 7,
    });
  } else {
    Cookies.remove("wallet-drop-coder-auth");
  }
}

export function AuthProvider(props: any) {
  const [usuario, setUsuario] = useState<Usuario>({
    uid: "",
    email: "",
    nome: "",
    token: "",
    provedor: "",
    imagemUrl: "",
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = React.useState<any>(null);

  async function configurarSessao(usuarioFirebase: any) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario({
        uid: "",
        email: "",
        nome: "",
        token: "",
        provedor: "",
        imagemUrl: "",
      });
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }

  function loginGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // sessionStorage.setItem("@AuthFirebase:token", token);
        // sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

        setCarregando(false);
        configurarSessao(user);
        route.push("/");
      })
      .catch((error: any) => {
        console.log('error: ', error)
        // validaErros(error);
      });
  }

  async function login(email: string, senha: string): Promise<void> {
    setCarregando(true);
    signInWithEmailAndPassword(auth, email, senha)
      .then((result) => {
        configurarSessao(result.user);
        setCarregando(false);
        route.push("/");
      })
      .catch((error: any) => {
        validaErros(error);
      });
  }

  async function cadastrar(email: string, senha: string): Promise<void> {
    setCarregando(true);
    createUserWithEmailAndPassword(auth, email, senha)
      .then((cred) => {
        configurarSessao(cred.user);
        route.push("/");
      })
      .catch((error: any) => {
        validaErros(error);
      });
  }

  async function logout() {
    try {
      setCarregando(true);
      await auth.signOut();
      await configurarSessao(null);
      route.push("/autenticacao");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("wallet-drop-coder-auth")) {
      const cancelar = auth.onIdTokenChanged(configurarSessao);
      return () => cancelar();
    } else {
      setCarregando(false);
    }
  }, []);

  function validaErros(error: any) {
    const e = `${error}`;
    if (e.includes("user-not-found")) {
      setErro("Usuario não encontrado");
    } else if (e.includes("invalid-email")) {
      setErro("Email inválido");
    } else {
      setErro("Verifique se todos os campos foram preenchidos.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cadastrar,
        login,
        loginGoogle,
        logout,
        carregando,
        setErro,
        erro,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
