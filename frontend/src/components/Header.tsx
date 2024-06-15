import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSetting
} from "react-icons/ai";

import "../index.css";
import Login from "./Login";
import { NAV, NAV_ITEMS } from "../lib/consts";
import { Button } from "./UI/button";
import { useAppDispatch } from "../hooks/redux";
import { toggleNav } from "../store/uiSlice";

function Header() {
  const [isNav, setIsNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleNav = () => {
    setIsNav(prev => !prev);
    dispatch(toggleNav());
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateSettings = () => {
    navigate("/settings");
  };

  return (
    <header className="bg-white shadow-md flex justify-between items-center px-4 text-[#3a0e7b] fixed top-0 z-50 w-full">
      <nav className="w-full flex justify-between gap-3 px-3 py-4 sm:px-6 sm:py-6">
        {/* Desktop Navigation Items */}
        <ul className="w-full hidden md:flex items-center justify-between">
          <li>
            <Button
              variant="destructive"
              onClick={handleNavigateHome}
              className="w-10 h-10 p-0 bg-cover bg-norepeat bg-[url('./assets/icons/logo.svg')] hover:rotate-90 transition-all duration-300"
            />
          </li>
          {NAV_ITEMS.map(navEl => {
            const nav = navEl === "home" ? "/" : `/${navEl}`;
            return (
              <li
                key={navEl}
                className={`font-mono uppercase menu-item ${location.pathname === nav ? "active" : ""}`}
              >
                <NavLink to={NAV[navEl] || "/"}>{navEl}</NavLink>
              </li>
            );
          })}
          <li className="flex items-center">
            <Button
              onClick={handleNavigateSettings}
              className="hover:bg-[#3a0e7b] hover:text-white mr-4"
            >
              <AiOutlineSetting size={20} />
            </Button>
            <Login />
          </li>
        </ul>
        {/* Mobile Navigation Items */}
        <ul className="w-full md:hidden flex items-center justify-between">
          <li>
            <Button
              variant="destructive"
              onClick={handleNavigateHome}
              className="w-10 h-10 p-0 bg-cover bg-norepeat bg-[url('./assets/icons/logo.svg')] hover:rotate-90 transition-all duration-300"
            />
          </li>
          <li>
            <NavLink className="uppercase font-mono" to={NAV["toys"] || "/"}>
              Toys
            </NavLink>
          </li>
          <li className="flex items-center">
            <Button
              onClick={handleNavigateSettings}
              className="hover:bg-[#3a0e7b] hover:text-white mr-4"
            >
              <AiOutlineSetting size={20} />
            </Button>
            <Login />
          </li>
        </ul>
      </nav>

      <Button
        onClick={handleNav}
        className="block md:hidden hover:bg-[#3a0e7b] hover:text-white"
      >
        {isNav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </Button>

      {/* Mobile drawer panel */}
      <ul
        className={
          isNav
            ? "fixed md:hidden left-0 top-[78px] w-full h-full bg-white ease-in-out duration-500"
            : "ease-in-out w-full duration-500 fixed top-[78px] bottom-0 left-[-100%]"
        }
      >
        {/* Mobile drawer Navigation Items */}
        {NAV_ITEMS.map(navEl => (
          <li key={navEl} className="flex">
            <NavLink
              className="w-full p-4 hover:bg-[#70e2d2] duration-300 cursor-pointer uppercase font-mono  px-6 py-4"
              onClick={handleNav}
              to={NAV[navEl] || "/"}
            >
              {navEl}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;
