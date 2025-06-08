import { Card } from "@/components/ui/card";


export default function BlogListLayout({ children }: { children: React.ReactNode }) {


  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row">
      {/* 왼쪽 태그 필터 사이드바 */}
      <aside className="h-fit w-56 shrink-0 max-md:hidden md:block">
        <Card className="gap-3 rounded-md border-stone-600 bg-stone-900 p-2">
          <h2 className="rounded-md bg-white p-2.5 text-sm font-semibold text-stone-900">
            Category
          </h2>
          <ul className="flex flex-col gap-2">{/* tag filter section */}</ul>
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
