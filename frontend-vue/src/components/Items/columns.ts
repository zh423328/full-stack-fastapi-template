import type { ItemPublic } from "@/client"

export interface ItemColumn {
  key: keyof ItemPublic | "actions"
  header: string
  cell?: (item: ItemPublic) => any
}

export const columns: ItemColumn[] = [
  {
    key: "id",
    header: "ID",
  },
  {
    key: "title",
    header: "Title",
  },
  {
    key: "description",
    header: "Description",
  },
  {
    key: "actions",
    header: "Actions",
  },
]
