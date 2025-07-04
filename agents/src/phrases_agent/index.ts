/**
 * @fileoverview Generates phrases about a given topic in multiple languages using an LLM agent.
 * @module phrases_agent
 * @author Lucas Himelfarb
 * @created 2024-06-10
 */

import type { Options } from './index.types'

import { ChatOpenAI } from '@langchain/openai'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

import 'dotenv/config'

/**
 * Generates phrases about a specific topic in the requested languages.
 *
 * @param options - Configuration options for phrase generation.
 * @param options.length - Number of phrases to generate (must be between 1 and 10).
 * @param options.languages - Array of languages for the phrases (1 to 3 languages).
 * @param options.topic - The topic for the generated phrases.
 * @returns A promise that resolves with the generated phrases.
 * @throws Error if the length or languages constraints are violated.
 */
export default async ({
  length = 10,
  languages = ['english'],
  topic = 'Stoic philosophy',
}: Options) => {
  if (length > 10 || length < 1) {
    throw new Error('Length must be between 1 and 10')
  }
  if (languages.length === 0 || languages.length > 3) {
    throw new Error('Languages must be between 1 and 3')
  }

  const llm = new ChatOpenAI({
    temperature: 0.5,
  })

  const prompt = `
    # who you are?
    You are a Master of ${topic}.
    # what is your duty?
    Helping people to generate phrases that are related to ${topic}.
  `

  const agent = createReactAgent({
    llm,
    prompt,
    tools: [],
  })

  return await agent.invoke({
    messages: [
      {
        content: `
          - Generate ${length} phrases about ${topic}.
          - The phrases should be in ${languages.join(', ')}.
          `,
        role: 'user',
      },
    ],
  })
}
