import { useTranslations } from 'next-intl'

import { FAQ as FAQBlock } from '@/components/blocks/FAQ'

export const FAQ = () => {
  const t = useTranslations('FAQ')
  return (
    <div id="faq" className="pb-16 md:pb-32">
      <FAQBlock
        title={t('title')}
        description={t('description')}
        questions={Array(3)
          .fill(null)
          .map((_, index) => ({
            content: t(`questions.${index}.question`),
            answer: t(`questions.${index}.answer`),
          }))}
      />
    </div>
  )
}
