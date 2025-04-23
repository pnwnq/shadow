"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider
  // type ThemeProviderProps, // Removed as it's not exported
} from "next-themes"

// Use React.ComponentProps to get the props type directly from the component
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
