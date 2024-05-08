import { useBacklog } from "@/provider";
import { Issue as IssueOption } from "backlog-js/dist/types/option";
import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";

/**
 * `useIssues` is a custom hook for fetching issues from Backlog.
 * @param {IssueOption.GetIssuesParams} params - The parameters for getting issues.
 * @param {SWRConfiguration} swrConfig - The configuration options for SWR.
 * @returns {Object} An object containing the fetched issues and the rest of the response from useSWRInfinite.
 */
export const useIssues = (
  params?: IssueOption.GetIssuesParams,
  swrConfig?: SWRConfiguration,
) => {
  // Getting the backlog instance
  const { backlog } = useBacklog();

  // Define the cache key for useSWR
  const key = useMemo(() => {
    if (!backlog) return null;

    return `issues-${JSON.stringify(params)}`;
  }, [backlog, params]);

  // Defining the fetcher function
  const fetcher = async () => {
    if (!backlog) return [];

    // Fetch the issues from Backlog
    const issues = await backlog.getIssues(params);
    return issues;
  };

  // Using the useSWR hook to fetch the data
  const { data: issues, ...rest } = useSWR(key, fetcher, swrConfig);

  // Return the fetched issues and the rest of the response
  return { issues, ...rest };
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

  // Define the cache key for useSWR
  const key = useMemo(() => {
    return backlog ? `issue-${issueIdOrKey}` : null;
  }, [backlog]);

  // Defining the fetcher function
  const fetcher = async () => {
    if (!backlog) return null;
    // Fetching the issue from Backlog
    const issue = await backlog.getIssue(issueIdOrKey);
    return issue;
  };

  // Using the useSWR hook to fetch the data
  const { data: issue, ...rest } = useSWR(key, fetcher, swrConfig);

  // Returning the fetched issue and the rest of the response
  return { issue, ...rest };
};
