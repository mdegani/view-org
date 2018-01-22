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
    positionId: 8,
    supervisorPositionId: 1,
    employeeId: 108,
    employeeName: "Clarence, CTO"
  },
  {
    positionId: 9,
    supervisorPositionId: 8,
    employeeId: 109,
    employeeName: "Vivi, Fortran Team Lead"
  },
  {
    positionId: 10,
    supervisorPositionId: 8,
    employeeId: 110,
    employeeName: "Karlee, Fortran Team Lead"
  },
  {
    positionId: 11,
    supervisorPositionId: 10,
    employeeId: 111,
    employeeName: "Zuriel, Dev I"
  },
  {
    positionId: 12,
    supervisorPositionId: 10,
    employeeId: 112,
    employeeName: "Allen, Dev I"
  },
  {
    positionId: 13,
    supervisorPositionId: 10,
    employeeId: 113,
    employeeName: "Alberta, Dev II"
  },
  {
    positionId: 14,
    supervisorPositionId: 10,
    employeeId: 114,
    employeeName: "Jaydon, Dev III"
  },
  {
    positionId: 15,
    supervisorPositionId: 9,
    employeeId: 115,
    employeeName: "Percy, Dev III"
  },
  {
    positionId: 16,
    supervisorPositionId: 9,
    employeeId: 116,
    employeeName: "Leonora, Dev I"
  },
  {
    positionId: 17,
    supervisorPositionId: 9,
    employeeId: 117,
    employeeName: "Bloom, Intern"
  },
  {
    positionId: 18,
    supervisorPositionId: 9,
    employeeId: 118,
    employeeName: "Storm, Dev II"
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
    employeeName: "Nicole, Team Lead, Marketing"
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
