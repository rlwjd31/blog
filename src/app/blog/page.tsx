import BlogCard from "@/components/features/blog/BlogCard";
import { getPublishedBlogs } from "@/lib/notion";
import { blogs } from "@/mocks/blog";

export default async function BlogListPage() {
  const response = await getPublishedBlogs({});

  return (
    <section className="min-w-0 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-2xl font-bold text-white">Latest Blog</h2>
        <div className="mb-8 flex items-center justify-end">
          <label htmlFor="sort" className="mr-2 text-sm text-zinc-300">
            Sort by:
          </label>
          <select id="sort" className="rounded bg-zinc-800 px-2 py-1 text-sm text-white">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
