import api from "@/utils/interceptor";
import { useEffect, useState } from "react";

const useFetchData = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(endpoint);
        setData(response.data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "There's something wrong, try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useFetchData;
