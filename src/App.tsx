// TODO: type for state
import * as React from "react";
import { Link } from "react-router-dom";
import "mdd-tailwind";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import ViewOrg from "./components/ViewOrg";
import {
  addNewEmployee,
  deleteAllEmployees,
  deleteEmployee
} from "./store/actions";
import {
  getOrganizationBySupervisor,
  getIterativeSupervisors,
  getOrganizationNodeById
} from "./store/org-view-logic";
import "./App.css";
import { OrganizationNode, CombinedState } from "./store/organization.types";

const OrgView = ({
  selectedEmployee,
  organization,
  onAddNewEmployee,
  onDeleteAllEmployees,
  onDeleteEmployee,
  supervisorsOrg,
  supervisorChain,
  nextAvailableId
}: {
  selectedEmployee: number;
  organization: OrganizationNode[];
  // TODO: better typing for this function https://www.typescriptlang.org/docs/handbook/functions.html
  onAddNewEmployee: (newPositionId: number, currentNodeId: number) => void; // TODO: is void right??
  onDeleteAllEmployees: () => void;
  onDeleteEmployee: (newPositionId: number) => void;
  supervisorsOrg: OrganizationNode[];
  supervisorChain: OrganizationNode[];
  nextAvailableId: number;
}) => {
  selectedEmployee = selectedEmployee || 1;
  return (
    <div className="App">
      <nav className="bg-black w-full fixed flex flex-col">
        <div className="font-bold text-base text-hot-pink py-2">
          Organization View
        </div>
        <div className="flex justify-between">
          <div className="text-2xl p-2 bg-white overflow-scroll flex-no-wrap w-full">
            {
              getOrganizationNodeById(organization, +selectedEmployee)!
                .employeeName
            }
          </div>
          <a
            href="#"
            className="text-sm no-underline opacity-100 px-3 ph-1 mb-2 inline-block text-white"
            onClick={() => onAddNewEmployee(nextAvailableId, +selectedEmployee)}
          >
            +
          </a>
          <a
            href="#"
            className="text-sm no-underline opacity-100 px-3 py-1 mb-2 inline-block text-white"
            onClick={() => onDeleteAllEmployees()}
          >
            del all
          </a>
          <a
            href="#"
            className="text-sm no-underline opacity-100 px-3 ph-1 mb-2 inline-block text-white"
            onClick={() => onDeleteEmployee(+selectedEmployee)}
          >
            del one
          </a>
        </div>
      </nav>
      <div className="px-8" style={{ paddingTop: "5.3rem" }}>
        <div>
          {/* this should be positions! */}
          {/* filtering out positionId -1, temporily, until we figure out how to handle 🕴 */}
          {supervisorChain
            .filter(sup => sup.positionId !== -1)
            .map((sup, supIndex) => (
              <Link
                to={"/" + sup.positionId}
                key={sup.employeeId}
                className={
                  "text-base font-semibold py-0 text-blue no-underline opacity-100 block border-l " +
                  "pl-1 border-hot-pink overflow-scroll flex-no-wrap"
                }
              >
                {supIndex > 0 ? (
                  <span className="text-sm text-hot-pink block">⌄</span>
                ) : (
                  undefined
                )}
                {sup.employeeName}
              </Link>
            ))}
        </div>
        <ViewOrg supervisorsOrg={supervisorsOrg} />
      </div>
    </div>
  );
};

const organizationNodes = state => state.employeesReducer.organization;

// TODO Fix this:
const supervisorsOrganizationWithEmployeeNames = (selectedNode: number) =>
  createSelector(organizationNodes, (orgNodes: OrganizationNode[]) => {
    return getOrganizationBySupervisor(orgNodes, selectedNode);
  });

const organizationWithEmployeeNames = createSelector(
  organizationNodes,
  (org: OrganizationNode[]) => {
    const orgWithAllSups = org.map(orgNode =>
      getIterativeSupervisors(orgNode, org)
    );
    return orgWithAllSups;
  }
);

const organizationNodeSelectedEmployee = (selectedNode: number) =>
  createSelector(
    organizationWithEmployeeNames,
    (org: OrganizationNode[]): OrganizationNode[] => {
      const selectedOrgNode = org.find(
        orgNode => orgNode.positionId === selectedNode
      );

      return selectedOrgNode!.allSups!.map(supId => {
        if (supId === 0) {
          // for now the top supervisor will report to a man in a business suit levitating
          return {
            positionId: -1,
            supervisorPositionId: -1,
            employeeId: -1,
            employeeName: "🕴"
          };
        }
        return org!.find(
          org2 =>
            org2.employeeId ===
            org.find(orgNode => orgNode!.positionId === supId)!.employeeId
        )!;
      });
    }
  );

const nextAvailableIdSelector = createSelector(
  organizationWithEmployeeNames,
  (org: OrganizationNode[]) => {
    return Math.max(...org.map(orgNode => orgNode.positionId)) + 1;
  }
);

const mapStateToProps = (state: CombinedState, props) => {
  const selectedNode = +props.match.params.nodeId;
  return {
    selectedEmployee: selectedNode,
    organization: organizationWithEmployeeNames(state),
    supervisorsOrg: supervisorsOrganizationWithEmployeeNames(selectedNode)(
      state
    ),
    supervisorChain: organizationNodeSelectedEmployee(selectedNode)(state),
    nextAvailableId: nextAvailableIdSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddNewEmployee: (newPositionId, currentNodeId) =>
      dispatch(addNewEmployee(newPositionId, currentNodeId)),
    onDeleteAllEmployees: () => dispatch(deleteAllEmployees()),
    onDeleteEmployee: positionId => dispatch(deleteEmployee(positionId))
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(OrgView);

export default App;
