import * as React from 'react';
import { OrganizationNodeWithEmployeeInfo } from '../store/organization.types';

export default ({
  supervisorsOrg,
}: {
  supervisorsOrg: OrganizationNodeWithEmployeeInfo[];
}) => {
  return (
    <div className="measure">
      <span className="pt3 f6 b db mb2">
        direct and indirect reports for this employee
      </span>
      <ul className="list pl0 ml0 center ba b--light-silver br3 bg-white">
        {!supervisorsOrg.length ? <div>none</div> : null}
        {supervisorsOrg.map(organizationNode => {
          return (
            <li
              key={organizationNode.positionId}
              className="ph3 pv2 bb b--light-silver"
            >
              {organizationNode.employeeName} audit:{' '}
              {(organizationNode.allSups || []).join('->')}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
