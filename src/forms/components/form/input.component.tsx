import * as React from "react";
import { connect } from "react-redux";
import { CombinedState } from "../../../org/types/org.types";
import {
  saveFormValueString,
  FormInstance
} from "../../../forms/actions/from.actions";

const textInput = ({
  placeholder,
  onChange,
  value,
  fieldName,
  formName
}: {
  placeholder: string;
  onChange: Function;
  value: Function;
  fieldName: string;
  formName: FormInstance;
}) => {
  return (
    <>
      <input
        className={[
          "appearance-none block w-full bg-yellow-lightest text-grey-darker border ",
          "border-hot-pink rounded-sm p-2 mb-3 shadow"
        ].join("")}
        type="text"
        placeholder={placeholder}
        onChange={onChange(formName, fieldName)}
        value={value(formName, fieldName)}
      />
      {/* {!valid ? (
        <p className="text-red text-xs italic font-normal">
          Please fill out this field.
        </p>
      ) : (
        undefined
      )} */}
    </>
  );
};

const formValue = (state: CombinedState) => (formName, fieldName) => {
  return state.formReducer[formName][fieldName];
};

const mapStateToProps = (state: CombinedState) => {
  return {
    value: formValue(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (formName: FormInstance, field: string) => newValue =>
      dispatch(saveFormValueString(formName, field, newValue.target.value))
  };
};

const Input = connect(mapStateToProps, mapDispatchToProps)(textInput);

export default Input;
