import React, { FC } from "react";

type InputProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string;
};

const TextArea: FC<InputProps> = ({ ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.name} className="text-slate-500">
        {props.label ?? props.name}{" "}
        {props.required && <sup className="text-red-500">*</sup>}
      </label>
      <textarea
        {...props}
        className="rounded-md w-full text-slate-900 border-2 p-2"
      />
    </div>
  );
};

export default TextArea;
