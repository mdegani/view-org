import * as React from "react";
import { FormState } from "../types/org.types";
import Label from "../../ui/forms/Label";
import Input from "../../ui/forms/Input";
import Button from "../../ui/button/Button";
import Form from "../../ui/forms/Form";

export default ({
  formState,
  formTargetNode,
  onAddNewEmployee,
  onUpdateNewName,
  nameValid
}: {
  formState: FormState;
  formTargetNode: number;
  onAddNewEmployee: Function;
  onUpdateNewName: Function;
  nameValid: boolean;
}) => {
  const handleChange = e => {
    onUpdateNewName(e.target.value);
  };
  return (
    <Form
      className="w-full max-w-md"
      onSubmit={() => onAddNewEmployee(formTargetNode)}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <Label text="First Name">
            <Input
              type="text"
              placeholder="Jane"
              // value={"state name"}
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
