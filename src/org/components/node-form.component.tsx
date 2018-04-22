import * as React from "react";
import { FormStateEnum, AddNewOrgNodeFormState } from "../types/org.types";
import VOLabel from "../../forms/components/form/label.component";
import VOInput from "../../forms/components/form/input.component";
import Button from "../../forms/components/button/button.component";
import Form from "../../forms/components/form/form.component";
import { FormInstance } from "../../forms/actions/from.actions";

export default ({
  formState,
  formTargetNode,
  onAddNewOrgNode,
  onUpdateNewName,
  nameValid,
  formValuesState
}: {
  formState: FormStateEnum;
  formTargetNode: number;
  onAddNewOrgNode: (
    currentNodeId: number,
    employeeFirstName: string,
    employeeLastName: string,
    employeeGender: string,
    employeePhotoUrl: string
  ) => void;
  onUpdateNewName: (field: string, newValue: string) => void;
  nameValid: boolean;
  formValuesState: AddNewOrgNodeFormState;
}) => {
  return (
    <Form
      className="w-full max-w-md"
      onSubmit={() => {
        onAddNewOrgNode(
          formTargetNode,
          formValuesState.firstName,
          formValuesState.lastName,
          formValuesState.gender,
          formValuesState.picture
        );
      }}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <VOLabel text="First Name">
            <VOInput
              placeholder="Jane"
              fieldName="firstName"
              formName={FormInstance.NewNodeForm}
            />
          </VOLabel>
          <VOLabel text="Last Name">
            <VOInput
              placeholder="Doe"
              fieldName="lastName"
              formName={FormInstance.NewNodeForm}
            />
          </VOLabel>
          <img src={formValuesState.picture} alt="employee picture" />
        </div>
      </div>
      <Button />
    </Form>
  );
};
