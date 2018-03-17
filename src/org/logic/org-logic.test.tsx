import {
  fullOrgNodeList,
  getOrgNodeById,
  getDirectReportsOfOrgNode,
  getOrgLevelOne,
  getAllSupervisorNodes,
  getOrgWithHorizontal,
  getIterativeSupervisors,
  findOrgTopSupervisor,
  getOrgBySupervisor,
  getNextSupervisorNode,
  assignLevel
} from "./org-logic";
import { OrgNode, OrgSectionNode } from "../types/org.types";
import {
  createOrgNode,
  createOrg,
  createOrdNodeWithSup,
  createOrgSection,
  fakeOrg,
  fullTgt,
  fakeOrgHorizontal,
  createOrdNodeWithSupFiltered,
  createOrgSectionNode
} from "./testHelpers/fake-org-generator";

describe("fullOrgNodeList", () => {
  it("should create the full organization list", () => {
    expect(fullOrgNodeList(fakeOrg)).toEqual(fullTgt);
  });
});

// NOMOCK: could use a two item OrgNode[]
describe("getOrgNodeById", () => {
  it("should get an OrgNode by positionId", () => {
    const expected: OrgNode = createOrgNode({
      positionId: 1,
      supervisorPositionId: 0
    });
    expect(getOrgNodeById(fakeOrg, 1)).toEqual(expected);
  });
});

// NOMOCK: could use a two item OrgNode[]
describe("getDirectReportsOfOrgNode", () => {
  it("should get OrgNode[] by supervisorPositionId", () => {
    const expected: OrgNode[] = createOrg([
      { positionId: 4, supervisorPositionId: 3 },
      { positionId: 5, supervisorPositionId: 3 }
    ]);
    expect(getDirectReportsOfOrgNode(fakeOrg, 3)).toEqual(expected);
  });
});

describe("assignLevel", () => {
  it("should convert an OrgNode into and OrgSectionNode with a given level", () => {
    const expected: OrgSectionNode = createOrgSectionNode({
      positionId: 1,
      supervisorPositionId: 0,
      orgLevel: 7,
      orgSort: "org-sort-string"
    });
    const startingOrgNode = createOrgNode({
      positionId: 1,
      supervisorPositionId: 0,
      orgSort: "org-sort-string"
    });
    const actual = assignLevel(startingOrgNode, 7);
    expect(actual).toEqual(expected);
  });
});

describe("getOrgLevelOne", () => {
  it("should map an OrgNode[] to OrgSectionNode[] with orgLevel as 1 for each", () => {
    const expected: OrgSectionNode[] = createOrgSection(
      [
        [1, 0, 1],
        [2, 1, 1],
        [3, 1, 1],
        [4, 3, 1],
        [5, 3, 1],
        [6, 4, 1],
        [7, 2, 1]
      ].map(item => ({
        positionId: item[0],
        supervisorPositionId: item[1],
        orgLevel: item[2]
      }))
    );
    expect(getOrgLevelOne(fakeOrg)).toEqual(expected);
  });
});

describe("getAllSupervisorNodes", () => {
  it("should get all supervisors", () => {
    const expected: OrgSectionNode[] = createOrgSection(
      [[4, 3, 1], [4, 1, 2], [4, 0, 3]].map(item => ({
        positionId: item[0],
        supervisorPositionId: item[1],
        orgLevel: item[2]
      }))
    );
    expect(getAllSupervisorNodes(fakeOrg[3], fakeOrg)).toEqual(expected);
  });
});

describe("getNextSupervisorNode", () => {
  it("should get next level supervisor OrgNode", () => {
    expect(
      getNextSupervisorNode(
        fakeOrg,
        Object.assign({}, fakeOrg[3], { orgLevel: 1 })
      )
    ).toEqual(fakeOrg[2]);
  });
});

const fakeOrgForSup3 = createOrg([
  { positionId: 4, supervisorPositionId: 3 },
  { positionId: 5, supervisorPositionId: 3 },
  { positionId: 6, supervisorPositionId: 4 }
]);

const fakeOrgForSup3Horizontal = [
  { positionId: 4, supervisorPositionId: 3, allSupervisors: [3, 4] },
  { positionId: 5, supervisorPositionId: 3, allSupervisors: [3, 5] },
  { positionId: 6, supervisorPositionId: 4, allSupervisors: [3, 4, 6] }
].map(createOrdNodeWithSup);

const filteredEeList3 = [
  { positionId: 4, supervisorPositionId: 3, allSupervisors: [3, 4] }, // orgLevel was 1
  { positionId: 5, supervisorPositionId: 3, allSupervisors: [3, 5] }, // orgLevel was 1
  { positionId: 6, supervisorPositionId: 4, allSupervisors: [3, 4, 6] } // orgLevel was 2
].map(createOrdNodeWithSupFiltered);

describe("horizontal organization functions", () => {
  it("should add orgSort and allSupervisors properties", () => {
    expect(getOrgWithHorizontal(fakeOrg)).toEqual(fakeOrgHorizontal);
  });

  describe("getIterativeSupervisors", () => {
    it("should get the horizontal org for an org node", () => {
      const expected = createOrdNodeWithSup({
        positionId: 6,
        supervisorPositionId: 4,
        allSupervisors: [0, 1, 3, 4, 6]
      });
      expect(getIterativeSupervisors(fakeOrg[5], fakeOrg)).toEqual(expected);
    });
  });

  describe("getOrgWithHorizontal", () => {
    it("should be able to do a filtered organization", () => {
      expect(getOrgWithHorizontal(fakeOrgForSup3)).toEqual(
        fakeOrgForSup3Horizontal
      );
    });
  });

  describe("findOrgTopSupervisor", () => {
    it("should get the top position", () => {
      expect(findOrgTopSupervisor(fakeOrg)).toEqual(0);
    });
  });

  describe("getOrgBySupervisor", () => {
    it("should filter the organization", () => {
      expect(getOrgBySupervisor(fakeOrg, 3)).toEqual(filteredEeList3);
    });
  });
});

// const employees: Employee[] = [
//   { employeeId: 101, employeeName: 'employee 101' },
//   { employeeId: 102, employeeName: 'employee 102' },
//   {
//     employeeId: 103,
//     employeeName: 'employee 103',
//   },
//   {
//     employeeId: 104,
//     employeeName: 'employee 104',
//   },
//   { employeeId: 105, employeeName: 'employee 105' },
//   {
//     employeeId: 106,
//     employeeName: 'employee 106',
//   },
//   { employeeId: 107, employeeName: 'employee 107' },
// ];

// describe('combining organization and employee data', () => {
//   it('should map callback that maps the employees to an organization', () => {
//     const expected = {
//       positionId: 2,
//       supervisorPositionId: 1,
//       allSupervisors: undefined,
//       orgSort: undefined,
//       employeeId: 102,
//       employeeName: 'employee 102',
//     };
//     const actual = fakeOrg.map(addEmployeeInfoToOrganizationNode(employees))[1];
//     expect(actual).toEqual(expected);
//   });
// });
