import { NavLink } from "react-router-dom";
import { NAV } from "../utils/consts";

function Header() {
  return (
    <header className="w-full">
      <nav className="w-full">
        <ul className="w-full flex justify-evenly">
          {Object.keys(NAV).map(nav => (
            <NavLink key={nav} to={NAV[nav] || "/"}>
              {nav}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
