import * as React from "react";
import { FormState } from "../types/org.types";
import Label from "../../ui/forms/label.component";
import Input from "../../ui/forms/input.component";
import Button from "../../ui/button/button.component";
import Form from "../../ui/forms/form.component";

export default ({
  formState,
  formTargetNode,
  onAddNewOrgNode,
  onUpdateNewName,
  nameValid
}: {
  formState: FormState;
  formTargetNode: number;
  onAddNewOrgNode: Function;
  onUpdateNewName: Function;
  nameValid: boolean;
}) => {
  const handleChange = e => {
    onUpdateNewName(e.target.value);
  };
  return (
    <Form
      className="w-full max-w-md"
      onSubmit={() => onAddNewOrgNode(formTargetNode)}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Label text="First Name">
            <Input
              type="text"
              placeholder="Jane"
              onChange={handleChange}
              valid={nameValid}
            />
          </Label>
        </div>
      </div>
      <Button />
    </Form>
  );
};
