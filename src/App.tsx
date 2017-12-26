import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Select from './atoms/Select';
import ViewOrg from './components/ViewOrg';
import { selectEmployee } from './store/actions';
import {
  getOrganizationBySupervisor,
  addEmployeeInfoToOrganizationNode,
} from './store/org-view-logic';
import './App.css';
import {
  OrganizationNode,
  Employee,
  OrganizationNodeWithEmployeeInfo,
} from './store/organization.types';

const OrgView = ({
  selectedEmployee,
  organization,
  onSelectEmployee,
  supervisorsOrg,
}: {
  selectedEmployee: string;
  organization: OrganizationNodeWithEmployeeInfo[];
  onSelectEmployee: Function;
  supervisorsOrg: OrganizationNodeWithEmployeeInfo[];
}) => {
  return (
    <div className="App">
      <nav className="pa4">
        <div className="b f5 hot-pink">Organization View</div>
      </nav>
      <div className="ph4">
        <Select
          items={organization}
          label="select an employee"
          changeFunction={onSelectEmployee}
          selectedItem={selectedEmployee}
        />
        <ViewOrg supervisorsOrg={supervisorsOrg} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedEmployee: state.employeesReducer.selectedEmployee,
    organization: organizationWithEmployeeNames(state),
    supervisorsOrg: supervisorsOrganizationWithEmployeeNames(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectEmployee: positionId => {
      dispatch(selectEmployee(positionId));
    },
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(OrgView);

const employees = state => state.employeesReducer.employees;

const organizationNodes = state => state.employeesReducer.organization;

const selectedNode = state => state.employeesReducer.selectedEmployee;

const supervisorsOrganizationWithEmployeeNames = createSelector(
  organizationNodes,
  selectedNode,
  employees,
  (orgNodes: OrganizationNode[], selectedEe: number, ees: Employee[]) => {
    return getOrganizationBySupervisor(orgNodes, selectedEe).map(
      addEmployeeInfoToOrganizationNode(ees),
    );
  },
);

const organizationWithEmployeeNames = createSelector(
  organizationNodes,
  employees,
  (org: OrganizationNode[], ees: Employee[]) => {
    return org.map(addEmployeeInfoToOrganizationNode(ees));
  },
);

export default App;
