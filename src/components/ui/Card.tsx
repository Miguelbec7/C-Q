import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-navy-100 bg-white p-6 shadow-premium-sm transition-shadow hover:shadow-premium",
        className
      )}
    >
      {children}
    </div>
  );
}
