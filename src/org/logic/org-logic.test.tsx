// import {
//   fullOrgNodeList,
//   getOrgNodeById,
//   getDirectReportsOfOrgNode,
//   getOrgLevelOne,
//   getAllSupervisorNodes,
//   getOrgWithHorizontal,
//   getIterativeSupervisors,
//   findOrgTopSupervisor,
//   getOrgBySupervisor,
//   getNextSupervisorNode
// } from "./org-logic";
// import { OrgNode, OrgSectionNode } from "../types/org.types";

// // here is a simple self-referencing
// // org chart

// const fakeOrg: OrgNode[] = [
//   {
//     positionId: 1,
//     supervisorPositionId: 0,
//     employeeId: 101,
//     employeeName: "name1"
//   },
//   {
//     positionId: 2,
//     supervisorPositionId: 1,
//     employeeId: 102,
//     employeeName: "name2"
//   },
//   {
//     positionId: 3,
//     supervisorPositionId: 1,
//     employeeId: 103,
//     employeeName: "name3"
//   },
//   {
//     positionId: 4,
//     supervisorPositionId: 3,
//     employeeId: 104,
//     employeeName: "name4"
//   },
//   {
//     positionId: 5,
//     supervisorPositionId: 3,
//     employeeId: 105,
//     employeeName: "name5"
//   },
//   {
//     positionId: 6,
//     supervisorPositionId: 4,
//     employeeId: 106,
//     employeeName: "name6"
//   },
//   {
//     positionId: 7,
//     supervisorPositionId: 2,
//     employeeId: 107,
//     employeeName: "name7"
//   }
// ];

// // given the above org chart
// // we want the following, so
// // that we can filter in a simple
// // way

// const fullTgt: OrgSectionNode[] = [
//   {
//     positionId: 1,
//     supervisorPositionId: 0,
//     employeeId: 101,
//     employeeName: "name1",
//     orgLevel: 1
//   },
//   {
//     positionId: 2,
//     supervisorPositionId: 1,
//     employeeId: 102,
//     employeeName: "name2",
//     orgLevel: 1
//   },
//   {
//     positionId: 2,
//     supervisorPositionId: 0,
//     employeeId: 102,
//     employeeName: "name2",
//     orgLevel: 2
//   },
//   {
//     positionId: 3,
//     supervisorPositionId: 1,
//     employeeId: 103,
//     employeeName: "name3",
//     orgLevel: 1
//   },
//   {
//     positionId: 3,
//     supervisorPositionId: 0,
//     employeeId: 103,
//     employeeName: "name3",
//     orgLevel: 2
//   },
//   {
//     positionId: 4,
//     supervisorPositionId: 3,
//     employeeId: 104,
//     employeeName: "name4",
//     orgLevel: 1
//   },
//   {
//     positionId: 4,
//     supervisorPositionId: 1,
//     employeeId: 104,
//     employeeName: "name4",
//     orgLevel: 2
//   },
//   {
//     positionId: 4,
//     supervisorPositionId: 0,
//     employeeId: 104,
//     employeeName: "name4",
//     orgLevel: 3
//   },
//   {
//     positionId: 5,
//     supervisorPositionId: 3,
//     employeeId: 105,
//     employeeName: "name5",
//     orgLevel: 1
//   },
//   {
//     positionId: 5,
//     supervisorPositionId: 1,
//     employeeId: 105,
//     employeeName: "name5",
//     orgLevel: 2
//   },
//   {
//     positionId: 5,
//     supervisorPositionId: 0,
//     employeeId: 105,
//     employeeName: "name5",
//     orgLevel: 3
//   },
//   {
//     positionId: 6,
//     supervisorPositionId: 4,
//     employeeId: 106,
//     employeeName: "name6",
//     orgLevel: 1
//   },
//   {
//     positionId: 6,
//     supervisorPositionId: 3,
//     employeeId: 106,
//     employeeName: "name6",
//     orgLevel: 2
//   },
//   {
//     positionId: 6,
//     supervisorPositionId: 1,
//     employeeId: 106,
//     employeeName: "name6",
//     orgLevel: 3
//   },
//   {
//     positionId: 6,
//     supervisorPositionId: 0,
//     employeeId: 106,
//     employeeName: "name6",
//     orgLevel: 4
//   },
//   {
//     positionId: 7,
//     supervisorPositionId: 2,
//     employeeId: 107,
//     employeeName: "name7",
//     orgLevel: 1
//   },
//   {
//     positionId: 7,
//     supervisorPositionId: 1,
//     employeeId: 107,
//     employeeName: "name7",
//     orgLevel: 2
//   },
//   {
//     positionId: 7,
//     supervisorPositionId: 0,
//     employeeId: 107,
//     employeeName: "name7",
//     orgLevel: 3
//   }
// ];

