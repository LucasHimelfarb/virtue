import { z } from 'zod'

export type Format = 'json' | 'markdown' | 'text'
export type Language = 'portuguese' | 'spanish' | 'english'

export interface Options {
  topic: string
  length?: number
  languages: Language[]
}

export const responseFormat = z.object({
  phrases: z.array(
    z.object({
      phrase: z.string().describe('The phrase itself'),
      language: z.string().describe('The language of the phrase'),
      author: z
        .string()
        .optional()
        .describe('The author of the phrase. (optional)'),
    })
  ),
})

export type Phrases = z.infer<typeof responseFormat>['phrases']
