import { NavLink } from "react-router-dom";
import { NAV } from "../utils/consts";
import Login from "./Login";

function Header() {
  return (
    <header className="w-full max-h-10 bg-teal-300">
      <nav className="w-full flex justify-between gap-3 px-6">
        <ul className="w-full flex justify-between">
          {Object.keys(NAV).map(nav => (
            <NavLink key={nav} to={NAV[nav] || "/"}>
              {nav}
            </NavLink>
          ))}
        </ul>
        <Login />
      </nav>
    </header>
  );
}

export default Header;
