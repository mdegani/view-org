import {
  padOrgSortStringSegment,
  getNumberLength,
  createOrgSortString
} from "./fake-org-generator";

describe("the fake org generator", () => {
  describe("createOrgSortString", () => {
    it("should return a sort string for a series", () => {
      const expected = "0000000123-0000001234-0000012345";
      const actual = createOrgSortString([123, 1234, 12345]);
      expect(actual).toEqual(expected);
    });
    it("should return for a single number", () => {
      const expected = "0000000123";
      const actual = createOrgSortString([123]);
      expect(actual).toEqual(expected);
    });
  });
  describe("getNumberLength", () => {
    it("should get the length of a number as a string", () => {
      const expected = 3;
      const actual = getNumberLength(100);
      expect(actual).toEqual(expected);
    });
  });
  describe("padOrgSortStringSegment", () => {
    it("should pad", () => {
      const expected = "0000000100";
      const actual = padOrgSortStringSegment(100, "0000000000");
      expect(actual).toEqual(expected);
    });
  });
});
