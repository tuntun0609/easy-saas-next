import dayjs from 'dayjs'
import { getLocale } from 'next-intl/server'

import BlogCard from '@/components/blog-card'
import { blogSource } from '@/lib/source'

export default async function BlogListPage() {
  const locale = await getLocale()
  const allBlog = blogSource.getPages(locale)

  return (
    <div className="container">
      <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text pt-12 text-center text-3xl font-bold text-transparent drop-shadow-sm">
        博客文章
      </h1>
      <div className="flex flex-col space-y-4 pt-12 pb-24">
        {allBlog.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.data.title}
            link={blog.url}
            date={dayjs(blog.data.date ?? blog.data.lastModified ?? new Date()).format(
              'YYYY-MM-DD'
            )}
            cover={blog.data.cover}
          />
        ))}
      </div>
    </div>
  )
}
