
// useTokenData.ts
import { useState, useEffect } from "react";
import { type TokenData } from "./TokenContext";

export const useTokenData = () => {
  const [data, setData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First attempt without authentication
        const response = await fetch(
          "https://11labs-hackathon-tokens.vercel.app/api/tokens",
          {
            credentials: "include", // This ensures cookies are passed
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          // If first attempt fails, try with basic auth
          const promptPassword = () => {
            return prompt("Please enter your password:");
          };

          const password = promptPassword();
          if (!password) {
            throw new Error("Password is required");
          }

          const authString = btoa(`dupa:${password}`);
          const authResponse = await fetch(
            "https://11labs-hackathon-tokens.vercel.app/api/tokens",
            {
              credentials: "include", // This ensures cookies are passed
              headers: {
                Authorization: `Basic ${authString}`,
              },
            }
          );

          if (!authResponse.ok) {
            throw new Error("Failed to fetch data even with authentication");
          }

          const authData = await authResponse.json();
          setData(authData);
        } else {
          const initialData = await response.json();
          setData(initialData);
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
