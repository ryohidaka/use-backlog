import { useBacklog } from "@/provider";

import { Project } from "backlog-js/dist/types/option";
import { useMemo } from "react";

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

  // Define the cache key for useSWR
  const key = useMemo(() => {
    if (!backlog) return null;

    return `projects-${JSON.stringify(params)}`;
  }, [backlog, params]);

  // Defining the fetcher function
  const fetcher = async () => {
    if (!backlog) return [];

    // Fetching the projects from Backlog
    const projects = await backlog.getProjects(params);
    return projects;
  };

  // Using the useSWR hook to fetch the data
  const { data: projects, ...rest } = useSWR(key, fetcher, swrConfig);

  // Returning the fetched projects and the rest of the response
  return { projects, ...rest };
};

/**
 * useProject is a custom hook that fetches a project from Backlog.
 *
 * @param {string | number} projectIdOrKey - The ID or key of the project to fetch.
 * @returns {Object} An object containing the fetched project and the rest of the response.
 */
export const useProject = (
  projectIdOrKey: string | number,
  swrConfig?: SWRConfiguration,
) => {
  // Getting the backlog instance
  const { backlog } = useBacklog();

  // Defining the fetcher function
  const fetcher = async () => {
    if (!backlog) return undefined;
    // Fetching the project from Backlog
    const project = await backlog.getProject(projectIdOrKey);
    return project;
  };

  // Define the cache key for useSWR
  const key = useMemo(() => {
    return backlog ? `project-${projectIdOrKey}` : null;
  }, [backlog]);

  // Using the useSWR hook to fetch the data
  const { data: project, ...rest } = useSWR(key, fetcher, swrConfig);

  // Returning the fetched project and the rest of the response
  return { project, ...rest };
};
