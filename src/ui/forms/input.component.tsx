import * as React from "react";

export default ({
  type,
  placeholder,
  onChange,
  valid,
  value
}: {
  type: string;
  placeholder: string;
  // tslint:disable-next-line:no-any
  onChange: any;
  valid: boolean;
  value: string;
}) => {
  return (
    <>
      <input
        className={[
          "appearance-none block w-full bg-yellow-lightest text-grey-darker border ",
          "border-hot-pink rounded-sm p-2 mb-3 shadow"
        ].join("")}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {!valid ? (
        <p className="text-red text-xs italic font-normal">
          Please fill out this field.
        </p>
      ) : (
        undefined
      )}
    </>
  );
};
