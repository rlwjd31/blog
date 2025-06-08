import { getPublishedPosts } from "@/lib/notion";
import { Post } from "@/types/blog.type";
import {
  PageObjectResponse,
  PersonUserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export default async function BlogListPage() {
  const response = await getPublishedPosts({});
  console.log(response);
  return <div>blog 목록 페이지</div>;
}
