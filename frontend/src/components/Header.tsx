import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import "../index.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import { NAV, NAV_ITEMS } from "../lib/consts";
import { Button } from "./UI/button";
import { useAppDispatch } from "../hooks/redux";
import { toggleNav } from "../store/uiSlice";

type Props = {
  className?: string;
};

function Header({ className }: Props) {
  const [isNav, setIsNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const handleNav = () => {
    setIsNav(prev => !prev);
    dispatch(toggleNav());
  };

  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <header
      className={`bg-white shadow-b-md flex  justify-between self-center items-center px-4 text-[#3a0e7b] fixed top-0 z-50 w-full  text-center   ${className}`}
    >
      <nav className="w-full flex justify-between items-center mx-auto gap-3 px-3 py-2 sm:px-6 sm:py-6 max-w-[1440px]">
        {/* Desktop Navigation Items */}
        <ul className="w-full hidden md:flex items-center justify-between">
          <li>
            <Button
              variant="destructive"
              onClick={handleNavigateHome}
              className="w-16 h-16 p-0 bg-cover bg-norepeat bg-[url('./assets/icons/logo.svg')] hover:rotate-90 transition-all duration-300"
            />
          </li>
          {NAV_ITEMS.map(navEl => {
            const nav = navEl === "home" ? "/" : `/${navEl}`;
            if (navEl === "exchange" && !isAuthenticated) {
              return (
                <li
                  key={navEl}
                  className={`font-mono text-lg sm:text-xl  uppercase menu-item ${location.pathname === nav ? "active" : ""}`}
                >
                  <Button
                    className={`border-0 shadow-none font-mono text-xl sm:text-2xl  uppercase menu-item ${location.pathname === nav ? "active" : ""}`}
                    onClick={handleLogin}
                  >
                    {navEl}
                  </Button>
                </li>
              );
            }
            return (
              <li
                key={navEl}
                className={`font-mono text-xl sm:text-2xl  uppercase menu-item ${location.pathname === nav ? "active" : ""}`}
              >
                <NavLink to={NAV[navEl] || "/"}>{navEl}</NavLink>
              </li>
            );
          })}
          <li>
            <Login />
          </li>
        </ul>
        {/* Modile Navigation Items */}
        <ul className="w-full md:hidden flex  items-center justify-between">
          <li>
            <Button
              variant="destructive"
              onClick={handleNavigateHome}
              className="w-14 h-14 p-0 bg-cover bg-norepeat bg-[url('./assets/icons/logo.svg')] hover:rotate-90 transition-all duration-300"
            />
          </li>
          {/* <li>
            <NavLink
              className="uppercase text-lg sm:text-xl font-mono font-semibold"
              to={NAV["toys"] || "/"}
            >
              Toys
            </NavLink>
          </li> */}
          <li>
            <Login />
          </li>
        </ul>
      </nav>

      <Button
        onClick={handleNav}
        className="block md:hidden hover:bg-[#3a0e7b] hover:text-white h-[48px]"
      >
        {isNav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </Button>

      {/* Mobile drawer panel */}
      <ul
        className={
          isNav
            ? "fixed md:hidden left-0 top-[118px] w-full h-full bg-white ease-in-out duration-500"
            : "ease-in-out w-full duration-500 fixed top-[118px] bottom-0 left-[-100%]"
        }
      >
        {/* Mobile drawer Navigation Items */}
        {NAV_ITEMS.map(navEl => (
          <li key={navEl} className="flex">
            <NavLink
              className="text-left text-2xl w-full p-5 hover:bg-[#70e2d2] duration-300 cursor-pointer uppercase font-mono  px-6 py-4"
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
