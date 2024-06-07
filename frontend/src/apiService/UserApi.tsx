import { useMutation } from "react-query";
import { API_BASE_URL, ENDPOINT } from "../lib/consts";
import { User } from "../features/user/userTypes";

type CreateUserRequest = Pick<User, "email" | "auth0Id">;

function useCreateUserQuery() {
  async function createUserRequest(request: CreateUserRequest) {
    const response = await fetch(`${API_BASE_URL}${ENDPOINT.me}`, {
      method: "POST",
      headers: {
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

export default useCreateUserQuery;
