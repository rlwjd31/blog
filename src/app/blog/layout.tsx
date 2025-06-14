import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Blog 타입 정의
export type Blog = {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  date?: string;
  modifiedDate?: string;
  slug: string;
};

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

// Mock 데이터
const blogs: Blog[] = [
  {
    id: "1",
    title: "The Impact of Technology on the Workplace: How Technology is Changing",
    description:
      "An overview of blockchain technology and its potential impact on various industries.",
    coverImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    tags: ["Technology"],
    author: "Tracey Wilson",
    date: "1 June 2025",
    slug: "impact-of-technology",
  },
  {
    id: "2",
    title: "Exploring Venice: A Journey Through Canals",
    description: "Discover the beauty and history of Venice through its iconic waterways.",
    coverImage:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    tags: ["Travel"],
    author: "Tracey Wilson",
    date: "1 June 2025",
    slug: "exploring-venice",
  },
  {
    id: "3",
    title: "Urban Style: The Rise of Modern Fashion",
    description: "A look into how urban culture is shaping the latest fashion trends.",
    coverImage:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    tags: ["Business"],
    author: "Tracey Wilson",
    date: "1 June 2025",
    slug: "urban-style-fashion",
  },
  {
    id: "4",
    title: "Spring Cottage Retreats: Nature's Embrace",
    description: "Experience tranquility in the countryside with these beautiful cottages.",
    coverImage:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    tags: ["Travel"],
    author: "Tracey Wilson",
    date: "1 June 2025",
    slug: "spring-cottage-retreats",
  },
  {
    id: "5",
    title: "Finding Balance: The Art of Rock Stacking",
    description: "Discover the meditative practice and artistry behind rock stacking.",
    coverImage:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    tags: ["Sports"],
    author: "Tracey Wilson",
    date: "1 June 2025",
    slug: "art-of-rock-stacking",
  },
  {
    id: "6",
    title: "Classic Cars: Timeless Beauty on Wheels",
    description: "A celebration of classic cars and their enduring appeal.",
    coverImage:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80",
    tags: ["Economy"],
    author: "Tracey Wilson",
    date: "1 June 2025",
    slug: "classic-cars-timeless-beauty",
  },
  {
    id: "7",
    title: "Tech Gadgets: The Future is Now",
    description: "A roundup of the latest must-have tech gadgets for 2025.",
    coverImage:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    tags: ["Technology"],
    author: "Tracey Wilson",
    date: "1 June 2025",
    slug: "tech-gadgets-future",
  },
  {
    id: "8",
    title: "Kayaking Adventures: Paddle into Paradise",
    description: "Explore the world's most beautiful kayaking destinations.",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    tags: ["Travel"],
    author: "Tracey Wilson",
    date: "1 June 2025",
    slug: "kayaking-adventures",
  },
  {
    id: "9",
    title: "Gaming Evolution: The Rise of Next-Gen Consoles",
    description: "How next-gen consoles are changing the gaming landscape.",
    coverImage:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    tags: ["Technology"],
    author: "Tracey Wilson",
    date: "1 June 2025",
    slug: "gaming-evolution-nextgen",
  },
];

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
              <option value="newest">Newest</option>
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
