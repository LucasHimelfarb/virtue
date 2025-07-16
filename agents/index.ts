import type {
  Options,
  Phrases,
  Language,
} from './src/phrases_agent/index.types'
import phrasesAgent from './src/phrases_agent'
import mediaGeneratorAgent from './src/media_generator_agent'

const invokePhrasesAgent = async (): Promise<Phrases> => {
  const languages: Language[] = ['english', 'spanish']

  const options: Options = {
    languages,
    length: 10,
    topic: 'Christian philosophy',
  }

  return (await phrasesAgent(options)).structuredResponse.phrases
}

const invokeMediaGeneratorAgent = async (phrases: Phrases) => {
  const englishPhrases = phrases.filter(
    ({ language }) => language === 'english'
  )

  return await mediaGeneratorAgent({ phrases: englishPhrases })
}

const main = async () => {
  console.log('--> Starting phrases agent <--')
  const phrases = await invokePhrasesAgent()
  if (phrases.length === 0) {
    console.log('No phrases found')
    return
  }
  console.log('--> Phrases agent finished <--')
  console.log('--> Starting edition agent <--')
  await invokeMediaGeneratorAgent(phrases)
  console.log('--> Edition agent finished <--')
}

main()
