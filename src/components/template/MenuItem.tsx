import Link from "next/link";
import React from "react";

interface MenuItemProps {
  texto: string;
  icone: any;
  url?: string;
  onClick?: (evento: any) => void;
  className?: string;
}

const MenuItem = (props: MenuItemProps) => {
  function renderizarLink() {
    return (
      <div
        className={`flex flex-col justify-center items-center w-20 h-20 text-zinc-800 dark:text-zinc-200 ${props.className}`}
      >
        <img src={props.icone} />
        <span className="text-sm font-light ">{props.texto}</span>
      </div>
    );
  }

  return (
    <li
      className="
    hover:bg-zinc-300 dark:hover:bg-zinc-700 
    cursor-pointer"
      onClick={props.onClick}
    >
      {props.url ? (
        <Link href={props.url} passHref>
          {renderizarLink()}
        </Link>
      ) : (
        renderizarLink()
      )}
    </li>
  );
};

export default MenuItem;
