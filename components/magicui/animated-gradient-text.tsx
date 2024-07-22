import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "transition-shadow duration-500 ease-out [--bg-size:300%] text-bold",
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
