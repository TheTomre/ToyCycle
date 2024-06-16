import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { API_BASE_URL, ENDPOINT } from "../../../lib/consts";
import { Toy, ToySuccessResponse } from "../toyTypes";

export const useCreateToy = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createToyRequest = async (toyFormData: FormData): Promise<Toy> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}${ENDPOINT.toysMe}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: toyFormData
    });

    if (!response.ok) {
      throw new Error("Failed to create toy");
    }

    const data: ToySuccessResponse = await response.json();
    return data.data;
  };

  const {
    mutate: createToy,
    isSuccess,
    isLoading,
    error
  } = useMutation(createToyRequest);

  if (isSuccess) {
    toast.success("Toy created successfully");
  }

  if (error) {
    toast.error("Failed to create toy");
  }

  return { createToy, isLoading };
};
