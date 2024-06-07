/* eslint-disable no-console */
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { ReactNode } from "react";
import useCreateUserQuery from "../apiService/UserApi";

type Auth0ProviderWithNavigateProps = {
  children: ReactNode;
};
function Auth0ProviderWithNavigate({
  children
}: Auth0ProviderWithNavigateProps) {
  const domain = import.meta.env["VITE_AUTH0_DOMAIN"] ?? "";
  const clientId = import.meta.env["VITE_AUTH0_CLIENT_ID"] ?? "";
  const redirectUri = import.meta.env["VITE_AUTH0_CALLBACK_URL"] ?? "";

  const { createUser } = useCreateUserQuery();

  if (!domain || !clientId || !redirectUri) {
    throw new Error("unable to retrieve Auth0 configuration.");
  }

  const onRedirectCallack = (appState?: AppState, user?: User) => {
    if (!user?.sub || !user?.email) return;

    createUser({ auth0Id: user.sub, email: user.email });
    console.log("USER:", user);
    console.log("appState:", appState);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallack}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;
