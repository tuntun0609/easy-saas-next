import { ReactNode } from 'react'

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
  title,
  description,
  questions,
}: {
  className?: string
  title?: ReactNode
  description?: ReactNode
  questions?: Question[]
}) => {
  return (
    <div className={cn('mx-auto max-w-3xl space-y-6 px-8 lg:px-0', className)}>
      <div className="space-y-2">
        {title && <h2 className="text-center text-3xl font-bold">{title}</h2>}
        {description && <p className="text-muted-foreground text-center">{description}</p>}
      </div>
      <Accordion collapsible className="space-y-2" type="single">
        {questions?.map((question, index) => (
          <div key={index} className="rounded-xl border px-4 py-2">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="cursor-pointer hover:no-underline">
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
