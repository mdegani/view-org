import { OrganizationNode, Employee } from '../store/organization.types';

// todo: fetch this from the non-existent backend in an epic :)
// the organization is actually made of positions, no employees

export const initialOrganization: OrganizationNode[] = [
  { positionId: 1, supervisorPositionId: 0, employeeId: 101 },
  { positionId: 2, supervisorPositionId: 1, employeeId: 102 },
  { positionId: 3, supervisorPositionId: 2, employeeId: 103 },
  { positionId: 4, supervisorPositionId: 3, employeeId: 104 },
  { positionId: 5, supervisorPositionId: 3, employeeId: 105 },
  { positionId: 6, supervisorPositionId: 4, employeeId: 106 },
  { positionId: 7, supervisorPositionId: 2, employeeId: 107 },
];

// thank you http://www.randomnames.com/, what would I do without you
export const employees: Employee[] = [
  { employeeId: 101, employeeName: 'Leyla, CEO' },
  { employeeId: 102, employeeName: 'Bob, CMO (reports to Leyla)' },
  { employeeId: 103, employeeName: 'Daysha, Marketing Manager (reports to Bob)' },
  {
    employeeId: 104,
    employeeName: 'Nicole, Team Lead, Marketing (reports to Daysha)',
  },
  { employeeId: 105, employeeName: 'Oswald, Marketer (reports to Daysha)' },
  { employeeId: 106, employeeName: 'Ziva, Research Analyst (reports to Nicole)' },
  { employeeId: 107, employeeName: 'Denise, Communications (reports to Bob)' },
];
