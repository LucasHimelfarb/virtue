import { z } from 'zod'

export type Format = 'json' | 'markdown' | 'text'
export const languageEnum = z.enum(['portuguese', 'spanish', 'english'])
export type Language = z.infer<typeof languageEnum>

export interface Options {
  topic: string
  length?: number
  languages: Language[]
}

export const responseFormat = z.object({
  phrases: z.array(
    z.object({
      phrase: z.string().describe('The phrase itself'),
      language: languageEnum.describe('The language of the phrase'),
      author: z
        .string()
        .optional()
        .describe('The author of the phrase. (optional)'),
    })
  ),
})

export type Phrases = z.infer<typeof responseFormat>['phrases']
