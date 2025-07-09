import { z } from 'zod'

import { tool } from '@langchain/core/tools'
import { ChatOpenAI } from '@langchain/openai'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

import 'dotenv/config'

const getWeather = tool(
  async (input: string) => {
    return `It's always sunny in ${input}!`
  },
  {
    name: 'getWeather',
    description: 'Get the current weather in a given location',
    schema: z.string().describe('The city to get the weather for'),
  }
)

const main = async () => {
  console.log('Hello, world!')

  const llm = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const agent = createReactAgent({
    llm,
    tools: [getWeather],
    prompt: 'You are a helpful assistant',
  })

  const result = await agent.invoke({
    messages: [{ role: 'user', content: 'what is the weather in sf' }],
  })

  console.log(result)
}

main()
