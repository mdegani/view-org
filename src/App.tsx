import * as React from 'react';
import { connect } from 'react-redux';
import Select from './atoms/Select';
import ViewOrg from './components/ViewOrg';
import { selectEmployee } from './store/actions';
import {
  getOrganizationBySupervisor,
  organizationWithName,
} from './store/org-view-logic';
import './App.css';

const OrgView = ({
  selectedEmployee,
  organization,
  onSelectEmployee,
  supervisorsOrg,
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
    organization: organizationWithName(
      state.employeesReducer.organization,
      state.employeesReducer.employees,
    ),
    supervisorsOrg: getOrganizationBySupervisor(
      state.employeesReducer.organization,
      state.employeesReducer.employees,
      state.employeesReducer.selectedEmployee,
    ),
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

export default App;
