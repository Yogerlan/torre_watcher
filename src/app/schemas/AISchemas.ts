import { z } from "zod"
import { JobsSkill } from "./JobsSchemas"

export const SkillsCategoriesSchema = z.object({
  categories: z.array(z.object({
    name: z.string(),
    total: z.number(),
    skills: z.array(z.string())
  }))
})

export interface EnhancedJobsSkill extends JobsSkill {
  backgroundColor: string
}

export interface SkillsCategory {
  name: string
  backgroundColor: string
  total: number
  skills: EnhancedJobsSkill[]
}

export interface SkillsCategoriesResponse {
  categories: SkillsCategory[]
}
