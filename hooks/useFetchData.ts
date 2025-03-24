import api from "@/utils/interceptor";
import { useCallback, useEffect, useState } from "react";

const useFetchData = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "There's something wrong, try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetchData;
