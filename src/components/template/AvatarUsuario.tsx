import React from "react";
import Link from "next/link";
import useAuth from "../../../data/hook/useAuth";
import { IconProfile } from "../Icons/Index";

interface AvatarUsuarioProps {
  className?: string;
}

const AvatarUsuario = ({ className }: AvatarUsuarioProps) => {
  const { usuario } = useAuth();

  return (
    <Link href="/perfil">
      <div
        className="hidden md:flex items-center cursor-pointer "
        title="Perfil do Usuario"
      >
        <span className="text-black dark:text-white font-bold">
          <span className="ml-2">{usuario?.nome ?? "Anonymous"}</span>
        </span>
        {usuario?.imagemUrl ? (
          <img
            className={`w-8 h-8 rounded-full object-contain ml-2 ${className}`}
            src={usuario.imagemUrl}
            width={80}
            alt="Avatar usuario"
          />
        ) : (
          <span className="bg-white rounded-full flex items-center justify-center ml-2 w-8 h-8">
            <IconProfile />
          </span>
        )}
      </div>
    </Link>
  );
};

export default AvatarUsuario;
