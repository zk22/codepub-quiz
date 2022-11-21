interface StepProps {
  current: number;
  total: number;
}

export const Steps = ({ current, total }: StepProps) => {
  return (
    <div className="p-6 bg-purple-100 font-bold sticky top-16 md:top-20">
      Question {current + 1}/{total}
    </div>
  );
};
