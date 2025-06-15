import TagSection from "@/components/features/blog/TagSection";
import { tags } from "@/mocks/blog";

export default function BlogListLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row">
      {/* 왼쪽 태그 필터 사이드바 */}
      <TagSection tags={tags.map((tag) => ({ ...tag, id: tag.id.toString() }))} />
      {/* 메인 컨텐츠 영역 */}
      {children}
    </section>
  );
}
