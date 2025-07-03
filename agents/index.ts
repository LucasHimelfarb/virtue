import type { Language, Options } from './src/phrases_agent/index.types'

import phrasesAgent from './src/phrases_agent'

const invokePhrasesAgent = async () => {
  const languages: Language[] = ['english', 'spanish']

  const phrasesAgentOptions: Options = {
    languages,
    length: 10,
    format: 'json',
    topic: 'Stoic philosophy',
  }

  const phrasesAgentResponse = await phrasesAgent(phrasesAgentOptions)
  const phrases = phrasesAgentResponse.messages[1].content

  console.log(phrases)
}

const main = async () => {
  await invokePhrasesAgent()
}

main()
