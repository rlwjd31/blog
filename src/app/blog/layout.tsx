import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { blogs } from "@/mocks/blog";
import { Blog } from "@/types/blog.type";
import Link from "next/link";


// BlogCard 컴포넌트
function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="group flex cursor-pointer flex-col overflow-hidden rounded-md bg-zinc-900 shadow-[0_2px_10px_3px] shadow-white/10 transition hover:scale-[1.02]">
      {blog.coverImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.2]"
            loading="lazy"
          />
          {blog.tags && blog.tags.length > 0 && (
            <span className="absolute top-3 left-3 rounded bg-emerald-500 px-2 py-1 text-xs font-semibold text-white">
              {blog.tags[0]}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-zinc-400">
          {/* TODO: data parsing */}
          <span>{blog.date}</span>
          <span>•</span>
          <span>15 mins read</span>
        </div>
        <h3 className="mb-4 line-clamp-2 text-lg font-bold text-white">{blog.title}</h3>
        <p className="mb-2 line-clamp-2 overflow-hidden text-sm text-ellipsis text-zinc-300">
          {blog.description}
        </p>
      </div>
    </article>
  );
}



export default function BlogListLayout({ children }: { children: React.ReactNode }) {
  // tag mock up data
  const tags = [
    { id: 1, name: "Technology", count: 12 },
    { id: 2, name: "Travel", count: 8 },
    { id: 3, name: "Business", count: 15 },
    { id: 4, name: "Economy", count: 6 },
    { id: 5, name: "Sports", count: 10 },
  ];

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row">
      {/* 왼쪽 태그 필터 사이드바 */}
      {/* TODO: 추후 use hook을 적용하기 위해서 client component로 추출 */}
      <aside className="h-fit w-56 shrink-0 max-md:hidden md:block">
        <Card className="gap-3 rounded-md border-stone-600 bg-stone-900 p-2">
          <h2 className="rounded-md bg-white p-2.5 text-sm font-semibold text-stone-900">
            Category
          </h2>
          <ul className="flex flex-col gap-2">
            {tags.map((tag) => (
              <li key={tag.id} className="flex items-center gap-2 px-1">
                <Checkbox />
                <Link key={tag.id} href={`?tag=${tag.name}`} className="w-full">
                  <div
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-white transition-colors hover:bg-stone-700"
                      // selectedTag === tag.name &&
                      //   "bg-muted-foreground/10 text-foreground font-medium"
                    )}
                  >
                    <span>{tag.name}</span>
                    <span>{tag.count}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
      {/* 메인 컨텐츠 영역 */}
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

        {children}
      </section>
    </section>
  );
}
