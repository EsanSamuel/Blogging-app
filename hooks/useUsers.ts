import useSWR from "swr";
import fetcher from "@/lib/axios";

const useUsers = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/users", fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useUsers;
