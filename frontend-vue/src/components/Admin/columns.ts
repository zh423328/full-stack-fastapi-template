import type { UserPublic } from "@/client"

export interface UserColumn {
  key: keyof UserPublic | "actions"
  header: string
}

export const columns: UserColumn[] = [
  {
    key: "full_name",
    header: "Full Name",
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "is_superuser",
    header: "Role",
  },
  {
    key: "is_active",
    header: "Status",
  },
  {
    key: "actions",
    header: "Actions",
  },
]
