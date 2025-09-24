/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";

// Define the shape of the options object for our hook
interface UseDataFetcherOptions {
  pollingInterval?: number; // In milliseconds
  debounceTime?: number; // In milliseconds
  retryCount?: number; // Number of retries on failure
  cacheTime?: number; // Cache expiration time in milliseconds
}

// Define the type of the returned object
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Define the cache structure
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function useDataFetcher<T>(
  url: string,
  options: UseDataFetcherOptions = {}
): FetchState<T> {
  const {
    pollingInterval = 0,
    debounceTime = 0,
    retryCount = 0,
    cacheTime = 0,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const retryAttempts = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1);
  }, []);

  const fetchData = useCallback(async () => {
    // 1. Check cache first
    const cachedData = cache.get(url);
    if (cachedData && Date.now() - cachedData.timestamp < cacheTime) {
      setData(cachedData.data);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: T = await response.json();
      setData(result);
      // Cache the data
      if (cacheTime > 0) {
        cache.set(url, { data: result, timestamp: Date.now() });
      }
      retryAttempts.current = 0; // Reset retry count on success
    } catch (err: any) {
      if (retryAttempts.current < retryCount) {
        retryAttempts.current++;
        // Retry immediately after a brief delay
        setTimeout(() => fetchData(), 500);
      } else {
        setError(err.message);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  }, [url, retryCount, cacheTime]);

  useEffect(() => {
    // Polling logic
    if (pollingInterval > 0) {
      const intervalId = setInterval(() => {
        fetchData();
      }, pollingInterval);
      return () => clearInterval(intervalId);
    }
  }, [pollingInterval, fetchData]);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    // Debouncing logic
    if (debounceTime > 0) {
      timeoutId.current = setTimeout(() => {
        fetchData();
      }, debounceTime);
    } else {
      fetchData(); // Fetch immediately if no debounce
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [url, debounceTime, refetchTrigger, fetchData]);

  return { data, loading, error, refetch };
}
