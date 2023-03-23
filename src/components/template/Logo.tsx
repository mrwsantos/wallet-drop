import React from "react";
import { IconWallet } from "../Icons/Index";
import ImageWallet from './../../assets/image-wallet.png'

const Logo = () => {
  return (
    <div
      className={`
    flex flex-col items-center justify-center 
     h-20 md:w-24 
    `}
    >
      <a href="/" className="text-white dark:text-zinc-700 ">
        <img src={ImageWallet.src} alt="Logo" className="w-10 sm:w-16 my-2 mx-auto"/>
        <hr className="border-zinc-300 dark:border-zinc-500 mb-2"/>
        {/* <IconWallet /> */}
      </a>
    </div>
  );
};

export default Logo;
