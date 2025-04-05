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
      <div className="grid grid-cols-1 gap-4 pt-12 pb-24 md:grid-cols-2 lg:grid-cols-3">
        {allBlog.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.data.title}
            link={blog.url}
            date={dayjs(blog.data.lastModified ?? '').format('YYYY-MM-DD')}
          />
        ))}
      </div>
    </div>
  )
}
