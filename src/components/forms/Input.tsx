import * as React from "react";

export default ({
  type,
  placeholder
}: {
  type: string;
  placeholder: string;
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
      />
      <p className="text-red text-xs italic font-normal">
        Please fill out this field.
      </p>
    </>
  );
};
