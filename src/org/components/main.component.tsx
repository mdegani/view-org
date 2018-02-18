import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import Toolbar from "./toolbar.component";
import ViewOrg from "./viewOrg.component";
import NodeForm from "./nodeForm.component";
import {
  selectOrgNode,
  addOrgNode,
  updateNewEmployeeName
} from "../actions/org.actions";
import {
  getOrgBySupervisor,
  getIterativeSupervisors
} from "../logic/org.logic";
import { OrgNode, CombinedState, FormState } from "../types/org.types";

const OrgView = ({
  onSelectEmployee,
  onAddNewEmployee,
  supervisorsOrg,
  supervisorChain,
  nextAvailableId,
  formState,
  formTargetNode,
  onUpdateNewName,
  nameValid
}: {
  // TODO: better typing for this function https://www.typescriptlang.org/docs/handbook/functions.html
  onSelectEmployee: Function;
  onAddNewEmployee: (newPositionId: number, currentNodeId: number) => void; // TODO: is void right??
  supervisorsOrg: OrgNode[];
  supervisorChain: OrgNode[];
  nextAvailableId: number;
  formState: FormState;
  formTargetNode: number;
  onUpdateNewName: Function;
  nameValid: boolean;
}) => {
  return (
    <div className="App">
      <Toolbar />
      <div className="px-8" style={{ paddingTop: "5.3rem" }}>
        {formState === FormState.hidden ? (
          <>
            <div>
              {/* filtering out positionId -1, temporarily, until we figure out how to handle 🕴 */}
              {supervisorChain
                .filter(sup => sup.positionId !== -1)
                .map((sup, supIndex) => (
                  <a
                    href="#"
                    key={sup.employeeId}
                    className={
                      "text-base font-semibold py-0 text-blue no-underline opacity-100 block border-l " +
                      "pl-1 border-hot-pink overflow-scroll flex-no-wrap"
                    }
                    onClick={e => onSelectEmployee(sup.positionId)}
                  >
                    {supIndex > 0 ? (
                      <span className="text-sm text-hot-pink block">⌄</span>
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
          </>
        ) : (
          <NodeForm
            formState={formState}
            formTargetNode={formTargetNode}
            onAddNewEmployee={onAddNewEmployee.bind(null, nextAvailableId)}
            onUpdateNewName={onUpdateNewName}
            nameValid={nameValid}
          />
        )}
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
  (orgNodes: OrgNode[], selectedEe: number) => {
    return getOrgBySupervisor(orgNodes, selectedEe);
  }
);

const organizationWithEmployeeNames = createSelector(
  organizationNodes,
  (org: OrgNode[]) => {
    const orgWithAllSups = org.map(orgNode =>
      getIterativeSupervisors(orgNode, org)
    );
    return orgWithAllSups;
  }
);

const organizationNodeSelectedEmployee = createSelector(
  organizationWithEmployeeNames,
  selectedNode,
  (org: OrgNode[], node: number): OrgNode[] => {
    const selectedOrgNode = org.find(orgNode => orgNode.positionId === node);
    return selectedOrgNode!.allSupervisors!.map(supId => {
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
  (org: OrgNode[]) => {
    return Math.max(...org.map(orgNode => orgNode.positionId)) + 1;
  }
);

const mapStateToProps = (state: CombinedState) => {
  return {
    supervisorsOrg: supervisorsOrganizationWithEmployeeNames(state),
    supervisorChain: organizationNodeSelectedEmployee(state),
    nextAvailableId: nextAvailableIdSelector(state),
    formState: state.employeesReducer.nodeForm.state,
    formTargetNode: state.employeesReducer.nodeForm.targetNode,
    nameValid: state.employeesReducer.nodeForm.newName.length > 2
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectEmployee: positionId => dispatch(selectOrgNode(positionId)),
    onAddNewEmployee: (newPositionId, currentNodeId, employeeName) =>
      dispatch(addOrgNode(newPositionId, currentNodeId, employeeName)),
    onUpdateNewName: (newName: string) =>
      dispatch(updateNewEmployeeName(newName))
  };
};

const MainOrgView = connect(mapStateToProps, mapDispatchToProps)(OrgView);

export default MainOrgView;
