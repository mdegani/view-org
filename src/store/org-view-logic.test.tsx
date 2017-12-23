import {
  // fullSingle,
  fullOrganizationList,
  getOrganizationNodeById,
  getDirectReportsOfOrgNode,
  getOrganizationLevelOne,
  getAllSupervisorNodes,
  getFullOrganizationListWithEmployeeNames,
  getOrganizationWithHorizontal,
  getIterativeSupervisors,
  findOrganizationTopSupervisor,
  getOrganizationBySupervisor,
  getNextSupervisorNode,
} from './org-view-logic';
import {
  OrganizationNode,
  Employee,
  OrganizationSectionNode,
} from './organization.types';

// here is a simple self-referencing
// org chart

const fakeOrg: OrganizationNode[] = [
  { positionId: 1, supervisorPositionId: 0 },
  { positionId: 2, supervisorPositionId: 1 },
  { positionId: 3, supervisorPositionId: 1 },
  { positionId: 4, supervisorPositionId: 3 },
  { positionId: 5, supervisorPositionId: 3 },
  { positionId: 6, supervisorPositionId: 4 },
  { positionId: 7, supervisorPositionId: 2 },
];

// fake employeeInfo

const fakeEmployees: Employee[] = [
  { employeeId: 1, employeeName: 'fake name 1' },
  { employeeId: 2, employeeName: 'fake name 2' },
  { employeeId: 3, employeeName: 'fake name 3' },
  { employeeId: 4, employeeName: 'fake name 4' },
  { employeeId: 5, employeeName: 'fake name 5' },
  { employeeId: 6, employeeName: 'fake name 6' },
  { employeeId: 7, employeeName: 'fake name 7' },
];

// given the above org chart
// we want the following, so
// that we can filter in a simple
// way

const fullTgt: OrganizationSectionNode[] = [
  { positionId: 1, supervisorPositionId: 0, level: 1 },
  { positionId: 2, supervisorPositionId: 1, level: 1 },
  { positionId: 2, supervisorPositionId: 0, level: 2 },
  { positionId: 3, supervisorPositionId: 1, level: 1 },
  { positionId: 3, supervisorPositionId: 0, level: 2 },
  { positionId: 4, supervisorPositionId: 3, level: 1 },
  { positionId: 4, supervisorPositionId: 1, level: 2 },
  { positionId: 4, supervisorPositionId: 0, level: 3 },
  { positionId: 5, supervisorPositionId: 3, level: 1 },
  { positionId: 5, supervisorPositionId: 1, level: 2 },
  { positionId: 5, supervisorPositionId: 0, level: 3 },
  { positionId: 6, supervisorPositionId: 4, level: 1 },
  { positionId: 6, supervisorPositionId: 3, level: 2 },
  { positionId: 6, supervisorPositionId: 1, level: 3 },
  { positionId: 6, supervisorPositionId: 0, level: 4 },
  { positionId: 7, supervisorPositionId: 2, level: 1 },
  { positionId: 7, supervisorPositionId: 1, level: 2 },
  { positionId: 7, supervisorPositionId: 0, level: 3 },
];

const fullTgtWithNames = fullTgt.map(fullTgtItem => {
  const targetEmployee = fakeEmployees.find(
    ee => ee.employeeId === fullTgtItem.positionId,
  );
  return Object.assign({}, fullTgtItem, {
    employeeName: targetEmployee ? targetEmployee.employeeName : '',
  });
});

