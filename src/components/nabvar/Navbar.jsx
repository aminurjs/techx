import { Link, NavLink } from "react-router-dom";
import { navLink } from "./navItems";
import "./navbar.css";
const Navbar = () => {
  return (
    <div className="w-full py-3  bg-base-100 shadow">
      <div className="max-w-7xl mx-auto navbar">
        <div className="flex-1 px-2 mx-2">
          <Link
            to="/"
            className="flex gap-3 tracking-tight text-3xl text-dark-01 font-bold items-center"
          >
            <img className="w-10" src="/logo.png" alt="" />
            Tech X
          </Link>
        </div>
        <div className="flex-none hidden lg:block">
          <ul className=" menu-horizontal">
            {/* Navbar menu content here */}
            {navLink.map((menu) => (
              <li
                className="mr-5 text-dark-01 text-lg font-medium hover:text-dark-03 hover:underline"
                key={menu.id}
              >
                <NavLink className="" to={menu.path}>
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-none lg:hidden">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
