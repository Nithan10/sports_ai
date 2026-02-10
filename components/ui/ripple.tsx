import React, { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 10, // Increased from 8 to 10 for better coverage
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        // Added overflow-hidden to contain the large ripples
        // Adjusted mask-image to keep the top 30% fully visible before fading
        "pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,white_30%,transparent)] select-none",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        // UPDATED: Increased spread factor from 70 to 135.
        // This ensures the largest circles are big enough to fill a 1920px screen width.
        const size = mainCircleSize + i * 135
        const opacity = mainCircleOpacity - i * 0.03
        const animationDelay = `${i * 0.06}s`
        const borderStyle = "solid"

        return (
          <div
            key={i}
            className={`animate-ripple bg-foreground/25 absolute rounded-full border shadow-xl`}
            style={
              {
                "--i": i,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: `var(--foreground)`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
})

Ripple.displayName = "Ripple"