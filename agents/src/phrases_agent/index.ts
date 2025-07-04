import type { Options } from './index.types'

import { ChatOpenAI } from '@langchain/openai'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

import 'dotenv/config'

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
