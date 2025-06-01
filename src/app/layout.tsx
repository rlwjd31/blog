import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "jjung's Blog",
  description: "개발자 jjung의 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* min-h-screen으로 전체 높이 보장, grid로 3개 영역 분할 */}
        <div className="flex min-h-screen flex-col">
          {/* Header 영역 */}
          <Header />

          {/* Main 영역 */}
          <main className="flex-1">{children}</main>

          {/* Footer 영역 */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
