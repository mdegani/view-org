import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {
  deleteEmployee,
  deleteAllOrgNodes,
  startAddNewOrgNode
} from "../actions/org.actions";
import { OrgNode, CombinedState } from "../types/org.types";
import { getOrgNodeById, getIterativeSupervisors } from "../logic/org.logic";

const component = ({
  organization,
  selectedEmployee,
  onStartAddNewEmployee,
  onDeleteAllEmployees,
  onDeleteEmployee
}: {
  organization: OrgNode[];
  selectedEmployee: string;
  onStartAddNewEmployee: Function;
  onDeleteAllEmployees: () => void;
  onDeleteEmployee: (newPositionId: number) => void;
}) => {
  return (
    <nav className="bg-black w-full fixed flex flex-col">
      <div className="font-bold text-base text-hot-pink py-2">
        Organization View
      </div>
      <div className="flex justify-between">
        <div className="text-2xl p-2 bg-white overflow-scroll flex-no-wrap w-full">
          {getOrgNodeById(organization, +selectedEmployee)!.employeeName}
        </div>
        <a
          href="#"
          className="text-sm no-underline opacity-100 px-3 ph-1 mb-2 inline-block text-white"
          onClick={() => onStartAddNewEmployee(+selectedEmployee)}
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
  );
};

const organizationNodes = state => state.employeesReducer.organization;

const organizationWithEmployeeNames = createSelector(
  organizationNodes,
  (org: OrgNode[]) => {
    const orgWithAllSups = org.map(orgNode =>
      getIterativeSupervisors(orgNode, org)
    );
    return orgWithAllSups;
  }
);

const mapStateToProps = (state: CombinedState) => {
  return {
    selectedEmployee: state.employeesReducer.selectedEmployee,
    organization: organizationWithEmployeeNames(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteAllEmployees: () => dispatch(deleteAllOrgNodes()),
    onDeleteEmployee: positionId => dispatch(deleteEmployee(positionId)),
    onStartAddNewEmployee: (supervisorNode, newName) =>
      dispatch(startAddNewOrgNode(supervisorNode, newName))
  };
};

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(component);

export default Toolbar;
