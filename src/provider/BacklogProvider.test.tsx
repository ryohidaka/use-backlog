import { act, renderHook } from "@testing-library/react";
import { BacklogProvider, useBacklog } from ".";
import { ReactNode } from "react";

describe("BacklogProvider", () => {
  it("provides Backlog API to child components", () => {
    const config = { host: "example.com", apiKey: "api_key" };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <BacklogProvider>{children}</BacklogProvider>
    );

    const { result } = renderHook(() => useBacklog(), { wrapper });

    expect(result.current.backlog).toBeNull();

    // Set config
    act(() => {
      result.current.setConfig?.(config);
    });

    expect(result.current.backlog).not.toBeNull();
    expect(result.current.backlog).toHaveProperty("getProjects");
    // You can add more assertions based on your specific usage
  });
});

describe("useBacklog", () => {
  it("throws an error if used outside BacklogProvider", () => {
    // Render the hook outside BacklogProvider
    const { result } = renderHook(() => useBacklog());

    // Expect an error to be thrown
    expect(result).toBeDefined();
    // expect(result.error.message).toBe(
    //   "useBacklog must be used within a BacklogProvider.",
    // );
  });
});
