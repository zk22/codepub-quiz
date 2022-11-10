export interface OptionProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: "correct" | "incorrect" | "default";
}

export const Option = ({
  status = "default",
  checked,
  children,
  ...props
}: React.PropsWithChildren<OptionProps>) => {
  return (
    <label
      className={`flex gap-4 p-4 items-center cursor-pointer rounded shadow ${
        status === "correct"
          ? "bg-green-300"
          : status === "incorrect"
          ? "bg-red-300"
          : checked
          ? "bg-purple-300"
          : "bg-purple-100"
      }`}
    >
      <input
        type="radio"
        checked={checked}
        className={`rounded-lg outline-none ring-offset-transparent focus:outline-none focus:ring-offset-transparent focus:ring-transparent bg-inherit text-zinc-700`}
        {...props}
      />
      {children}
    </label>
  );
};
