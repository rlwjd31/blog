import { Post, SortValueType } from "@/types/blog.type";
import {
  APIResponseError,
  Client,
  isFullPage,
  PageObjectResponse,
  PersonUserObjectResponse,
} from "@notionhq/client";
import { handleNotionError } from "./notionErrorHandler";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const parseNotionPageToPostType = (page: PageObjectResponse): Post | null => {
  if (!page.properties) return null;

  const { properties } = page;

  return {
    id: page.id,
    title: properties.Title?.type === "title" ? (properties.Title.title[0]?.plain_text ?? "") : "",
    description:
      properties.Description?.type === "rich_text"
        ? (properties.Description.rich_text[0]?.plain_text ?? "")
        : "",
    coverImage: page.cover
      ? page.cover.type === "external"
        ? page.cover.external.url
        : page.cover.file.url
      : "",
    tags:
      properties.Tags?.type === "multi_select"
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    author:
      properties.Author?.type === "people"
        ? ((properties.Author.people[0] as PersonUserObjectResponse)?.name ?? "")
        : "",
    date: properties.Date?.type === "date" ? (properties.Date.date?.start ?? "") : "",
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug?.type === "rich_text"
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
};

export const getPublishedPosts = async ({
  retryCount = 0,
  filterTags = [],
  sortValue = "latest",
}: {
  retryCount?: number;
  filterTags?: string[];
  sortValue?: SortValueType;
}): Promise<Post[] | null> => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Published",
            },
          },
          /**
           * @see https://developers.notion.com/reference/post-database-query
           * @description 여러 태그를 필터링하기 위한 형식 예시:
           * [
           *   {
           *     "property": "Tags",
           *     "contains": "A"
           *   },
           *   {
           *     "property": "Tags", 
           *     "contains": "B"
           *   }
           * ]
           */
          ...filterTags.map((tag) => ({ property: "Tags", multi_select: { contains: tag } })),
        ],
      },
      sorts: [
        {
          property: "Date",
          direction: sortValue === "latest" ? "descending" : "ascending",
        },
      ],
    });

    const posts = response.results
      .filter(isFullPage)
      .map(parseNotionPageToPostType)
      .filter((page) => page !== null);

    return posts;
  } catch (error) {
    return handleNotionError(
      error,
      () => getPublishedPosts({ filterTags, sortValue, retryCount: retryCount + 1 }),
      retryCount
    ) ?? [];
  }
};
