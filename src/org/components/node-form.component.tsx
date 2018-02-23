import * as React from "react";
import { FormStateEnum, FormField } from "../types/org.types";
import Label from "../../ui/forms/label.component";
import Input from "../../ui/forms/input.component";
import Button from "../../ui/button/button.component";
import Form from "../../ui/forms/form.component";

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
  formValuesState: FormField;
}) => {
  const handleChange = e => {
    onUpdateNewName(e.target.value);
  };
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
              type="text"
              placeholder="Jane"
              onChange={handleChange}
              // type assertion is not ideal here:
              value={formValuesState && (formValuesState.name as string)}
              valid={nameValid}
            />
          </Label>
        </div>
      </div>
      <Button />
    </Form>
  );
};
