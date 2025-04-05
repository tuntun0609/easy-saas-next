import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function BlogCard({
  title,
  description,
  date,
  readTime,
  link,
  className,
  cover,
}: {
  title: string
  description?: string
  date: string
  readTime?: string
  link: string
  className?: string
  cover?: string
}) {
  return (
    <Link href={link}>
      <Card
        className={cn(
          'border-none shadow-none transition-colors duration-200 hover:bg-gray-100 dark:border dark:hover:bg-gray-800',
          className
        )}
      >
        <div className="flex justify-between gap-2 px-4">
          <div className="flex-1">
            <CardHeader className="p-0">
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && (
                <CardDescription className="line-clamp-2">{description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {date}
                </div>
                {readTime && (
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {readTime}
                  </div>
                )}
              </div>
            </CardContent>
          </div>

          {cover && (
            <div className="flex items-center justify-center overflow-hidden rounded-t-lg">
              <img width={100} src={cover} alt={title} className="max-h-24 rounded object-cover" />
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
