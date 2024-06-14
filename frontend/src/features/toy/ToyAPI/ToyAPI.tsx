/* eslint-disable no-console */
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
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
    console.log("Toy created successfully");
  }

  if (error) {
    console.error("Failed to create toy", error);
  }
  return { createToy, isLoading };
};
