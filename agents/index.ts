import type { Language, Options } from './src/phrases_agent/index.types'

import phrasesAgent from './src/phrases_agent'

const invokePhrasesAgent = async () => {
  const languages: Language[] = ['english', 'spanish']

  const options: Options = {
    languages,
    length: 10,
    topic: 'Christian philosophy',
  }

  const response = await phrasesAgent(options)
  const phrases = response.messages[1].content

  console.log(phrases)
}

const main = async () => {
  console.log('--> Starting phrases agent <--')
  await invokePhrasesAgent()
  console.log('--> Phrases agent finished <--')
}

main()
