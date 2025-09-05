import clsx from "clsx";

type CardProps = {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
};

export default function Card({
  children,
  variant = "default",
  padding = "md",
  radius = "md",
  className,
}: CardProps) {
  const cardClasses = clsx(
    "overflow-hidden transition-all bg-white",
    {
      "p-0": padding === "none",
      "p-3": padding === "sm",
      "p-5": padding === "md",
      "p-8": padding === "lg",
    },
    {
      "rounded-none": radius === "none",
      "rounded-sm": radius === "sm",
      "rounded-md": radius === "md",
      "rounded-lg": radius === "lg",
      "rounded-full": radius === "full",
    },
    {
      "border border-gray-200": variant === "default",
      "border border-gray-500 hover:border-gray-400 transition-colors":
        variant === "outlined",
      "shadow-lg hover:shadow-xl transition-shadow": variant === "elevated",
    },
    className,
  );
  return <div className={cardClasses}>{children}</div>;
}
