import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUiStore } from "../../Zustand";

export function useGlobalQuery<TData>(
  queryKey: string[],
  queryFn: () => Promise<TData>
) {
  const { setLoading, setError } = useUiStore();

  const result = useQuery<TData, Error>({
    queryKey,
    queryFn,
  });

  useEffect(() => {
    console.log("Query state:", {
      isLoading: result.isLoading,
      isError: result.isError,
      isSuccess: result.isSuccess, // Add this for debugging
      data: result.data, // Add this for debugging
    });

    // Always sync loading state
    setLoading(result.isLoading);

    // Handle error state
    if (result.isError) {
      setError(result.error?.message || "An error occurred");
    } else {
      setError(null);
    }
  }, [
    result.isLoading,
    result.isError,
    result.isSuccess, // Add this dependency
    result.error?.message,
    setLoading,
    setError,
  ]);

  return result;
}
