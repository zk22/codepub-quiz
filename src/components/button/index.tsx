import { Loading } from "../loading";

const BUTTON_CLASS = [
  "py-2",
  "px-4",
  "w-full",
  "md:w-fit",
  "bg-violet-500",
  "text-white",
  "font-bold",
  "rounded-full",
  "inline-flex",
  "items-center",
  "justify-center",
  "focus:outline-none",
  "focus-visible:outline-none",
  "disabled:bg-zinc-300",
];

interface ButtonProps {
  loading?: boolean;
}

export const Button = ({
  loading,
  disabled,
  onClick,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${BUTTON_CLASS.join(" ")}`}
      {...props}
    >
      {children}
      {loading && <Loading />}
    </button>
  );
};
