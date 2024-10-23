import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", placeholder, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor="{id}">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={` px-3 py-2 rounded-lg bg-white text-black outline-none border-gray-950 focus:bg-gray-50 duration-200 border w-full${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;

//There will be multiple input fields for login, signup
//but for the components need to store the reference to send the values for authentication
//we use forwardRef to perform it
