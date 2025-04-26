import { stopwords as mandarinStopwords } from '@orama/stopwords/mandarin'
import { createTokenizer } from '@orama/tokenizers/mandarin'
import { createFromSource } from 'fumadocs-core/search/server'

import { docsSource } from '@/lib/source'

export const { GET } = createFromSource(docsSource, undefined, {
  localeMap: {
    zh: {
      components: {
        tokenizer: createTokenizer({
          language: 'mandarin',
          stopWords: mandarinStopwords,
        }),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },

    'custom-locale': 'english',
  },
})
