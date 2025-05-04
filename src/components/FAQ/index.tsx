import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export interface Question {
  content: ReactNode
  answer: ReactNode
}

export const FAQ = ({
  className,
}: {
  className?: string
  title?: ReactNode
  description?: ReactNode
  questions?: Question[]
}) => {
  const t = useTranslations('faq')

  const questions: Question[] = [
    {
      content: t('questions.0.question'),
      answer: t('questions.0.answer'),
    },
    {
      content: t('questions.1.question'),
      answer: t('questions.1.answer'),
    },
    {
      content: t('questions.2.question'),
      answer: t('questions.2.answer'),
    },
    {
      content: t('questions.3.question'),
      answer: t('questions.3.answer'),
    },
    {
      content: t('questions.4.question'),
      answer: t('questions.4.answer'),
    },
    {
      content: t('questions.5.question'),
      answer: t('questions.5.answer'),
    },
    {
      content: t('questions.6.question'),
      answer: t('questions.6.answer'),
    },
    {
      content: t('questions.7.question'),
      answer: t('questions.7.answer'),
    },
  ]

  return (
    <div id="faq" className={cn('mx-auto max-w-3xl space-y-6 py-16 md:py-32', className)}>
      <div className="space-y-2">
        <h2 className="text-center text-3xl font-bold">{t('title')}</h2>
        <p className="text-muted-foreground text-center">{t('description')}</p>
      </div>
      <Accordion collapsible className="space-y-2" type="single">
        {questions?.map((question, index) => (
          <div key={index} className="rounded-xl border px-4 py-2">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="cursor-pointer font-bold hover:no-underline">
                {question.content}
              </AccordionTrigger>
              <AccordionContent>{question.answer}</AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  )
}
