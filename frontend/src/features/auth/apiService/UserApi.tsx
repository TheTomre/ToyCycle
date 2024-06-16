import { useMutation, useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { API_BASE_URL, ENDPOINT } from "../../../lib/consts";
import { User } from "../../user/userTypes";
import { Toy } from "../../toy/toyTypes";

type CreateUserRequest = Pick<User, "email" | "auth0Id">;
type UserSuccessResponse = {
  status: string;
  data: User;
};
type UserToysResponse = {
  status: string;
  data: Toy[];
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}${ENDPOINT.me}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

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
};

type UpdateUserRequest = {
  email?: string | undefined;
  bio: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  street1: string;
  street2?: string | undefined;
  zipcode: string;
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (
    formData: UpdateUserRequest
  ): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}${ENDPOINT.me}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    const data: UserSuccessResponse = await response.json();
    return data.data;
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}${ENDPOINT.me}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data: UserSuccessResponse = await response.json();
    return data.data;
  };

  const {
    data: currentUser,
    isLoading,
    error
  } = useQuery("fetchCurrentUser", getUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

export const useGetUserToys = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserToysRequest = async (): Promise<Toy[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}${ENDPOINT.me}/toys`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user toys");
    }

    const data: UserToysResponse = await response.json();
    return data.data;
  };

  return useQuery("userToys", getUserToysRequest);
};
