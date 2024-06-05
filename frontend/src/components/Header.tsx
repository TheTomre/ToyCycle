import { NavLink } from "react-router-dom";
import { NAV } from "../utils/consts";
import { Button } from "./ui/button";

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
        <Button>Login</Button>
      </nav>
    </header>
  );
}

export default Header;
