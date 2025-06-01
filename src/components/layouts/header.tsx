import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <div className="grid w-full grid-cols-3 items-center">
          <div className="flex items-center justify-start gap-2">
            <Image
              src="/images/me_developer.png"
              alt="Profile Image"
              width={40}
              height={40}
              className="mr-2 rounded-full"
            />
            <Link href="/" className="text-xl font-semibold">
              <span className="font-bold">{`jjung's 블로그`}</span>
            </Link>
          </div>
          <nav className="flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-primary font-medium">
              홈
            </Link>
            <Link href="/blog" className="hover:text-primary font-medium">
              블로그
            </Link>
            <Link href="/about" className="hover:text-primary font-medium">
              포트폴리오
            </Link>
          </nav>

          <div className="flex items-center justify-end">
            <Button asChild size="sm" className="text-foreground gap-2">
              <Link href="/blog/write">글쓰기</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
