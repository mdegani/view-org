import {
  fullOrganizationList,
  getOrganizationNodeById,
  getDirectReportsOfOrgNode,
  getOrganizationLevelOne,
  getAllSupervisorNodes,
  getOrganizationWithHorizontal,
  getIterativeSupervisors,
  findOrganizationTopSupervisor,
  getOrganizationBySupervisor,
  getNextSupervisorNode,
  addEmployeeInfoToOrganizationNode,
} from './org-view-logic';
import {
  OrganizationNode,
  OrganizationSectionNode,
  Employee,
} from './organization.types';

// here is a simple self-referencing
// org chart

const fakeOrg: OrganizationNode[] = [
  { positionId: 1, supervisorPositionId: 0, employeeId: 101 },
  { positionId: 2, supervisorPositionId: 1, employeeId: 102 },
  { positionId: 3, supervisorPositionId: 1, employeeId: 103 },
  { positionId: 4, supervisorPositionId: 3, employeeId: 104 },
  { positionId: 5, supervisorPositionId: 3, employeeId: 105 },
  { positionId: 6, supervisorPositionId: 4, employeeId: 106 },
  { positionId: 7, supervisorPositionId: 2, employeeId: 107 },
];

// given the above org chart
// we want the following, so
// that we can filter in a simple
// way

const fullTgt: OrganizationSectionNode[] = [
  { positionId: 1, supervisorPositionId: 0, employeeId: 101, level: 1 },
  { positionId: 2, supervisorPositionId: 1, employeeId: 102, level: 1 },
  { positionId: 2, supervisorPositionId: 0, employeeId: 102, level: 2 },
  { positionId: 3, supervisorPositionId: 1, employeeId: 103, level: 1 },
  { positionId: 3, supervisorPositionId: 0, employeeId: 103, level: 2 },
  { positionId: 4, supervisorPositionId: 3, employeeId: 104, level: 1 },
  { positionId: 4, supervisorPositionId: 1, employeeId: 104, level: 2 },
  { positionId: 4, supervisorPositionId: 0, employeeId: 104, level: 3 },
  { positionId: 5, supervisorPositionId: 3, employeeId: 105, level: 1 },
  { positionId: 5, supervisorPositionId: 1, employeeId: 105, level: 2 },
  { positionId: 5, supervisorPositionId: 0, employeeId: 105, level: 3 },
  { positionId: 6, supervisorPositionId: 4, employeeId: 106, level: 1 },
  { positionId: 6, supervisorPositionId: 3, employeeId: 106, level: 2 },
  { positionId: 6, supervisorPositionId: 1, employeeId: 106, level: 3 },
  { positionId: 6, supervisorPositionId: 0, employeeId: 106, level: 4 },
  { positionId: 7, supervisorPositionId: 2, employeeId: 107, level: 1 },
  { positionId: 7, supervisorPositionId: 1, employeeId: 107, level: 2 },
  { positionId: 7, supervisorPositionId: 0, employeeId: 107, level: 3 },
];

it('should create the full organization list', () => {
  expect(fullOrganizationList(fakeOrg)).toEqual(fullTgt);
});
it('get an organizationNode by id', () => {
  const expected: OrganizationNode = {
    positionId: 1,
    supervisorPositionId: 0,
    employeeId: 101,
  };
  expect(getOrganizationNodeById(fakeOrg, 1)).toEqual(expected);
});
it('get organizationNodes by direct supervisor id', () => {
  const expected: OrganizationNode[] = [
    { positionId: 4, supervisorPositionId: 3, employeeId: 104 },
    { positionId: 5, supervisorPositionId: 3, employeeId: 105 },
  ];
  expect(getDirectReportsOfOrgNode(fakeOrg, 3)).toEqual(expected);
});
it('should get level one of the organization', () => {
  const expected: OrganizationSectionNode[] = [
    { positionId: 1, supervisorPositionId: 0, employeeId: 101, level: 1 },
    { positionId: 2, supervisorPositionId: 1, employeeId: 102, level: 1 },
    { positionId: 3, supervisorPositionId: 1, employeeId: 103, level: 1 },
    { positionId: 4, supervisorPositionId: 3, employeeId: 104, level: 1 },
    { positionId: 5, supervisorPositionId: 3, employeeId: 105, level: 1 },
    { positionId: 6, supervisorPositionId: 4, employeeId: 106, level: 1 },
    { positionId: 7, supervisorPositionId: 2, employeeId: 107, level: 1 },
  ];
  expect(getOrganizationLevelOne(fakeOrg)).toEqual(expected);
});
it('should get all supervisors', () => {
  const expected: OrganizationSectionNode[] = [
    { positionId: 4, supervisorPositionId: 3, employeeId: 104, level: 1 },
    { positionId: 4, supervisorPositionId: 1, employeeId: 104, level: 2 },
    { positionId: 4, supervisorPositionId: 0, employeeId: 104, level: 3 },
  ];
  expect(getAllSupervisorNodes(fakeOrg, fakeOrg[3])).toEqual(expected);
});
it('should get next level supervisor', () => {
  expect(
    getNextSupervisorNode(fakeOrg, Object.assign({}, fakeOrg[3], { level: 1 })),
  ).toEqual(fakeOrg[2]);
});

