import React from "react";
import { FiDatabase, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-[120px] flex bg-blue-500 text-white h-12 fixed bottom-4 right-4 z-[200] shadow-md rounded-lg items-center">
      <Link
        to={"/"}
        className="text-white flex-1 h-full flex justify-center items-center"
      >
        <button>
          <FiHome />
        </button>
      </Link>

      <Link
        to={"/data"}
        className="text-white flex-1 h-full flex justify-center items-center"
      >
        <button>
          <FiDatabase />
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
