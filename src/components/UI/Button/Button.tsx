import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition",
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
