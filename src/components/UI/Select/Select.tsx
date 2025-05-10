import { ReactNode } from "react";
import { cn } from "@/utils/utils";

type Props<T extends string> =  {
  value: T;
  className?: string;
  onValueChange: (value: T) => void;
  children: ReactNode;
};


export function Select<T extends string>({ value, className, onValueChange, children, ...props }: Props<T>) {
  return (
    <select
      value={value}
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500",
        className
      )}
      onChange={(e) => onValueChange(e.target.value as T)}
      {...props}
    >
      {children}
    </select>
  );
}
