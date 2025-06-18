export type Document = {
      id: string
      title: string
      fileName: string
      description: string | null
      url: string
      type: string
      size: number
      category: string
      tags: string[]
      isTemplate: boolean
      createdAt: string
      updatedAt: string
      uploaderId: string
}

export type Role = "SUPER_ADMIN" | "ADMIN" | "MEMBER" | "COMPETITION_ACCOUNTANT" 