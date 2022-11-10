import React from "react";
import get from "lodash.get";
import { Option, OptionProps } from "./option";

interface QuestionProps {
  id: string;
  label: string;
  correctOption?: string;
  selectedOption?: string;
  onSelectOption: (questionId: string, optionId: string) => void;
}

export const Question = ({
  id,
  label,
  correctOption,
  selectedOption,
  onSelectOption,
  children,
}: React.PropsWithChildren<QuestionProps>) => {
  const manipulatedChildren = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.type === Option)
    .map((child) => {
      const optionId = get(child, "props.id", "");
      return React.cloneElement(child as React.ReactElement<OptionProps>, {
        name: id,
        value: optionId,
        checked: selectedOption === optionId,
        onChange: () => onSelectOption(id, optionId),
        status: correctOption
          ? optionId === correctOption
            ? "correct"
            : optionId === selectedOption
            ? "incorrect"
            : "default"
          : "default",
      });
    });

  return (
    <div
      className={`flex flex-col gap-4 my-4 ${
        correctOption ? "pointer-events-none opacity-80" : ""
      }`}
    >
      <div className="font-bold">{label}</div>
      <div className="flex flex-col gap-2">{manipulatedChildren}</div>
    </div>
  );
};
