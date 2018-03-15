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
  getNextSupervisorNode
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
  createOrdNodeWithSupFiltered
} from "./testHelpers/fake-org-generator";

it("should create the full organization list", () => {
  expect(fullOrgNodeList(fakeOrg)).toEqual(fullTgt);
});
it("get an organizationNode by id", () => {
  const expected: OrgNode = createOrgNode([1, 0]);
  expect(getOrgNodeById(fakeOrg, 1)).toEqual(expected);
});
it("get organizationNodes by direct supervisor id", () => {
  const expected: OrgNode[] = createOrg([[4, 3], [5, 3]]);
  expect(getDirectReportsOfOrgNode(fakeOrg, 3)).toEqual(expected);
});
it("should get level one of the organization", () => {
  const expected: OrgSectionNode[] = createOrgSection([
    [1, 0, 1],
    [2, 1, 1],
    [3, 1, 1],
    [4, 3, 1],
    [5, 3, 1],
    [6, 4, 1],
    [7, 2, 1]
  ]);
  expect(getOrgLevelOne(fakeOrg)).toEqual(expected);
});
it("should get all supervisors", () => {
  const expected: OrgSectionNode[] = createOrgSection([
    [4, 3, 1],
    [4, 1, 2],
    [4, 0, 3]
  ]);
  expect(getAllSupervisorNodes(fakeOrg, fakeOrg[3])).toEqual(expected);
});
it("should get next level supervisor", () => {
  expect(
    getNextSupervisorNode(
      fakeOrg,
      Object.assign({}, fakeOrg[3], { orgLevel: 1 })
    )
  ).toEqual(fakeOrg[2]);
});

const fakeOrgForSup3 = createOrg([[4, 3], [5, 3], [6, 4]]);

const fakeOrgForSup3Horizontal = [
  [4, 3, [3, 4]],
  [5, 3, [3, 5]],
  [6, 4, [3, 4, 6]]
].map(createOrdNodeWithSup);

const filteredEeList3 = [
  [4, 3, [3, 4], 1],
  [5, 3, [3, 5], 1],
  [6, 4, [3, 4, 6], 2]
].map(createOrdNodeWithSupFiltered);

describe("horizontal organization functions", () => {
  it("should add orgSort and allSupervisors properties", () => {
    expect(getOrgWithHorizontal(fakeOrg)).toEqual(fakeOrgHorizontal);
  });
  it("should get the horizontal org for an org node", () => {
    const expected = createOrdNodeWithSup([6, 4, [0, 1, 3, 4, 6]]);
    expect(getIterativeSupervisors(fakeOrg[5], fakeOrg)).toEqual(expected);
  });
  it("should be able to do a filtered organization", () => {
    expect(getOrgWithHorizontal(fakeOrgForSup3)).toEqual(
      fakeOrgForSup3Horizontal
    );
  });
  it("should get the top position", () => {
    expect(findOrgTopSupervisor(fakeOrg)).toEqual(0);
  });
  it("should filter the organization", () => {
    expect(getOrgBySupervisor(fakeOrg, 3)).toEqual(filteredEeList3);
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
