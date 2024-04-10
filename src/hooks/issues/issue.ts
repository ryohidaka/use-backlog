import { useBacklog } from "@/provider";
import { getCount } from "@/utils";
import { Issue as IssueEntity } from "backlog-js/dist/types/entity";
import { Issue as IssueOption } from "backlog-js/dist/types/option";
import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

/**
 * `useIssues` is a custom hook for fetching issues from Backlog.
 * @param {IssueOption.GetIssuesParams} params - The parameters for getting issues.
 * @param {SWRInfiniteConfiguration} swrConfig - The configuration options for SWR.
 * @returns {Object} An object containing the fetched issues and the rest of the response from useSWRInfinite.
 */
export const useIssues = (
  params?: IssueOption.GetIssuesParams,
  swrConfig?: SWRInfiniteConfiguration,
) => {
  // Get the backlog instance
  const { backlog } = useBacklog();

  // Check if params.count is undefined or NaN, if so, set it to 20
  const { count, paramsString } = useMemo(() => {
    const count = getCount(params?.count);
    const paramsString = JSON.stringify(params);
    return { count, paramsString };
  }, [params]);

  // Define the getKey function
  const getKey = (pageIndex: number, previousPageData: IssueEntity.Issue[]) => {
    // If the previous page data is not empty and its length is less than count, return null to stop pagination
    if (previousPageData && previousPageData.length < count) return null;
    return [pageIndex, paramsString];
  };

  // Define the fetcher function
  const fetcher = async (
    pageIndex: any[],
    previousPageData: IssueEntity.Issue[],
  ) => {
    if (!backlog) return [];
    // If the previous page data was not empty but the length is less than count, return an empty array to stop pagination
    if (previousPageData && previousPageData.length < count) return [];

    // Fetch the issues from Backlog
    const issues = await backlog.getIssues({
      ...params,
      count,
      offset: parseInt(pageIndex[0], 10) * count,
    });

    return issues;
  };

  // Use the useSWRInfinite hook to fetch the data
  const { data: issues, ...rest } = useSWRInfinite(getKey, fetcher, swrConfig);

  // Return the fetched issues and the rest of the response
  return { issues: issues?.flat() as IssueEntity.Issue[], ...rest };
};

/**
 * useIssue is a custom hook for fetching an issue from Backlog.
 *
 * @param {string | number} issueIdOrKey - The ID or key of the issue to fetch.
 * @param {SWRConfiguration} swrConfig - The configuration object for SWR.
 * @returns {Object} The fetched issue and the rest of the response from useSWR.
 */
export const useIssue = (
  issueIdOrKey: string | number,
  swrConfig?: SWRConfiguration,
) => {
  // Getting the backlog instance
  const { backlog } = useBacklog();

  // Defining the fetcher function
  const fetcher = async () => {
    if (!backlog) return null;
    // Fetching the issue from Backlog
    const issue = await backlog.getIssue(issueIdOrKey);
    return issue;
  };

  // Define the cache key for useSWR
  const key = `issue-${issueIdOrKey}`;

  // Using the useSWR hook to fetch the data
  const { data: issue, ...rest } = useSWR(key, fetcher, swrConfig);

  // Returning the fetched issue and the rest of the response
  return { issue, ...rest };
};
