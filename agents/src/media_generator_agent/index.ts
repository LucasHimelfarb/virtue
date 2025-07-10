/**
 * @created 2025-06-08
 * @author Lucas Himelfarb
 * @module media_generator_agent
 * @fileoverview Generates Images for social media post like Reels in Instagram or Shorts in YouTube.
 */

import { type Phrases } from '../phrases_agent/index.types'

import { ChatOpenAI } from '@langchain/openai'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

interface Params {
  phrases: Phrases
}

export default async ({ phrases }: Params) => {
  const llm = new ChatOpenAI({
    temperature: 0.9,
  })

  const prompt = `
    # who you are?
    You are a designer who has a great ability to draw aesthetic images.
    # what is your duty?
    Design images for social media post like reels in Instagram or Short in YouTube.
  `

  const agent = createReactAgent({
    llm,
    prompt,
    tools: [],
  })

  return await agent.invoke({
    messages: [
      {
        role: 'user',
        content: `
          - Design images for social media post with dimensions of 1080x1920 pixels.
          - The images should be in the style of the phrases.
          - Imagine the images as a collage of the phrases.
          - phrases to use: ${phrases.map(({ phrase }) => phrase).join(', ')}
        `,
      },
    ],
  })
}
