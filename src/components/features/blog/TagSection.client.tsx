"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Tag } from "@/types/blog.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const removeEmptyString = (tagParam: string) =>
  tagParam ? tagParam.split(",").filter((tag) => tag !== "") : [];

type TagSectionProps = {
  tags: Tag[];
};

// * 왼쪽 태그 필터 사이드바
export default function TagSection({ tags }: TagSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.get("tag")?.split(",") ?? []);
  const [selectedTags, setSelectedTags] = useState<string[]>(() =>
    removeEmptyString(searchParams.get("tag") ?? "")
  );

  const onClickTags = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((tag) => tag !== tag) : [...prev, tag]
    );

    const tagParamList = removeEmptyString(searchParams.get("tag") ?? "");
    router.replace(`?tag=${[...tagParamList, tag].join(",")}`);
  };

  return (
    <aside className="h-fit w-56 shrink-0 max-md:hidden md:block">
      <Card className="gap-3 rounded-md border-stone-600 bg-stone-900 p-2">
        <h2 className="rounded-md bg-white p-2.5 text-sm font-semibold text-stone-900">Category</h2>
        <ul className="flex flex-col gap-2">
          {tags.map((tag) => (
            <li key={tag.id} className="flex items-center gap-2 px-1">
              <Button
                key={tag.id}
                variant="ghost"
                className="flex w-full cursor-pointer items-center gap-2 bg-transparent px-0 pl-1"
                onClick={() => onClickTags(tag.name)}
              >
                <Checkbox id={tag.id} checked={selectedTags.includes(tag.name)} />
                <div
                  className={cn(
                    "flex flex-1 items-center justify-between rounded-md px-2 py-1.5 text-sm text-white transition-colors hover:bg-stone-700",
                    selectedTags.includes(tag.name) && "bg-stone-700"
                  )}
                >
                  <span>{tag.name}</span>
                  <span>{tag.count}</span>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
