// TODO: type for state
import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import ViewOrg from "./components/ViewOrg";
import {
  selectEmployee,
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
  onSelectEmployee,
  onAddNewEmployee,
  onDeleteAllEmployees,
  onDeleteEmployee,
  supervisorsOrg,
  supervisorChain,
  nextAvailableId
}: {
  selectedEmployee: string;
  organization: OrganizationNode[];
  // TODO: better typing for this function https://www.typescriptlang.org/docs/handbook/functions.html
  onSelectEmployee: Function;
  onAddNewEmployee: (newPositionId: number, currentNodeId: number) => void; // TODO: is void right??
  onDeleteAllEmployees: () => void;
  onDeleteEmployee: (newPositionId: number) => void;
  supervisorsOrg: OrganizationNode[];
  supervisorChain: OrganizationNode[];
  nextAvailableId: number;
}) => {
  return (
    <div className="App">
      <nav className="bg-black-90 w-100 fixed flex flex-column">
        <div className="b f5 hot-pink pv2">Organization View</div>
        <div className="flex justify-between">
          <div className="f3 pa2 bg-white overflow-scroll nowrap w-100">
            {
              getOrganizationNodeById(organization, +selectedEmployee)!
                .employeeName
            }
          </div>
          <a
            href="#"
            className="f6 link dim ph3 pv1 mb2 dib white"
            onClick={() => onAddNewEmployee(nextAvailableId, +selectedEmployee)}
          >
            +
          </a>
          <a
            href="#"
            className="f6 link dim ph3 pv1 mb2 dib white"
            onClick={() => onDeleteAllEmployees()}
          >
            del all
          </a>
          <a
            href="#"
            className="f6 link dim ph3 pv1 mb2 dib white"
            onClick={() => onDeleteEmployee(+selectedEmployee)}
          >
            del one
          </a>
        </div>
      </nav>
      <div className="ph4" style={{ paddingTop: "5.3rem" }}>
        <div>
          {/* this should be positions! */}
          {/* filtering out positionId -1, temporily, until we figure out how to handle 🕴 */}
          {supervisorChain
            .filter(sup => sup.positionId !== -1)
            .map((sup, supIndex) => (
              <a
                href="#"
                key={sup.employeeId}
                className="f5 fw6 pv0 blue link dim db bl pl1 b--pink overflow-scroll nowrap"
                onClick={e => onSelectEmployee(sup.positionId)}
              >
                {supIndex > 0 ? (
                  <span className="f6 pink db">⌄</span>
                ) : (
                  undefined
                )}
                {sup.employeeName}
              </a>
            ))}
        </div>
        <ViewOrg
          supervisorsOrg={supervisorsOrg}
          onSelectEmployee={onSelectEmployee}
        />
      </div>
    </div>
  );
};

const organizationNodes = state => state.employeesReducer.organization;

const selectedNode = state => state.employeesReducer.selectedEmployee;

// TODO Fix this:
const supervisorsOrganizationWithEmployeeNames = createSelector(
  organizationNodes,
  selectedNode,
  (orgNodes: OrganizationNode[], selectedEe: number) => {
    return getOrganizationBySupervisor(orgNodes, selectedEe);
  }
);

const organizationWithEmployeeNames = createSelector(
  organizationNodes,
  (org: OrganizationNode[]) => {
    const orgWithAllSups = org.map(orgNode =>
      getIterativeSupervisors(orgNode, org)
    );
    return orgWithAllSups;
  }
);

const organizationNodeSelectedEmployee = createSelector(
  organizationWithEmployeeNames,
  selectedNode,
  (org: OrganizationNode[], node: number): OrganizationNode[] => {
    const selectedOrgNode = org.find(orgNode => orgNode.positionId === node);
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

const mapStateToProps = (state: CombinedState) => {
  return {
    selectedEmployee: state.employeesReducer.selectedEmployee,
    organization: organizationWithEmployeeNames(state),
    supervisorsOrg: supervisorsOrganizationWithEmployeeNames(state),
    supervisorChain: organizationNodeSelectedEmployee(state),
    nextAvailableId: nextAvailableIdSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectEmployee: positionId => dispatch(selectEmployee(positionId)),
    onAddNewEmployee: (newPositionId, currentNodeId) =>
      dispatch(addNewEmployee(newPositionId, currentNodeId)),
    onDeleteAllEmployees: () => dispatch(deleteAllEmployees()),
    onDeleteEmployee: positionId => dispatch(deleteEmployee(positionId))
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(OrgView);

export default App;
