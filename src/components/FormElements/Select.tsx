import React, { FC } from "react";

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options?: { value: string; display: string }[];
  label?: string;
  inline?: boolean;
  wide?: boolean;
};

const Select: FC<Props> = ({
  label = "",
  options = [],
  inline = false,
  wide = true,
  ...props
}) => {
  return (
    <div
      className={`flex gap-2 ${wide && "w-full"} ${
        inline ? "flex-row items-center" : "flex-col"
      }`}
    >
      <label htmlFor={props.name} className="text-slate-500">
        {label}
        {props.required && <sup className="text-sm text-red-500">*</sup>}
      </label>
      <select
        className="py-[.61rem] px-2 border-2 rounded-md w-full"
        {...props}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.display}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
