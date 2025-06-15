import { getPublishedBlogs } from "@/lib/notion";

export default async function BlogListPage() {
  const response = await getPublishedBlogs({});

  return <div>blog 목록 페이지</div>;
}
