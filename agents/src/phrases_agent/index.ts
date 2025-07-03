import { ChatOpenAI } from '@langchain/openai'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

import 'dotenv/config'

export default async () => {
  console.log('--> Starting phrases agent <--')

  const llm = new ChatOpenAI({
    temperature: 0.5,
    apiKey: process.env.OPENAI_API_KEY,
  })

  const prompt = `
  You are an agent that generates phrases for a social media post. Expert in Stoic philosophy.
  You will generate ten phrases that are related to Stoic philosophy.
  `

  const agent = createReactAgent({
    llm,
    prompt,
    tools: [],
  })

  const result = await agent.invoke({
    messages: [
      {
        role: 'user',
        content:
          'Generate a phrase for a social media post about Stoic philosophy',
      },
    ],
  })

  console.log('--> Phrases agent finished <--')

  return result
}