// it("should create the full organization list", () => {
//   expect(fullOrgNodeList(fakeOrg)).toEqual(fullTgt);
// });
// it("get an organizationNode by id", () => {
//   const expected: OrgNode = {
//     positionId: 1,
//     supervisorPositionId: 0,
//     employeeId: 101,
//     employeeName: "name1"
//   };
//   expect(getOrgNodeById(fakeOrg, 1)).toEqual(expected);
// });
// it("get organizationNodes by direct supervisor id", () => {
//   const expected: OrgNode[] = [
//     {
//       positionId: 4,
//       supervisorPositionId: 3,
//       employeeId: 104,
//       employeeName: "name4"
//     },
//     {
//       positionId: 5,
//       supervisorPositionId: 3,
//       employeeId: 105,
//       employeeName: "name5"
//     }
//   ];
//   expect(getDirectReportsOfOrgNode(fakeOrg, 3)).toEqual(expected);
// });
// it("should get level one of the organization", () => {
//   const expected: OrgSectionNode[] = [
//     {
//       positionId: 1,
//       supervisorPositionId: 0,
//       employeeId: 101,
//       employeeName: "name1",
//       orgLevel: 1
//     },
//     {
//       positionId: 2,
//       supervisorPositionId: 1,
//       employeeId: 102,
//       employeeName: "name2",
//       orgLevel: 1
//     },
//     {
//       positionId: 3,
//       supervisorPositionId: 1,
//       employeeId: 103,
//       employeeName: "name3",
//       orgLevel: 1
//     },
//     {
//       positionId: 4,
//       supervisorPositionId: 3,
//       employeeId: 104,
//       employeeName: "name4",
//       orgLevel: 1
//     },
//     {
//       positionId: 5,
//       supervisorPositionId: 3,
//       employeeId: 105,
//       employeeName: "name5",
//       orgLevel: 1
//     },
//     {
//       positionId: 6,
//       supervisorPositionId: 4,
//       employeeId: 106,
//       employeeName: "name6",
//       orgLevel: 1
//     },
//     {
//       positionId: 7,
//       supervisorPositionId: 2,
//       employeeId: 107,
//       employeeName: "name7",
//       orgLevel: 1
//     }
//   ];
//   expect(getOrgLevelOne(fakeOrg)).toEqual(expected);
// });
// it("should get all supervisors", () => {
//   const expected: OrgSectionNode[] = [
//     {
//       positionId: 4,
//       supervisorPositionId: 3,
//       employeeId: 104,
//       employeeName: "name4",
//       orgLevel: 1
//     },
//     {
//       positionId: 4,
//       supervisorPositionId: 1,
//       employeeId: 104,
//       employeeName: "name4",
//       orgLevel: 2
//     },
//     {
//       positionId: 4,
//       supervisorPositionId: 0,
//       employeeId: 104,
//       employeeName: "name4",
//       orgLevel: 3
//     }
//   ];
//   expect(getAllSupervisorNodes(fakeOrg, fakeOrg[3])).toEqual(expected);
// });
// it("should get next level supervisor", () => {
//   expect(
//     getNextSupervisorNode(
//       fakeOrg,
//       Object.assign({}, fakeOrg[3], { orgLevel: 1 })
//     )
//   ).toEqual(fakeOrg[2]);
// });

// const fakeOrgHorizontal: OrgNode[] = [
//   {
//     positionId: 1,
//     supervisorPositionId: 0,
//     employeeId: 101,
//     employeeName: "name1",
//     orgSort: "0000000000-0000000001",
//     allSupervisors: [0, 1]
//   },
//   {
//     positionId: 2,
//     supervisorPositionId: 1,
//     employeeId: 102,
//     employeeName: "name2",
//     orgSort: "0000000000-0000000001-0000000002",
//     allSupervisors: [0, 1, 2]
//   },
//   {
//     positionId: 3,
//     supervisorPositionId: 1,
//     employeeId: 103,
//     employeeName: "name3",
//     orgSort: "0000000000-0000000001-0000000003",
//     allSupervisors: [0, 1, 3]
//   },
//   {
//     positionId: 4,
//     supervisorPositionId: 3,
//     employeeId: 104,
//     employeeName: "name4",
//     orgSort: "0000000000-0000000001-0000000003-0000000004",
//     allSupervisors: [0, 1, 3, 4]
//   },
//   {
//     positionId: 5,
//     supervisorPositionId: 3,
//     employeeId: 105,
//     employeeName: "name5",
//     orgSort: "0000000000-0000000001-0000000003-0000000005",
//     allSupervisors: [0, 1, 3, 5]
//   },
//   {
//     positionId: 6,
//     supervisorPositionId: 4,
//     employeeId: 106,
//     employeeName: "name6",
//     orgSort: "0000000000-0000000001-0000000003-0000000004-0000000006",
//     allSupervisors: [0, 1, 3, 4, 6]
//   },
//   {
//     positionId: 7,
//     supervisorPositionId: 2,
//     employeeId: 107,
//     employeeName: "name7",
//     orgSort: "0000000000-0000000001-0000000002-0000000007",
//     allSupervisors: [0, 1, 2, 7]
//   }
// ];

