import { useAuth0 } from "@auth0/auth0-react";
import { GrLogout, GrLogin } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
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
    <span className="">
      {isAuthenticated ? (
        <>
          <Avatar>
            <AvatarImage src={user?.picture || "../assets/react.svg"} />
            <AvatarFallback>JD</AvatarFallback>
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
          <Avatar>
            <AvatarImage>
              <FaUserAlt />
            </AvatarImage>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button
            className="hover:bg-[#3a0e7b] hover:text-white"
            onClick={handleLogin}
          >
            <GrLogin />
          </Button>
        </>
      )}
    </span>
  );
}

export default Login;
