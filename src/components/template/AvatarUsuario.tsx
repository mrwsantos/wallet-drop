import React from "react";
import Link from "next/link";
import useAuth from "../../../data/hook/useAuth";

import people from "./../../../public/images/icon-user.png";

interface AvatarUsuarioProps {
  className?: string;
}

const AvatarUsuario = ({ className }: AvatarUsuarioProps) => {
  const { usuario } = useAuth();

  return (
    <Link href="/perfil">
      <div className="hidden md:flex items-center cursor-pointer " title="Perfil do Usuario">
        <span className="text-black dark:text-white font-bold">
          <span className="ml-2">
            {usuario?.nome ?? "Anonymous"}
          </span>
        </span>
        <img
          className={`w-8 h-8 rounded-full object-contain ml-2 ${className}`}
          src={usuario?.imagemUrl ? `${usuario.imagemUrl}` : people.src}
          alt=""
        />
      </div>
    </Link>
  );
};

export default AvatarUsuario;
