import * as React from "react";
import { FormStateEnum, AddNewOrgNodeFormState } from "../types/org.types";
import Label from "../../ui/forms/label.component";
import Input from "../../ui/forms/input.component";
import Button from "../../ui/button/button.component";
import Form from "../../ui/forms/form.component";
import { FormInstance } from "../actions/org-node-form.actions";

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
  onAddNewOrgNode: Function;
  onUpdateNewName: Function;
  nameValid: boolean;
  formValuesState: AddNewOrgNodeFormState;
}) => {
  return (
    <Form
      className="w-full max-w-md"
      onSubmit={() => {
        onAddNewOrgNode(formTargetNode, formValuesState.name);
      }}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Label text="First Name">
            <Input
              placeholder="Jane"
              fieldName="name"
              formName={FormInstance.NewNodeForm}
            />
          </Label>
          <Label text="Last Name">
            <Input
              placeholder="Doe"
              fieldName="lastName"
              formName={FormInstance.NewNodeForm}
            />
          </Label>
        </div>
      </div>
      <Button />
    </Form>
  );
};
