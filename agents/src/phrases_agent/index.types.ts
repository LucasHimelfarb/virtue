export type Format = 'json' | 'markdown' | 'text'
export type Language = 'portuguese' | 'spanish' | 'english'

export interface Options {
  topic: string
  format?: Format
  length?: number
  languages: Language[]
}
