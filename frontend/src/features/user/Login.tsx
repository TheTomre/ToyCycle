import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with Auth0</button>
    </div>
  );
}

export default Login;
