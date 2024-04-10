import { useBacklog } from "@/provider";
import useSWR, { SWRConfiguration } from "swr";

/**
 * useMyself is a custom hook for fetching an auth user data from Backlog.
 *
 * @param {SWRConfiguration} swrConfig - The configuration object for SWR.
 * @returns {Object} The fetched myself and the rest of the response from useSWR.
 */
export const useMyself = (swrConfig?: SWRConfiguration) => {
  // Getting the backlog instance
  const { backlog } = useBacklog();

  // Defining the fetcher function
  const fetcher = async () => {
    if (!backlog) return null;

    // Fetching the project from Backlog
    const myself = await backlog.getMyself();
    return myself;
  };

  // Using the useSWR hook to fetch the data
  const { data: myself, ...rest } = useSWR("myself", fetcher, swrConfig);

  // Returning the fetched project and the rest of the response
  return { myself, ...rest };
};
