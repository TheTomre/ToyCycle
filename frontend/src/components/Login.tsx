import { useAuth0 } from "@auth0/auth0-react";
import { GrLogout, GrLogin } from "react-icons/gr";
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
        <>
          <Avatar className=" w-9 h-9">
            <AvatarImage src={user?.picture || "./assets/icons/avatar.svg"} />

            <AvatarFallback>
              <span className="block p-0 bg-cover w-9 h-9  bg-norepeat bg-[url('./assets/icons/avatar.svg')]" />
            </AvatarFallback>
          </Avatar>
          <Button
            className="hover:bg-[#3a0e7b] hover:text-white"
            onClick={handleLogout}
          >
            <GrLogout />
          </Button>
        </>
      ) : (
        <>
          <Avatar className="w-9 h-9">
            <span className="block p-0 w-9 h-9 bg-cover bg-norepeat bg-[url('./assets/icons/avatar.svg')]" />
          </Avatar>
          <Button
            className="hover:bg-[#3a0e7b] hover:text-white"
            onClick={handleLogin}
          >
            <GrLogin />
          </Button>
        </>
      )}{" "}
    </span>
  );
}

export default Login;
