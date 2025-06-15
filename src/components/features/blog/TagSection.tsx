import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Tag } from "@/types/blog.type";
import Link from "next/link";

{
  /* TODO: 추후 use hook을 적용하기 위해서 client component로 추출 */
}

type TagSectionProps = {
  tags: Tag[];
};

// * 왼쪽 태그 필터 사이드바
export default function TagSection({ tags }: TagSectionProps) {
  return (
    <aside className="h-fit w-56 shrink-0 max-md:hidden md:block">
      <Card className="gap-3 rounded-md border-stone-600 bg-stone-900 p-2">
        <h2 className="rounded-md bg-white p-2.5 text-sm font-semibold text-stone-900">Category</h2>
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
  );
}
