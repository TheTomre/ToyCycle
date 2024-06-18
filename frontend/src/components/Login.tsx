import { useAuth0 } from "@auth0/auth0-react";
import { GrLogout, GrLogin } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AvatarImage, Avatar, AvatarFallback } from "./UI/avatar";
import { Button } from "./UI/button";

function Login() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <span className="flex gap-6 sm:gap-4">
      {isAuthenticated ? (
        <Link to="/profile" className="flex gap-2 sm:gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.picture || "./assets/icons/avatar.svg"} />

            <AvatarFallback>
              <span className="block p-0 bg-cover w-12 h-12  bg-norepeat bg-[url('./assets/icons/avatar.svg')]" />
            </AvatarFallback>
          </Avatar>
          <Button
            className="hover:bg-[#3a0e7b] hover:text-white w-12 h-12"
            onClick={handleLogout}
          >
            <GrLogout size={30} />
          </Button>
        </Link>
      ) : (
        <>
          <Avatar className="w-12 h-12">
            <span className="block p-0 w-12 h-12 bg-cover bg-norepeat bg-[url('./assets/icons/avatar.svg')]" />
          </Avatar>
          <Button
            className="hover:bg-[#3a0e7b] hover:text-white w-12 h-12"
            onClick={handleLogin}
          >
            <GrLogin size={30} />
          </Button>
        </>
      )}{" "}
    </span>
  );
}

export default Login;
