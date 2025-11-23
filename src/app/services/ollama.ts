import { Injectable } from '@angular/core'
import { Ollama } from 'ollama/browser'
import zodToJsonSchema from 'zod-to-json-schema'
import { environment } from '../../environments/environment'
import { SkillsCategoriesSchema, SkillsCategory } from '../schemas/AISchemas'
import { JobsSkill } from '../schemas/JobsSchemas'

@Injectable({
  providedIn: 'root',
})
export class OllamaService {
  private client: Ollama
  private config = environment.production ?
    { host: window.document.location.origin } : undefined;

  constructor() {
    this.client = new Ollama(this.config)
  }

  async getSkillsCategories(skills: JobsSkill[]): Promise<SkillsCategory[]> {
    if (skills.length === 0) return []

    const response = await this.client.chat({
      model: 'qwen2.5:7b',
      messages: [
        {
          role: 'system',
          content: 'You are a precise JSON-only API.'
        }, {
          role: 'user',
          content: `
          Classify the skills into a maximum of 10 categories.
          The last category should be called \`other\` and include the least common or least related skills.
          total = sum(skill.total): \`${JSON.stringify(skills)}\``
        }
      ],
      format: zodToJsonSchema(SkillsCategoriesSchema),
    })

    console.log('Ollama response:', response)

    const categories = SkillsCategoriesSchema.parse(JSON.parse(response.message.content))?.categories || []

    if (categories.length === 0) return []

    // Enhance skills with background colors
    const enhancedSkills = skills.map((skill: JobsSkill) => {
      const backgroundColor = this.getRandomColor()

      return { ...skill, backgroundColor }
    })
    console.log('Enhanced Skills:', enhancedSkills)

    // Enhance categories with skill objects and background colors
    const skillsCategories = categories.map((category) => {
      const skills = enhancedSkills.filter(skill => category.skills.includes(skill.value)) || []
      const backgroundColor = this.getRandomColor()

      return { ...category, skills, backgroundColor }
    })
    console.log('Skills Categories:', skillsCategories)

    return skillsCategories
  }

  private getRandomColor(): string {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return `rgba(${r}, ${g}, ${b}, 0.5)`
  }
}
