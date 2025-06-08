import { getPublishedPosts } from "@/lib/notion";

export default async function BlogListPage() {
  const response = await getPublishedPosts({});
  
  return <div>blog 목록 페이지</div>;
}
