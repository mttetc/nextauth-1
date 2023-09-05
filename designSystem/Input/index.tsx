import { InputHTMLAttributes, useId } from "react";
import classNames from "classnames";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  variant?: "outline" | "solid";
  color?: "blue" | "green" | "red" | "yellow";
};

export const Input = ({ label, variant = "outline", color = "blue", ...restProps }: InputProps) => {
  const id = useId();
  const computedId = restProps.id ?? id;

  const variantClasses = {
    outline: "border border-blue-gray-200 border-t-transparent",
    solid: "border border-transparent bg-blue-gray-50",
  };

  const colorClasses = {
    blue: "focus:border-blue-500 focus:border-t-transparent",
    green: "focus:border-green-500 focus:border-t-transparent",
    red: "focus:border-red-500 focus:border-t-transparent",
    yellow: "focus:border-yellow-500 focus:border-t-transparent",
  };

  const inputClasses = classNames(
    "peer h-full w-full rounded-[7px] px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50",
    variantClasses[variant],
    colorClasses[color]
  );

  const labelClasses = classNames(
    "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all"
  );

  return (
    <div className="relative mb-3" data-te-input-wrapper-init>
      <input {...restProps} id={computedId} className={inputClasses} />
      <label htmlFor={computedId} className={labelClasses}>
        {label}
      </label>
    </div>
  );
};