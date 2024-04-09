import { getCount } from ".";

describe("getCount function", () => {
  it("should return the count when it is a number", () => {
    const count = 10;
    const result = getCount(count);
    expect(result).to.equal(count);
  });

  it("should return the default limit when count is undefined", () => {
    const result = getCount(undefined);
    expect(result).to.equal(20);
  });
});
