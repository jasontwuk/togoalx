import clsx from "clsx";
import React from "react";

type InputProps = {
  value: string | number;
  type: string;
  placeholder?: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number;
  max?: number;
};

export const Input = (props: InputProps) => {
  const { value, type, placeholder, changeHandler, className, min, max } =
    props;

  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={changeHandler}
      className={clsx(
        // *** Note: general
        "w-full border border-solid border-gray-300 duration-200",

        // *** Note: focus-visible
        "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-yellow-500",
        className,
      )}
      min={min}
      max={max}
    />
  );
};
