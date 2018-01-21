import { OrganizationNode } from "../store/organization.types";

// todo: fetch this from the non-existent backend in an epic :)
// the organization is actually made of positions, no employees
// names from http://www.randomnames.com/

export const initialOrganization: OrganizationNode[] = [
  {
    positionId: 1,
    supervisorPositionId: 0,
    employeeId: 101,
    employeeName: "Leyla, CEO"
  },
  {
    positionId: 2,
    supervisorPositionId: 1,
    employeeId: 102,
    employeeName: "Bob, CMO"
  },
  {
    positionId: 3,
    supervisorPositionId: 2,
    employeeId: 103,
    employeeName: "Daysha, Marketing Manager"
  },
  {
    positionId: 4,
    supervisorPositionId: 3,
    employeeId: 104,
    employeeName: "Nicole, Team Lead, Marketinga)"
  },
  {
    positionId: 5,
    supervisorPositionId: 3,
    employeeId: 105,
    employeeName: "Oswald, Marketer"
  },
  {
    positionId: 6,
    supervisorPositionId: 4,
    employeeId: 106,
    employeeName: "Ziva, Research Analyst"
  },
  {
    positionId: 7,
    supervisorPositionId: 2,
    employeeId: 107,
    employeeName: "Denise, Communications"
  }
];
