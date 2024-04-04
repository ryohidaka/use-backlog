import { useBacklog } from "@/provider";

import { Project } from "backlog-js/dist/types/option";

import useSWR, { SWRConfiguration } from "swr";

/**
 * useProjects is a custom hook for fetching projects from Backlog.
 * @param {Project.GetProjectsParams} params - The parameters for getting projects.
 * @returns {Object} An object containing the fetched projects and the rest of the response from useSWR.
 */
export const useProjects = (
  params?: Project.GetProjectsParams,
  swrConfig?: SWRConfiguration,
) => {
  // Getting the backlog instance
  const { backlog } = useBacklog();

  // Defining the fetcher function
  const fetcher = async () => {
    if (!backlog) return [];

    // Fetching the projects from Backlog
    const projects = await backlog.getProjects(params);
    return projects;
  };

  // Using the useSWR hook to fetch the data
  const { data: projects, ...rest } = useSWR("projects", fetcher, swrConfig);

  // Returning the fetched projects and the rest of the response
  return { projects, ...rest };
};
