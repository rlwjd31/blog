export default function BlogListLayout({ children }: { children: React.ReactNode }) {
  // 예시 태그 데이터 (실제 데이터로 교체 가능)
  const tags = ["Technology", "Travel", "Business", "Economy", "Sports"];

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-black">
      <section className="flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row">
        {/* 왼쪽 태그 필터 사이드바 */}
        <aside className="hidden h-fit w-56 shrink-0 rounded-xl bg-zinc-900 p-6 max-md:hidden md:block">
          <h2 className="mb-4 text-lg font-semibold text-white">Filter by Tag</h2>
          <ul className="flex flex-col gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <button
                  className="w-full rounded bg-zinc-800 px-3 py-2 text-left text-zinc-200 transition hover:bg-zinc-700"
                  // onClick={() => ...} // 실제 필터링 로직 연결
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        {/* 메인 컨텐츠 영역 */}
        <div className="min-w-0 flex-1">{children}</div>
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
    </main>
  );
}
