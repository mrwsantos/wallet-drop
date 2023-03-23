import React from "react";
import useAuth from "../../../data/hook/useAuth";
import Button from "../Button";
import {
  IconDashboard,
  IconDollar,
  IconHome,
  IconLogout,
  IconProfile,
  IconWallet,
} from "../Icons/Index";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

const MenuLateral = () => {
  const { logout } = useAuth();

  return (
    <aside
      className="
    fixed h-screen
    flex flex-col
    bg-zinc-200 text-zinc-700
    dark:bg-zinc-800
    w-10 md:w-24
    "
    >
      <Logo />
      <ul className="flex-grow">
        <MenuItem url="/" texto="MINHA CARTEIRA" icone={<IconWallet />} />
        <MenuItem
          url="/dashboard"
          texto="DASHBOARD"
          icone={<IconDashboard />}
        />
        <MenuItem url="/moedas" texto="MOEDAS" icone={<IconDollar />} />
        <MenuItem url="/perfil" texto="PERFIL" icone={<IconProfile />} />
      </ul>
      <ul className="p-2 mb-4">
        <Button
          className={` 
          border border-zinc-700 md:px-2
          hover:bg-zinc-700 hover:text-white 
          dark:border-white dark:text-white `
        }
          bgColor="bg-red-500"
          color="text-white"
          onClick={() => logout()}
        >
          <span className="hidden md:block">
          Sair
          </span>
          <IconLogout />
        </Button>
      </ul>
    </aside>
  );
};

export default MenuLateral;
