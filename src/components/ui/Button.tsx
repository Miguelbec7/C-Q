import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "gold" | "outline" | "ghost" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 focus-visible:outline-navy-900 shadow-premium-sm",
  gold:
    "bg-gold-400 text-navy-950 hover:bg-gold-300 focus-visible:outline-gold-500 shadow-premium-sm",
  outline:
    "border border-navy-200 text-navy-900 hover:border-navy-400 hover:bg-navy-50",
  ghost: "text-navy-900 hover:bg-navy-50",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebc59] shadow-premium-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">;

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  external,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
