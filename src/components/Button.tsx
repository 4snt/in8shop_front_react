"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
  type,
}) => {
  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      className={` 
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        border
        flex
        items-center
        justify-center
        gap-2
        ${
          outline
            ? "bg-[var(--background)] text-[var(--foreground)] border-[var(--border)]"
            : "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
        }
        ${
          small
            ? "text-sm font-light py-1 px-2 border-[1px]"
            : "text-md font-semibold py-3 px-4 border-[3px]"
        }
        ${custom ? custom : ""}
      `}
    >
      {Icon && <Icon size={small ? 18 : 24} />}
      {label}
    </button>
  );
};

export default Button;
