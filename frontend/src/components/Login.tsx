import { useAuth0 } from "@auth0/auth0-react";

import UserNameNav from "./UserNameNav";
import { Button } from "./UI/button";

function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <span className="hidden sm:inline ml-auto">
      {isAuthenticated ? (
        <UserNameNav />
      ) : (
        <Button
          variant="secondary"
          className="font-bold hover:bg-gray-800 hover:text-white"
          onClick={handleLogin}
          aria-label="Login"
          data-testid="login-button"
        >
          Login
        </Button>
      )}
    </span>
  );
}

export default Login;
