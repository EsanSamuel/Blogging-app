import useSWR from "swr";
import fetcher from "@/lib/axios";

const useRoutes = (api: string) => {
  const { data, isLoading, error, mutate } = useSWR(api, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useRoutes;
