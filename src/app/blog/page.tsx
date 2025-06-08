import { getPublishedPosts } from "@/lib/notion";
import {
  PageObjectResponse,
  PersonUserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const parseNotionPageToPostType = (page: PageObjectResponse): Post | null => {
  if (!page.properties) return null;

  const { properties } = page;

  return {
    id: page.id,
    title: properties.Title.type === "title" ? properties.Title.title[0].plain_text : "",
    description:
      properties.Description.type === "rich_text"
        ? properties.Description.rich_text[0].plain_text
        : "",
    coverImage: page.cover
      ? page.cover.type === "external"
        ? page.cover.external.url
        : page.cover.file.url
      : "",
    tags:
      properties.Tags.type === "multi_select"
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    author:
      properties.Author.type === "people"
        ? ((properties.Author.people[0] as PersonUserObjectResponse)?.name ?? "")
        : "",
    date: properties.Date.type === "date" ? (properties.Date.date?.start ?? "") : "",
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug.type === "rich_text"
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
};

export default async function BlogListPage() {
  const response = await getPublishedPosts(["CSS", "Next.js"]);
  console.log(response);
  return <div>blog 목록 페이지</div>;
}
