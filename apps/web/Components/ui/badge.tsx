import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-semibold text-xs transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-white text-darkBlack shadow hover:bg-white/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-red-800 text-destructive-foreground shadow hover:bg-red-600/80",
        outline: "text-white bg-darkBlack",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
