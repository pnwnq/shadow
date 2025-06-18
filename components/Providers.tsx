"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

interface ProvidersProps {
      children: React.ReactNode
}

const queryClient = new QueryClient()

const Providers: React.FC<ProvidersProps> = ({ children }) => {
      return (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      )
}

export default Providers 