import Head from "next/script";
import Image from "next/image";
import router from "next/router";
import Loading from "../../../public/images/loading.gif";
import useAuth from "../data/hook/useAuth";

const forcarAutenticacao = (jsx) => {
  const { usuario, carregando } = useAuth();

  function renderizarConteudo() {
    return <>{jsx}</>;
  }

  function renderizarCarregando() {
    return (
      <>
        <Head> // MAIS UMA CAMADA DE SEGURANÇA
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    if(!document.cookie?.includes("wallet-drop-coder-auth')){
                        window.location.href = "/autenticacao"
                    }
                `,
            }}
          />
        </Head>

        <div className="flex justify-center items-center h-screen bg-zinc-800">
          <Image src={Loading} alt="Gif de carregando"/>
        </div>
      </>
    );
  }

  if (!carregando && usuario?.email) {
    return renderizarConteudo();
  } else if (carregando) {
    return renderizarCarregando();
  } else {
    router.push("/autenticacao");
    return null;
  }
};

export default forcarAutenticacao;
