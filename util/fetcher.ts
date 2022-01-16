import useSWR from "swr";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useGetFetcher() {
  const { data, error } = useSWR("http://www.localhost:8000/people/", fetcher);
  return {
    people: data,
    isLoading: !error && !data,
    isError: error,
  };
}
