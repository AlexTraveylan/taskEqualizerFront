import { z } from "zod"

export const possibleTaskSchema = z.object({
  id: z.string(),
  possible_task_name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  family_id: z.string(),
})

export type PossibleTask = z.infer<typeof possibleTaskSchema>
