import dayjs from 'dayjs'
import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { blogSource } from '@/lib/source'
import { convertReadingTime } from '@/lib/utils'

import TagSelect from './tag-select'

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const locale = await getLocale()
  const t = await getTranslations('blog')
  const allBlog = blogSource.getPages(locale)
  const { tag } = await searchParams

  const tags = allBlog
    .map(blog => blog.data.tags)
    .filter(Boolean)
    .flat()

  const filteredBlog = allBlog.filter(blog => {
    if (tag || tag === 'all') {
      return blog.data.tags?.includes(tag)
    }
    return allBlog
  })

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-6 py-16 xl:px-0">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
          <TagSelect tags={tags} />
        </div>

        <div className="mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlog.map(blog => (
            <Link href={blog.url} key={blog.url}>
              <Card className="gap-0 p-0 shadow-none">
                <CardHeader className="p-2">
                  <div className="rounded-md border">
                    {blog.data.cover ? (
                      <Image
                        priority={false}
                        src={blog.data.cover}
                        alt={blog.data.title ?? ''}
                        className="aspect-video w-full rounded-lg object-cover"
                        width={512}
                        height={512}
                      />
                    ) : (
                      <div className="bg-muted flex aspect-video w-full items-center justify-center rounded-lg p-4">
                        <h4 className="text-muted-foreground line-clamp-3 text-center text-xl font-medium">
                          {blog.data.title}
                        </h4>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  {/* <Badge>Technology</Badge> */}

                  <h3 className="mb-2 text-[1.35rem] font-semibold tracking-tight">
                    {blog.data.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {dayjs(blog.data.date ?? blog.data.lastModified ?? new Date()).format(
                        'YYYY-MM-DD'
                      )}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {convertReadingTime({
                        time: blog.data._exports.minutesRead as number,
                        secondUnit: t('secondUnit'),
                        minuteUnit: t('minuteUnit'),
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
