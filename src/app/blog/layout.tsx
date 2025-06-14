import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function BlogListLayout({ children }: { children: React.ReactNode }) {
  // tag mock up data
  const tags = [
    { id: 1, name: "Technology", count: 12 },
    { id: 2, name: "Travel", count: 8 },
    { id: 3, name: "Business", count: 15 },
    { id: 4, name: "Economy", count: 6 },
    { id: 5, name: "Sports", count: 10 }
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
      <section className="min-w-0 flex-1">{children}</section>
      {/* 오른쪽 사이드바 */}
      <aside className="hidden w-full shrink-0 rounded-xl bg-zinc-900 p-6 max-lg:w-60 max-md:hidden md:block md:w-72">
        <div className="flex flex-col items-center">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="mb-4 h-20 w-20 rounded-full object-cover"
          />
          <h3 className="mb-2 text-lg font-semibold text-white">Your Name</h3>
          <p className="text-center text-sm text-zinc-300">
            간단한 자기소개를 여기에 입력하세요.
            <br />
            예시: 프론트엔드 개발자, 기술 블로그 운영 중.
          </p>
        </div>
      </aside>
    </section>
  );
}
