import React from "react";
import AuthInput from "../components/auth/AuthInput";
import {
  IconeAtencao,
  IconeCadastro,
  IconeEntrar,
  IconeGoogle,
} from "../components/Icons/Index";
import useAuth from "../../data/hook/useAuth";
import Logo from "./../../public/images/logo-white.png";
import Image from "next/image";
import Button from "../components/template/Button";

const Autenticacao = () => {
  const { cadastrar, loginGoogle, login, erro, setErro } = useAuth();

  // const [errorMessage, setErrorMsg] = React.useState(null);
  const [modo, setModo] = React.useState<"login" | "cadastro">("login");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  React.useEffect(() => {
    if(erro !== ''){
      exibirErro(erro)
    }
  }, [erro]);

  function exibirErro(msg: string, tempoEmSegundos: number = 5) {
    setTimeout(() => setErro(''), tempoEmSegundos * 1000);
  }

  async function submeter() {
    try {
      if (modo === "login") {
        await login(email, senha);
      } else {
        await cadastrar(email, senha);
      }
    } catch (error: any) {
      throw new Error(`ERROR #${error.code}: ${error.message}`);
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-28 md:h-screen items-center justify-center">
      <div
        className={`relative flex items-center justify-center 
      md:w-3/5 bg-zinc-900`}
      >
        <img
          className="h-screen w-full object-cover mix-blend-overlay "
          src="https://source.unsplash.com/random?currencies"
          alt="Imagem da tela de autenticacao"
        />
        <Image className="absolute top-1/2 left-1/2 block w-10 md:w-80 mx-auto" src={Logo} alt="Logo" />
      </div>
      <div className="p-4 md:p-0 md:m-10 w-full md:w-2/5">
        <h1 className="text-2xl md:text-3xl font-bold mb-5">
          {modo === "login"
            ? "Entre com sua conta"
            : "Cadastre-se na plataforma"}
        </h1>
        {erro && (
          <div className="flex gap-2 items-center bg-red-400 text-white font-bold py-3 px-5 my-2 border border-red-700 rounded-lg">
            <IconeAtencao />
            <span>{erro}</span>
          </div>
        )}

        <AuthInput
          tipo="email"
          label="Email"
          valor={email}
          valorMudou={setEmail}
          obrigatorio
        />
        <AuthInput
          tipo="password"
          label="Senha"
          valor={senha}
          valorMudou={setSenha}
          obrigatorio
        />
        <Button onClick={submeter} className="mt-6">
          {modo === "login" ? (
            <>
              Entrar <IconeEntrar />
            </>
          ) : (
            <>
              Cadastrar <IconeCadastro />
            </>
          )}
        </Button>
        <hr className="my-6 border-zinc-300 w-full" />
        <Button onClick={loginGoogle} bgColor="bg-red-600" color="text-white">
          {modo === "login" ? (
            <>
              Entrar com google <IconeGoogle />
            </>
          ) : (
            <>
              Cadastrar com Google Email <IconeGoogle />
            </>
          )}
        </Button>

        {modo === "login" ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              onClick={() => setModo("cadastro")}
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
            >
              {" "}
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Ja faz parte da nossa comunidade?
            <a
              onClick={() => setModo("login")}
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
            >
              {" "}
              Entre com suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Autenticacao;
