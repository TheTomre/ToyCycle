import { useAuth0 } from "@auth0/auth0-react";

function UserNameNav() {
  const { user } = useAuth0();
  return <span>{user?.email}</span>;
}

export default UserNameNav;