const fakeOrgHorizontal: OrganizationNode[] = [
  {
    positionId: 1,
    supervisorPositionId: 0,
    employeeId: 101,
    orgSort: '0',
    allSups: [0],
  },
  {
    positionId: 2,
    supervisorPositionId: 1,
    employeeId: 102,
    orgSort: '0-1',
    allSups: [0, 1],
  },
  {
    positionId: 3,
    supervisorPositionId: 1,
    employeeId: 103,
    orgSort: '0-1',
    allSups: [0, 1],
  },
  {
    positionId: 4,
    supervisorPositionId: 3,
    employeeId: 104,
    orgSort: '0-1-3',
    allSups: [0, 1, 3],
  },
  {
    positionId: 5,
    supervisorPositionId: 3,
    employeeId: 105,
    orgSort: '0-1-3',
    allSups: [0, 1, 3],
  },
  {
    positionId: 6,
    supervisorPositionId: 4,
    employeeId: 106,
    orgSort: '0-1-3-4',
    allSups: [0, 1, 3, 4],
  },
  {
    positionId: 7,
    supervisorPositionId: 2,
    employeeId: 107,
    orgSort: '0-1-2',
    allSups: [0, 1, 2],
  },
];

const fakeOrgForSup3: OrganizationNode[] = [
  { positionId: 4, supervisorPositionId: 3, employeeId: 104 },
  { positionId: 5, supervisorPositionId: 3, employeeId: 105 },
  { positionId: 6, supervisorPositionId: 4, employeeId: 106 },
];

const fakeOrgForSup3Horizontal: OrganizationNode[] = [
  {
    positionId: 4,
    supervisorPositionId: 3,
    employeeId: 104,
    orgSort: '3',
    allSups: [3],
  },
  {
    positionId: 5,
    supervisorPositionId: 3,
    employeeId: 105,
    orgSort: '3',
    allSups: [3],
  },
  {
    positionId: 6,
    supervisorPositionId: 4,
    employeeId: 106,
    orgSort: '3-4',
    allSups: [3, 4],
  },
];

const filteredEeList3 = [
  {
    allSups: [3],
    positionId: 4,
    employeeId: 104,
    level: 1,
    orgSort: '3',
    orgSup: 3,
    supervisorPositionId: 3,
  },
  {
    allSups: [3],
    positionId: 5,
    employeeId: 105,
    level: 1,
    orgSort: '3',
    orgSup: 3,
    supervisorPositionId: 3,
  },
  {
    allSups: [3, 4],
    positionId: 6,
    employeeId: 106,
    level: 2,
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
      employeeId: 106,
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
    expect(getOrganizationBySupervisor(fakeOrg, 3)).toEqual(filteredEeList3);
  });
});

const employees: Employee[] = [
  { employeeId: 101, employeeName: 'employee 101' },
  { employeeId: 102, employeeName: 'employee 102' },
  {
    employeeId: 103,
    employeeName: 'employee 103',
  },
  {
    employeeId: 104,
    employeeName: 'employee 104',
  },
  { employeeId: 105, employeeName: 'employee 105' },
  {
    employeeId: 106,
    employeeName: 'employee 106',
  },
  { employeeId: 107, employeeName: 'employee 107' },
];

describe('combining organization and employee data', () => {
  it('should map callback that maps the employees to an organization', () => {
    const expected = {
      positionId: 2,
      supervisorPositionId: 1,
      allSups: undefined,
      orgSort: undefined,
      employeeId: 102,
      employeeName: 'employee 102',
    };
    const actual = fakeOrg.map(addEmployeeInfoToOrganizationNode(employees))[1];
    expect(actual).toEqual(expected);
  });
});
