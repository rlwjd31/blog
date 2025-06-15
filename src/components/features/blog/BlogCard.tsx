import { Blog } from "@/types/blog.type";

export default function BlogCard({ blog }: { blog: Blog }) {
  const { id, date, coverImage, title, tags, description } = blog;
  const parsedDate = date
    ? new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "날짜정보없음";

  return (
    <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-md bg-stone-900 shadow-[0_2px_10px_3px] shadow-white/10 transition hover:scale-[1.02]">
      {coverImage && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.2]"
            loading="lazy"
          />
          <div className="absolute top-0 left-0 flex w-full flex-row gap-2 bg-black/10 p-2">
            {tags &&
              tags.length > 0 &&
              tags.map((tag, index) => (
                <span
                  key={tag}
                  className="bg-primary rounded px-2 py-1 text-xs font-semibold text-white"
                  style={{ top: `${index * 32 + 12}px` }}
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-stone-400">
          <span className="text-stone-300">{parsedDate}</span>
        </div>
        <h3 className="mb-4 line-clamp-2 text-lg font-bold text-white">{title}</h3>
        <p className="mb-2 line-clamp-2 overflow-hidden text-sm text-ellipsis text-stone-300">
          {description}
        </p>
      </div>
    </article>
  );
}
