/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";

// Define the shape of the options object for our hook.
interface UseMutateOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

// Define the type of the returned object.
interface MutateState<T, K> {
  data: T | null;
  loading: boolean;
  error: string | null;
  mutate: (
    body: K,
    method: "POST" | "PUT" | "PATCH" | "DELETE"
  ) => Promise<void>;
}

export function useMutate<T, K>(
  url: string,
  options: UseMutateOptions = {}
): MutateState<T, K> {
  const { onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (body: K, method: "POST" | "PUT" | "PATCH" | "DELETE") => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "فشل في العملية");
        }

        const result: T = await response.json();
        setData(result);
        if (onSuccess) {
          onSuccess(result);
        }
      } catch (err: any) {
        setError(err.message);
        if (onError) {
          onError(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [url, onSuccess, onError]
  );

  return { data, loading, error, mutate };
}
