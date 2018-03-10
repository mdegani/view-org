import * as React from "react";
import { FormStateEnum, AddNewOrgNodeFormState } from "../types/org.types";
import Label from "../../forms/components/form/label.component";
import Input from "../../forms/components/form/input.component";
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
          <img src={formValuesState.picture} alt="employee picture" />
        </div>
      </div>
      <Button />
    </Form>
  );
};
