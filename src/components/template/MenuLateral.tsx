import React from "react";
import useAuth from "../../../data/hook/useAuth";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import IconHome from "./../../../public/images/icon-home.png";
import IconSettings from "./../../../public/images/icon-settings.png";
import IconDashboard from "./../../../public/images/icon-graph.png";
import IconExit from "./../../../public/images/icon-error.png";
import IconUser from "./../../../public/images/icon-user.png";

const MenuLateral = () => {
  const { logout } = useAuth();

  return (
    <aside
      className="
      absolute h-screen
    flex flex-col
    bg-zinc-200 text-zinc-700
    dark:bg-zinc-800
    "
    >
      <Logo />
      <ul className="flex-grow">
        <MenuItem url="/" texto="Home" icone={IconHome.src} />
        <MenuItem
          url="/dashboard"
          texto="Dashboard"
          icone={IconDashboard.src}
        />
        {/* <MenuItem url="/ajustes" texto="Ajustes" icone={IconSettings.src} /> */}
        <MenuItem url="/perfil" texto="Perfil" icone={IconUser.src} />
      </ul>
      <ul className="">
        <MenuItem
          onClick={() => logout()}
          texto="Sair"
          icone={IconExit.src}
          className={`hover:text-white hover:bg-zinc-700`}
        />
      </ul>
    </aside>
  );
};

export default MenuLateral;
