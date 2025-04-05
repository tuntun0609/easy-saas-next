import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'

export default function BlogCard({
  title,
  description,
  date,
  readTime,
  link,
  className,
}: {
  title: string
  description?: string
  date: string
  readTime?: string
  link: string
  className?: string
}) {
  return (
    <Link href={link}>
      <Card className={`transition-colors duration-200 hover:bg-gray-50 ${className}`}>
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">{title}</CardTitle>
          {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 text-xs text-gray-400">
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
      </Card>
    </Link>
  )
}
