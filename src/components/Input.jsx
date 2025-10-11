import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          id={id}
          ref={ref}
          {...props}
          className={`w-full px-4 py-2.5 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-md border border-gray-200/60 
            text-gray-800 dark:text-gray-100 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            shadow-sm transition-all duration-200 ease-in-out ${className}`}
          placeholder={label || "Enter text"}
        />
      </div>
    </div>
  );
});

export default Input;
