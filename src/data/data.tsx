import { OrganizationNode, Employee } from '../store/organization.types';

// todo: fetch this from the non-existent backend in an epic :)
// the organization is actually made of positions, no employees

export const initialOrganization: OrganizationNode[] = [
  { positionId: 1, supervisorPositionId: 0 },
  { positionId: 2, supervisorPositionId: 1 },
  { positionId: 3, supervisorPositionId: 2 },
  { positionId: 4, supervisorPositionId: 3 },
  { positionId: 5, supervisorPositionId: 3 },
  { positionId: 6, supervisorPositionId: 4 },
  { positionId: 7, supervisorPositionId: 2 },
];

// thank you http://www.randomnames.com/, what would I do without you
export const employees: Employee[] = [
  { employeeId: 1, employeeName: 'Leyla, CEO' },
  { employeeId: 2, employeeName: 'Bob, CMO (reports to Leyla)' },
  { employeeId: 3, employeeName: 'Daysha, Marketing Manager (reports to Bob)' },
  {
    employeeId: 4,
    employeeName: 'Nicole, Team Lead, Marketing (reports to Daysha)',
  },
  { employeeId: 5, employeeName: 'Oswald, Marketer (reports to Daysha)' },
  { employeeId: 6, employeeName: 'Ziva, Research Analyst (reports to Nicole)' },
  { employeeId: 7, employeeName: 'Denise, Communications (reports to Bob)' },
];
