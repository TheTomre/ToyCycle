import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { API_BASE_URL, ENDPOINT } from "../../../lib/consts";
import { User } from "../../user/userTypes";

type CreateUserRequest = Pick<User, "email" | "auth0Id">;

function useCreateUserQuery() {
  const { getAccessTokenSilently } = useAuth0();

  async function createUserRequest(request: CreateUserRequest) {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}${ENDPOINT.me}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  }
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess
  } = useMutation(createUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess
  };
}

type UpdateUserRequest = {
  email?: string | undefined;
  bio?: string | undefined;
  firstName: string;
  lastName: string;
  avatar?: string | undefined;
  lastActive?: string | undefined;
  tokenBalance?: number | undefined;
  address: {
    city: string;
    country: string;
    street1: string;
    street2?: string | undefined;
    zipcode: string;
  };
};

export function useUpdateUserQuery() {
  const { getAccessTokenSilently } = useAuth0();

  async function updateUserRequest(userData: UpdateUserRequest) {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}${ENDPOINT.me}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  }

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    isError,
    error,
    reset
  } = useMutation(updateUserRequest);

  return {
    updateUser,
    isLoading,
    isSuccess,
    isError,
    error,
    reset
  };
}

export default useCreateUserQuery;
