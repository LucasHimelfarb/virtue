import type { Options } from './index.types'

import { ChatOpenAI } from '@langchain/openai'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

import 'dotenv/config'

export default async ({
  length = 10,
  format = 'json',
  languages = ['english'],
  topic = 'Stoic philosophy',
}: Options) => {
  console.log('--> Starting phrases agent <--')

  const llm = new ChatOpenAI({
    temperature: 0.5,
    apiKey: process.env.OPENAI_API_KEY,
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

  const result = await agent.invoke({
    messages: [
      {
        content: `
        - Generate ${length} phrases about ${topic}.
        - The phrases should be in ${languages.join(', ')}.
        - Your response should be formatted in ${format}.
        `,
        role: 'user',
      },
    ],
  })

  console.log('--> Phrases agent finished <--')

  return result
}
