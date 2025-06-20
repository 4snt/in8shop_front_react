"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          pt-6
          p-4
          outline-none
          bg-[var(--surface)]
          text-[var(--foreground)]
          font-light
          border-2
          rounded-lg
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? "border-rose-500" : "border-[var(--border)]"}
          ${
            errors[id]
              ? "focus:border-rose-500"
              : "focus:border-[var(--foreground)]"
          }
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute
          cursor-text
          text-sm
          text-[var(--muted)]
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          left-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${
            errors[id]
              ? "focus:border-rose-500"
              : "focus:border-[var(--foreground)]"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
