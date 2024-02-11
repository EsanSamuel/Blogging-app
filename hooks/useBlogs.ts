import useSWR from "swr";
import fetcher from "@/lib/axios";

const useBlogs = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/blog", fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useBlogs;