// const fakeOrgForSup3: OrgNode[] = [
//   {
//     positionId: 4,
//     supervisorPositionId: 3,
//     employeeId: 104,
//     employeeName: "name4"
//   },
//   {
//     positionId: 5,
//     supervisorPositionId: 3,
//     employeeId: 105,
//     employeeName: "name5"
//   },
//   {
//     positionId: 6,
//     supervisorPositionId: 4,
//     employeeId: 106,
//     employeeName: "name6"
//   }
// ];

// const fakeOrgForSup3Horizontal: OrgNode[] = [
//   {
//     positionId: 4,
//     supervisorPositionId: 3,
//     employeeId: 104,
//     employeeName: "name4",
//     orgSort: "0000000003-0000000004",
//     allSupervisors: [3, 4]
//   },
//   {
//     positionId: 5,
//     supervisorPositionId: 3,
//     employeeId: 105,
//     employeeName: "name5",
//     orgSort: "0000000003-0000000005",
//     allSupervisors: [3, 5]
//   },
//   {
//     positionId: 6,
//     supervisorPositionId: 4,
//     employeeId: 106,
//     employeeName: "name6",
//     orgSort: "0000000003-0000000004-0000000006",
//     allSupervisors: [3, 4, 6]
//   }
// ];

// const filteredEeList3 = [
//   {
//     allSupervisors: [3, 4],
//     positionId: 4,
//     employeeId: 104,
//     employeeName: "name4",
//     orgLevel: 1,
//     orgSort: "0000000003-0000000004",
//     orgSup: 3,
//     supervisorPositionId: 3
//   },
//   {
//     allSupervisors: [3, 5],
//     positionId: 5,
//     employeeId: 105,
//     employeeName: "name5",
//     orgLevel: 1,
//     orgSort: "0000000003-0000000005",
//     orgSup: 3,
//     supervisorPositionId: 3
//   },
//   {
//     allSupervisors: [3, 4, 6],
//     positionId: 6,
//     employeeId: 106,
//     employeeName: "name6",
//     orgLevel: 2,
//     orgSort: "0000000003-0000000004-0000000006",
//     orgSup: 3,
//     supervisorPositionId: 4
//   }
// ];

// describe("horizontal organization functions", () => {
//   it("should add orgSort and allSupervisors properties", () => {
//     expect(getOrgWithHorizontal(fakeOrg)).toEqual(fakeOrgHorizontal);
//   });
//   it("should get the horizontal org for an org node", () => {
//     const expected: OrgNode = {
//       positionId: 6,
//       supervisorPositionId: 4,
//       employeeId: 106,
//       employeeName: "name6",
//       orgSort: "0000000000-0000000001-0000000003-0000000004-0000000006",
//       allSupervisors: [0, 1, 3, 4, 6]
//     };
//     expect(getIterativeSupervisors(fakeOrg[5], fakeOrg)).toEqual(expected);
//   });
//   it("should be able to do a filtered organization", () => {
//     expect(getOrgWithHorizontal(fakeOrgForSup3)).toEqual(
//       fakeOrgForSup3Horizontal
//     );
//   });
//   it("should get the top position", () => {
//     expect(findOrgTopSupervisor(fakeOrg)).toEqual(0);
//   });
//   it("should filter the organization", () => {
//     expect(getOrgBySupervisor(fakeOrg, 3)).toEqual(filteredEeList3);
//   });
// });

// // const employees: Employee[] = [
// //   { employeeId: 101, employeeName: 'employee 101' },
// //   { employeeId: 102, employeeName: 'employee 102' },
// //   {
// //     employeeId: 103,
// //     employeeName: 'employee 103',
// //   },
// //   {
// //     employeeId: 104,
// //     employeeName: 'employee 104',
// //   },
// //   { employeeId: 105, employeeName: 'employee 105' },
// //   {
// //     employeeId: 106,
// //     employeeName: 'employee 106',
// //   },
// //   { employeeId: 107, employeeName: 'employee 107' },
// // ];

// // describe('combining organization and employee data', () => {
// //   it('should map callback that maps the employees to an organization', () => {
// //     const expected = {
// //       positionId: 2,
// //       supervisorPositionId: 1,
// //       allSupervisors: undefined,
// //       orgSort: undefined,
// //       employeeId: 102,
// //       employeeName: 'employee 102',
// //     };
// //     const actual = fakeOrg.map(addEmployeeInfoToOrganizationNode(employees))[1];
// //     expect(actual).toEqual(expected);
// //   });
// // });
