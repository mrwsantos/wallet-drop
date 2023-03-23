import Link from "next/link";
import React from "react";
import { JsxElement } from "typescript";

interface MenuItemProps {
  texto?: string;
  icone?: JSX.Element;
  url?: string;
  onClick?: (evento: any) => void;
  className?: string;
}

const MenuItem = ({ texto, icone, url, onClick, className }: MenuItemProps) => {
  function renderizarLink() {
    return (
      <div
        className={`flex flex-col justify-center items-center 
        w-10 md:w-24 h-20 
        text-zinc-800 dark:text-zinc-200 ${className}`
      }
      >
        {icone}
        <span className="text-sm font-light mt-1 hidden md:block">{texto}</span>
      </div>
    );
  }

  return (
    <li
      className="
    hover:bg-zinc-300 dark:hover:bg-zinc-700 
    cursor-pointer"
      onClick={onClick}
    >
      {url ? (
        <Link href={url} passHref>
          {renderizarLink()}
        </Link>
      ) : (
        renderizarLink()
      )}
    </li>
  );
};

export default MenuItem;
