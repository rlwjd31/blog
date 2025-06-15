import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ROUTES } from "@/lib/constants/routes";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-[var(--header-height)] w-full items-center px-4">
        <div className="grid w-full grid-cols-3 items-center">
          <div className="flex items-center justify-start">
            <Image
              src="/images/me_developer.png"
              alt="Profile Image"
              width={40}
              height={40}
              className="mr-2 rounded-full"
            />
            <Link href={ROUTES.HOME} className="text-xl font-semibold">
              <span className="font-bold">{`jjung's 블로그`}</span>
            </Link>
          </div>
          <nav className="flex items-center justify-center gap-4">
            <Link href={ROUTES.HOME} className="hover:text-primary font-medium">
              홈
            </Link>
            <Link href={ROUTES.BLOG.ROOT} className="hover:text-primary font-medium">
              블로그
            </Link>
            <Link href={ROUTES.PORTFOLIO} className="hover:text-primary font-medium">
              포트폴리오
            </Link>
          </nav>

          <div className="flex items-center justify-end">
            <Button asChild size="sm" className="text-foreground">
              <Link href={ROUTES.BLOG.WRITE}>글쓰기</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