it('should create the full employee list', () => {
  expect(fullOrganizationList(fakeOrg)).toEqual(fullTgt);
});
it('should get the full employee list with names', () => {
  expect(
    getFullOrganizationListWithEmployeeNames(fakeOrg, fakeEmployees),
  ).toEqual(fullTgtWithNames);
});
it('get an employee by id', () => {
  const expected: OrganizationNode = { positionId: 1, supervisorPositionId: 0 };
  expect(getOrganizationNodeById(fakeOrg, 1)).toEqual(expected);
});
it('get employees by direct supervisor', () => {
  const expected: OrganizationNode[] = [
    { positionId: 4, supervisorPositionId: 3 },
    { positionId: 5, supervisorPositionId: 3 },
  ];
  expect(getDirectReportsOfOrgNode(fakeOrg, 3)).toEqual(expected);
});
it('should get level one of the organization', () => {
  const expected: OrganizationSectionNode[] = [
    { positionId: 1, supervisorPositionId: 0, level: 1 },
    { positionId: 2, supervisorPositionId: 1, level: 1 },
    { positionId: 3, supervisorPositionId: 1, level: 1 },
    { positionId: 4, supervisorPositionId: 3, level: 1 },
    { positionId: 5, supervisorPositionId: 3, level: 1 },
    { positionId: 6, supervisorPositionId: 4, level: 1 },
    { positionId: 7, supervisorPositionId: 2, level: 1 },
  ];
  expect(getOrganizationLevelOne(fakeOrg)).toEqual(expected);
});
it('should get all supervisors', () => {
  const expected: OrganizationSectionNode[] = [
    { positionId: 4, supervisorPositionId: 3, level: 1 },
    { positionId: 4, supervisorPositionId: 1, level: 2 },
    { positionId: 4, supervisorPositionId: 0, level: 3 },
  ];
  expect(getAllSupervisorNodes(fakeOrg, fakeOrg[3])).toEqual(expected);
});
it('should get next level supervisor', () => {
  expect(
    getNextSupervisorNode(fakeOrg, Object.assign({}, fakeOrg[3], { level: 1 })),
  ).toEqual(fakeOrg[2]);
});

const fakeOrgHorizontal: OrganizationNode[] = [
  { positionId: 1, supervisorPositionId: 0, orgSort: '0', allSups: [0] },
  { positionId: 2, supervisorPositionId: 1, orgSort: '0-1', allSups: [0, 1] },
  { positionId: 3, supervisorPositionId: 1, orgSort: '0-1', allSups: [0, 1] },
  {
    positionId: 4,
    supervisorPositionId: 3,
    orgSort: '0-1-3',
    allSups: [0, 1, 3],
  },
  {
    positionId: 5,
    supervisorPositionId: 3,
    orgSort: '0-1-3',
    allSups: [0, 1, 3],
  },
  {
    positionId: 6,
    supervisorPositionId: 4,
    orgSort: '0-1-3-4',
    allSups: [0, 1, 3, 4],
  },
  {
    positionId: 7,
    supervisorPositionId: 2,
    orgSort: '0-1-2',
    allSups: [0, 1, 2],
  },
];

const fakeOrgForSup3: OrganizationNode[] = [
  { positionId: 4, supervisorPositionId: 3 },
  { positionId: 5, supervisorPositionId: 3 },
  { positionId: 6, supervisorPositionId: 4 },
];

const fakeOrgForSup3Horizontal: OrganizationNode[] = [
  { positionId: 4, supervisorPositionId: 3, orgSort: '3', allSups: [3] },
  { positionId: 5, supervisorPositionId: 3, orgSort: '3', allSups: [3] },
  { positionId: 6, supervisorPositionId: 4, orgSort: '3-4', allSups: [3, 4] },
];

const filteredEeList3 = [
  {
    allSups: [3],
    positionId: 4,
    level: 1,
    employeeName: 'fake name 4',
    orgSort: '3',
    orgSup: 3,
    supervisorPositionId: 3,
  },
  {
    allSups: [3],
    positionId: 5,
    level: 1,
    employeeName: 'fake name 5',
    orgSort: '3',
    orgSup: 3,
    supervisorPositionId: 3,
  },
  {
    allSups: [3, 4],
    positionId: 6,
    level: 2,
    employeeName: 'fake name 6',
    orgSort: '3-4',
    orgSup: 3,
    supervisorPositionId: 4,
  },
];

describe('horizontal organization functions', () => {
  it('should add orgSort and allSups properties', () => {
    expect(getOrganizationWithHorizontal(fakeOrg)).toEqual(fakeOrgHorizontal);
  });
  it('should get the horizontal org for an org node', () => {
    const expected: OrganizationNode = {
      positionId: 6,
      supervisorPositionId: 4,
      orgSort: '0-1-3-4',
      allSups: [0, 1, 3, 4],
    };
    expect(getIterativeSupervisors(fakeOrg[5], fakeOrg)).toEqual(expected);
  });
  it('should be able to do a filtered organization', () => {
    expect(getOrganizationWithHorizontal(fakeOrgForSup3)).toEqual(
      fakeOrgForSup3Horizontal,
    );
  });
  it('should get the top position', () => {
    expect(findOrganizationTopSupervisor(fakeOrg)).toEqual(0);
  });
  it('should filter the organization', () => {
    expect(getOrganizationBySupervisor(fakeOrg, fakeEmployees, 3)).toEqual(
      filteredEeList3,
    );
  });
});
