import {
  fullSingle,
  fullOrganizationList,
  getOrganizationNodeById,
  getOrganizationNodeByDirectSupervisor,
  getOrganizationLevelOne,
  getAllSupervisorNodes,
  getNextSupervisorNode,
  getFullOrganizationListWithEmployeeNames,
  getOrganizationWithHorizontal,
  getIterativeSupervisors,
  findOrganizationTopSupervisor,
  getOrganizationBySupervisor
} from "./org-view-logic";

// here is a simple self-referencing
// org chart

const fakeOrg = [
  { id: 1, sup: 0 },
  { id: 2, sup: 1 },
  { id: 3, sup: 1 },
  { id: 4, sup: 3 },
  { id: 5, sup: 3 },
  { id: 6, sup: 4 },
  { id: 7, sup: 2 }
];

// fake employeeInfo

const fakeEmployees = [
  { id: 1, name: "fake name 1" },
  { id: 2, name: "fake name 2" },
  { id: 3, name: "fake name 3" },
  { id: 4, name: "fake name 4" },
  { id: 5, name: "fake name 5" },
  { id: 6, name: "fake name 6" },
  { id: 7, name: "fake name 7" }
];

// given the above org chart
// we want the following, so
// that we can filter in a simple
// way

const fullTgt = [
  { id: 1, sup: 0, level: 1 },
  { id: 2, sup: 1, level: 1 },
  { id: 2, sup: 0, level: 2 },
  { id: 3, sup: 1, level: 1 },
  { id: 3, sup: 0, level: 2 },
  { id: 4, sup: 3, level: 1 },
  { id: 4, sup: 1, level: 2 },
  { id: 4, sup: 0, level: 3 },
  { id: 5, sup: 3, level: 1 },
  { id: 5, sup: 1, level: 2 },
  { id: 5, sup: 0, level: 3 },
  { id: 6, sup: 4, level: 1 },
  { id: 6, sup: 3, level: 2 },
  { id: 6, sup: 1, level: 3 },
  { id: 6, sup: 0, level: 4 },
  { id: 7, sup: 2, level: 1 },
  { id: 7, sup: 1, level: 2 },
  { id: 7, sup: 0, level: 3 }
];

const fullTgtWithNames = fullTgt.map(fullTgtItem =>
  Object.assign({}, fullTgtItem, {
    name: fakeEmployees.find(ee => ee.id === fullTgtItem.id).name
  })
);

it("should create the full employee list", () => {
  expect(fullOrganizationList(fakeOrg)).toEqual(fullTgt);
});
it("should get the full employee list with names", () => {
  expect(
    getFullOrganizationListWithEmployeeNames(fakeOrg, fakeEmployees)
  ).toEqual(fullTgtWithNames);
});
it("get an employee by id", () => {
  expect(getOrganizationNodeById(fakeOrg, 1)).toEqual({ id: 1, sup: 0 });
});
it("get employees by direct supervisor", () => {
  expect(getOrganizationNodeByDirectSupervisor(fakeOrg, 3)).toEqual([
    { id: 4, sup: 3 },
    { id: 5, sup: 3 }
  ]);
});
it("should get level one of the organization", () => {
  expect(getOrganizationLevelOne(fakeOrg)).toEqual([
    { id: 1, sup: 0, level: 1 },
    { id: 2, sup: 1, level: 1 },
    { id: 3, sup: 1, level: 1 },
    { id: 4, sup: 3, level: 1 },
    { id: 5, sup: 3, level: 1 },
    { id: 6, sup: 4, level: 1 },
    { id: 7, sup: 2, level: 1 }
  ]);
});
it("should get all supervisors", () => {
  expect(getAllSupervisorNodes(fakeOrg, fakeOrg[3])).toEqual([
    { id: 4, sup: 3, level: 1 },
    { id: 4, sup: 1, level: 2 },
    { id: 4, sup: 0, level: 3 }
  ]);
});
it("should get next level supervisor", () => {
  expect(
    getNextSupervisorNode(fakeOrg, Object.assign({}, fakeOrg[3], { level: 1 }))
  ).toEqual(fakeOrg[2]);
});

const fakeOrgHorizontal = [
  { id: 1, sup: 0, orgSort: "0", allSups: [0] },
  { id: 2, sup: 1, orgSort: "0-1", allSups: [0, 1] },
  { id: 3, sup: 1, orgSort: "0-1", allSups: [0, 1] },
  { id: 4, sup: 3, orgSort: "0-1-3", allSups: [0, 1, 3] },
  { id: 5, sup: 3, orgSort: "0-1-3", allSups: [0, 1, 3] },
  { id: 6, sup: 4, orgSort: "0-1-3-4", allSups: [0, 1, 3, 4] },
  { id: 7, sup: 2, orgSort: "0-1-2", allSups: [0, 1, 2] }
];

const fakeOrgForSup3 = [
  { id: 4, sup: 3 },
  { id: 5, sup: 3 },
  { id: 6, sup: 4 }
];

const fakeOrgForSup3Horizontal = [
  { id: 4, sup: 3, orgSort: "3", allSups: [3] },
  { id: 5, sup: 3, orgSort: "3", allSups: [3] },
  { id: 6, sup: 4, orgSort: "3-4", allSups: [3, 4] }
];

const filteredEeList3 = [
  {
    allSups: [3],
    id: 4,
    level: 1,
    name: "fake name 4",
    orgSort: "3",
    orgSup: 3,
    sup: 3
  },
  {
    allSups: [3],
    id: 5,
    level: 1,
    name: "fake name 5",
    orgSort: "3",
    orgSup: 3,
    sup: 3
  },
  {
    allSups: [3, 4],
    id: 6,
    level: 2,
    name: "fake name 6",
    orgSort: "3-4",
    orgSup: 3,
    sup: 4
  }
];

describe("horizontal organization functions", () => {
  it("should add orgSort and allSups properties", () => {
    expect(getOrganizationWithHorizontal(fakeOrg)).toEqual(fakeOrgHorizontal);
  });
  it("should get the horizontal org for an org node", () => {
    expect(getIterativeSupervisors(fakeOrg[5], fakeOrg)).toEqual({
      id: 6,
      sup: 4,
      orgSort: "0-1-3-4",
      allSups: [0, 1, 3, 4]
    });
  });
  it("should be able to do a filtered organization", () => {
    expect(getOrganizationWithHorizontal(fakeOrgForSup3)).toEqual(
      fakeOrgForSup3Horizontal
    );
  });
  it("should get the top position", () => {
    expect(findOrganizationTopSupervisor(fakeOrg)).toEqual(0);
  });
  it("should filter the organization", () => {
    expect(getOrganizationBySupervisor(fakeOrg, fakeEmployees, 3)).toEqual(
      filteredEeList3
    );
  });
});
