// TODO: type for state
import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import ViewOrg from "./components/ViewOrg";
import { selectEmployee } from "./store/actions";
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
  supervisorsOrg,
  supervisorChain
}: {
  selectedEmployee: string;
  organization: OrganizationNode[];
  // TODO: better typing for this function https://www.typescriptlang.org/docs/handbook/functions.html
  onSelectEmployee: Function;
  supervisorsOrg: OrganizationNode[];
  supervisorChain: OrganizationNode[];
}) => {
  return (
    <div className="App">
      <nav className="pa4">
        <div className="b f5 hot-pink">Organization View</div>
      </nav>
      <div className="ph4">
        <div>
          {/* this should be positions! */}
          {/* filtering out positionId -1, temporily, until we figure out how to handle 🕴 */}
          {supervisorChain.filter(sup => sup.positionId !== -1).map(sup => (
            <li key={sup.employeeId}>
              {" "}
              <button
                className="f6 link dim br1 ba ph3 pv2 mb2 dib black"
                onClick={e => onSelectEmployee(sup.positionId)}
              >
                {sup.employeeName}
              </button>
            </li>
          ))}
        </div>
        <div className="f3">
          {
            getOrganizationNodeById(organization, +selectedEmployee)!
              .employeeName
          }
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

const mapStateToProps = (state: CombinedState) => {
  return {
    selectedEmployee: state.employeesReducer.selectedEmployee,
    organization: organizationWithEmployeeNames(state),
    supervisorsOrg: supervisorsOrganizationWithEmployeeNames(state),
    supervisorChain: organizationNodeSelectedEmployee(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectEmployee: positionId => {
      dispatch(selectEmployee(positionId));
    }
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(OrgView);

export default App;
