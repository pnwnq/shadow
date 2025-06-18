import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "@/auth"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currentUser = async () => {
  const session = await auth()

  return session?.user
}

export const currentRole = async () => {
  const session = await auth()

  return session?.user?.role
}
