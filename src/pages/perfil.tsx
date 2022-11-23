import React from "react";
import Layout from "../components/template/Layout";
import useAuth from "./../../data/hook/useAuth";
import Input from "../components/template/Input";
import Button from "../components/template/Button";

import IconUserRandom from "./../../public/images/panda.png";
import IconChange from "./../../public/images/icon-change.png";

const Perfil = () => {
  const { usuario } = useAuth();
  const [email, setEmail] = React.useState(usuario?.email);
  const [name, setName] = React.useState(usuario?.nome);

  const [editingMode, setEditingMode] = React.useState(false);

  React.useEffect(() => {
    setName(usuario?.nome);
    setEmail(usuario?.email);
  }, []);

  //DUPLICAMOS USUARIO PARA PODER MODIFICAR
  return (
    <Layout
      titulo="Perfil do usuario"
      subtitulo="Administre suas configurações de usuário"
    >
      <section
        className={`
      flex flex-col items-center 
      bg-white p-4 rounded-lg shadow-xl dark:bg-zinc-800
      w-full sm:w-1/2 max-w-sm mt-2 mx-auto
      `}
      >
        <Button
          className={`my-0 mb-4 ml-auto w-fit px-2 !h-8 ${
            editingMode && "!bg-zinc-400 pointer-events-none"
          }`}
          onClick={() => setEditingMode((prev) => !prev)}
        >
          {editingMode ? "Editando perfil" : "Editar perfil"}
        </Button>

        <div className="image relative">
          <img
            className="w-32 h-32  rounded-full overflow-hidden"
            alt="Imagem de perfil do usuario"
            src={usuario?.imagemUrl ?? IconUserRandom.src}
          />
          {editingMode && (
            <Button
              className="absolute right-0 -bottom-0.5 !p-1 !w-10 !h-10 !rounded-full"
              onClick={() => console.log("TROCAR FOTO")}
              bgColor="bg-white"
            >
              <img src={IconChange.src} alt="Trocar foto" />
            </Button>
          )}
        </div>

        <form className="w-full mt-4 mx-auto" action="">
          <Input
            label="Nome"
            value={name}
            disabled={!editingMode ?? undefined}
          />
          <Input label="Email" value={email} disabled />

          {editingMode && (
            <div className="flex justify-center gap-4">
              <Button
                className={`mt-2 w-fit !h-8 px-2`}
                bgColor="bg-red-300"
                onClick={() => setEditingMode(false)}
              >
                Cancelar
              </Button>
              <Button
                className={`mt-2 w-fit !h-8 px-2`}
                bgColor="bg-lime-300"
                onClick={() => setEditingMode((prev) => !prev)}
                disabled
              >
                Função nao habilitada ainda
              </Button>
            </div>
          )}
        </form>
      </section>
    </Layout>
  );
};

export default Perfil;
