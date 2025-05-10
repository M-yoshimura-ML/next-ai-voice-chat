import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/utils";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
