const INPUT_CLASS = [
  "w-full",
  "rounded-lg",
  "ring-violet-500",
  "border-violet-500",
  "focus:ring-violet-500",
  "focus:border-violet-500",
];

export const Input = ({
  disabled,
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      disabled={disabled}
      onChange={onChange}
      className={`${INPUT_CLASS.join(" ")}`}
      {...props}
    />
  );
};
