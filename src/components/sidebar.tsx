import React, { useState } from "react";
import { Link } from "react-router-dom";
import imgProj from "../assets/img/imgProj";

function SidebarP() {
  const [open, setOpen] = useState(true);
  const userRole =localStorage.getItem("role");

  const Menus = [
    {
      title: "Les Mémoires",
      src: imgProj.livre,
      link: "/home",
    },
    {
      title: "Ajouter un mémoire",
      src: imgProj.addLivre,
      link: "/home/newbook",
      admin: true,
    },
    {
      title: "Nouvel utilisateur",
      src: imgProj.newAccount,
      link: "/home/newuser",
      admin: true,
    },
    {
      title: "Rechercher un mémoire",
      src: imgProj.search,
      link: "/home/search"
    },
    {
      title: "Se déconnecter",
      src: imgProj.turnOff,
      link: "/",
      admin: false,
      gap: true,
    },
  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-500 fixed left-0  h-screen p-3 mt-0 bg-indigo-600`}
    >
      <img
        src={imgProj.leftA}
        width="20"
        height="20"
        className={`${
          !open && "rotate-180"
        } absolute cursor-pointer bg-white rounded-full -right-4 top-9 w-7 border-2 border-indigo-600`}
        onClick={() => setOpen(!open)}
        alt=""
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={imgProj.school}
          alt=""
          width="40"
          height="60"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`${
            !open && "scale-0"
          } text-white origin-left duration-150 font-extrabold text-2xl`}
        >
          ENSPD Biblio
        </h1>
      </div>

      <ul className="pt-6">
        {Menus.map((menu) => (
          (userRole === "admin" || !menu.admin) && (
            <Link to={menu.link} title={`${menu.title}`} key={menu.link}>
              <li
                className={`text-gray-200 flex items-center gap-x-4 cursor-pointer p-2  hover:bg-light-white active:bg-light-white ${
                  menu.gap ? "mt-14" : "mt-2"
                }`}
              >
                <img
                  src={`${menu.src}`}
                  width="20"
                  className=""
                  style={{ color: "white" }}
                />
                <span
                  className={`${
                    !open && "hidden"
                  } text-white origin-left duration-150`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          )
        ))}
      </ul>
    </div>
  );
}

export default SidebarP;
