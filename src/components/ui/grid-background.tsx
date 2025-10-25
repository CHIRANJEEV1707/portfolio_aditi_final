"use client"

import * as React from "react"

export function GridBackground() {
  return (
    <div
      className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  )
}

    