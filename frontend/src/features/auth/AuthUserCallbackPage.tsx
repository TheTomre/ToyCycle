import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import useCreateUserQuery from "./apiService/UserApi";
import Loader from "../../components/Loader";

function AuthUserCallbackPage() {
  const navigate = useNavigate();
  const refCurrentUser = useRef(false);

  const { user } = useAuth0();
  const { createUser } = useCreateUserQuery();

  useEffect(() => {
    if (user?.sub && user?.email) {
      createUser({ auth0Id: user.sub, email: user.email });
      refCurrentUser.current = true;
    }
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.sub, createUser]);

  return (
    <div>
      <Loader />
    </div>
  );
}

export default AuthUserCallbackPage;
