import { Blog } from "@/types/blog.type";

export default function BlogCard({ blog }: { blog: Blog }) {
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
