import useSWR from "swr";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useGetFetcher() {
  const { data, error, mutate } = useSWR(
    // "http://www.localhost:8001/people/",
    `${process.env.EXPENSE_API}/people/`,
    fetcher
  );
  return {
    people: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
