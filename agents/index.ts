import type {
  Options,
  Phrases,
  Language,
} from './src/phrases_agent/index.types'
import phrasesAgent from './src/phrases_agent'

const invokePhrasesAgent = async (): Promise<Phrases> => {
  const languages: Language[] = ['english', 'spanish']

  const options: Options = {
    languages,
    length: 10,
    topic: 'Christian philosophy',
  }

  return (await phrasesAgent(options)).structuredResponse.phrases
}

const main = async () => {
  console.log('--> Starting phrases agent <--')
  const phrases = await invokePhrasesAgent()
  console.log('response: ', phrases)
  console.log('--> Phrases agent finished <--')
}

main()
