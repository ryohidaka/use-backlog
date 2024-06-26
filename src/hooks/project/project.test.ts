import { useBacklog } from "@/provider";
import { useProject, useProjects } from ".";
import { Mock, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("@/provider");

describe("useProjects", () => {
  it("fetches projects using the provided options", async () => {
    // Mock the Backlog API
    const mockApi = {
      getProjects: vi.fn(),
    };
    (useBacklog as Mock).mockReturnValue({ backlog: mockApi });

    // Mock the return value of the API call
    const mockProjects = [{ id: 1, name: "Test Project" }];
    mockApi.getProjects.mockResolvedValue(mockProjects);

    // Use the hook
    const { result } = renderHook(() => useProjects());

    // Wait for useSWR to return the data
    await waitFor(() => result.current.projects !== undefined);

    // Check that the API was called with the correct options
    expect(mockApi.getProjects).toHaveBeenCalledWith(undefined);

    // Check that the hook returns the correct data
    expect(result.current.projects).toEqual(mockProjects);
  });
});

describe("useProject", () => {
  it("fetches project using the provided projectIdOrKey", async () => {
    // Mock the Backlog API
    const mockApi = {
      getProject: vi.fn(),
    };
    (useBacklog as Mock).mockReturnValue({ backlog: mockApi });

    // Mock the return value of the API call
    const mockProject = { id: 1, name: "Test Project" };
    mockApi.getProject.mockResolvedValue(mockProject);

    // Use the hook
    const { result } = renderHook(() => useProject(1));

    // Wait for useSWR to return the data
    await waitFor(() => result.current.project !== undefined);

    // Check that the API was called with the correct options
    expect(mockApi.getProject).toHaveBeenCalledWith(1);

    // Check that the hook returns the correct data
    expect(result.current.project).toEqual(mockProject);
  });
});
