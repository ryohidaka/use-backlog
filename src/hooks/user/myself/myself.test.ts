import { useBacklog } from "@/provider";
import { renderHook, waitFor } from "@testing-library/react";
import { Mock } from "vitest";
import { useMyself } from "./myself";

vi.mock("@/provider");

describe("useMyself", () => {
  it("fetches an auth user", async () => {
    // Mock the Backlog API
    const mockApi = {
      getMyself: vi.fn(),
    };
    (useBacklog as Mock).mockReturnValue({ backlog: mockApi });

    // Mock the return value of the API call
    const mockUser = { id: 1, name: "Test User" };
    mockApi.getMyself.mockResolvedValue(mockUser);

    // Use the hook
    const { result } = renderHook(() => useMyself());

    // Wait for useSWR to return the data
    await waitFor(() => result.current.myself !== undefined);

    // Check that the API was called with the correct options
    expect(mockApi.getMyself).toHaveBeenCalledWith();

    // Check that the hook returns the correct data
    expect(result.current.myself).toEqual(mockUser);
  });
});
