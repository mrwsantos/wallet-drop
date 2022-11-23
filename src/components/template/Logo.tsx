import React from "react";
import Image from "next/image";
import Logotype from "./../../../public/images/logo-small.png";

const Logo = () => {
  return (
    <div
      className={`
    flex flex-col items-center justify-center 
     h-20 w-20 p-2 pl-4
     bg-zinc-800
    `}
    >
      <a href="/">
        <Image src={Logotype} alt="Logo" />
      </a>
    </div>
  );
};

export default Logo;
