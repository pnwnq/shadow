import type { Metadata } from "next"
import FriendsPageClient from "./FriendsPageClient"

export const metadata: Metadata = {
  title: "好友与协作",
  description: "管理您的好友和协作伙伴",
}

export default function FriendsPage() {
  return <FriendsPageClient />
}
