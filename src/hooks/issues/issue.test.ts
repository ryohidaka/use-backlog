import { useBacklog } from "@/provider";
import { Mock, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useIssue, useIssues } from ".";

vi.mock("@/provider");

describe("useIssues", () => {
  it("fetches issues using the provided options", async () => {
    // Mock the Backlog API
    const mockApi = {
      getIssues: vi.fn(),
    };
    (useBacklog as Mock).mockReturnValue({ backlog: mockApi });

    // Mock the return value of the API call
    const mockIssues = [{ id: 1, key_id: 1, summary: "Test Issue" }];
    mockApi.getIssues.mockResolvedValue(mockIssues);

    // Use the hook
    const { result } = renderHook(() => useIssues());

    // Wait for useSWRInfinite to return the data
    await waitFor(() => result.current.issues !== undefined);

    // Check that the API was called with the correct options
    expect(mockApi.getIssues).toHaveBeenCalledWith(undefined);

    // Check that the hook returns the correct data
    expect(result.current.issues).toEqual(mockIssues);
  });
});

describe("useIssue", () => {
  it("fetches an issue from Backlog using the provided ID or key", async () => {
    // Mock the Backlog API
    const mockApi = {
      getIssue: vi.fn(),
    };
    (useBacklog as Mock).mockReturnValue({ backlog: mockApi });

    // Mock the return value of the API call
    const mockIssue = { id: 1, key_id: 1, summary: "Test Issue" };
    mockApi.getIssue.mockResolvedValue(mockIssue);

    // Use the hook
    const { result } = renderHook(() => useIssue("TEST-123"));

    // Wait for useSWR to return the data
    await waitFor(() => result.current.issue !== undefined);

    // Check that the API was called with the correct options
    expect(mockApi.getIssue).toHaveBeenCalledWith("TEST-123");

    // Check that the hook returns the correct data
    expect(result.current.issue).toEqual(mockIssue);
  });
});
