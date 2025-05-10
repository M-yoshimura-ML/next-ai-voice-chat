import { useId } from "react";

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export const Switch = ({ checked, onCheckedChange }: Props) => {
  const id = useId();

  return (
    <label htmlFor={id} className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <div
        className={`w-10 h-6 rounded-full py-1 transition ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </div>
    </label>
  );
};
