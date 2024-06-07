import { useAuth0 } from "@auth0/auth0-react";
import { GrLogin } from "react-icons/gr";
import { AvatarImage, Avatar, AvatarFallback } from "./UI/avatar";
import { Button } from "./UI/button";

function Login() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <span className="">
      {isAuthenticated ? (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{user?.name || "teddy"}</AvatarFallback>
        </Avatar>
      ) : (
        <Button
          className="hover:bg-[#3a0e7b] hover:text-white"
          onClick={handleLogin}
        >
          <GrLogin />
        </Button>
      )}
    </span>
  );
}

export default Login;
