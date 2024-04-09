import { useBacklog } from "@/provider";
import { Mock, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useIssues } from ".";

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
    expect(mockApi.getIssues).toHaveBeenCalledWith({
      count: 20,
      offset: 0,
    });

    // Check that the hook returns the correct data
    expect(result.current.issues).toEqual(mockIssues);
  });
});
