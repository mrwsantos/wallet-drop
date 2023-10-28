import React from "react";
import Link from "next/link";
import useAuth from "../../../data/hook/useAuth";
import IconPanda from "../../assets/panda.png";

interface AvatarUsuarioProps {
  className?: string;
}

const AvatarUsuario = ({ className }: AvatarUsuarioProps) => {
  const { usuario } = useAuth();

  return (
    <Link href="/profile">
      <div
        className="hidden md:flex items-center cursor-pointer "
        title="User profile"
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
          <span className="w-8 h-8 rounded-full overflow-hidden ml-2">
        
          <img
              className="w-8 h-8  rounded-full overflow-hidden"
              alt="User image"
              src={IconPanda.src}
              />
              </span>
        )}
      </div>
    </Link>
  );
};

export default AvatarUsuario;
