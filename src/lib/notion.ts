import { Post, SortValueType } from "@/types/blog.type";
import {
  APIResponseError,
  Client,
  isFullPage,
  PageObjectResponse,
  PersonUserObjectResponse,
} from "@notionhq/client";

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
}): Promise<Post[]> => {
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
          // ? https://developers.notion.com/reference/post-database-query
          // ? 여러 태그를 필터링하기 위해선 아래와 같은 형식으로 넣어주어야 함
          // * [
          // *   {
          // *     "property": "Tags",
          // *     "contains": "A"
          // *   },
          // *   {
          // *     "property": "Tags",
          // *     "contains": "B"
          // *   }
          // * ]
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
    if (error instanceof APIResponseError) {
      // * Rate limit exceeded - API 호출 횟수 초과 (429)
      // * 재시도 횟수 3번으로 제한
      if (error.status === 429) {
        if (retryCount >= 3) {
          throw new Error("최대 재시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.");
        }

        const retryAfter = parseInt((error.headers as Headers).get("retry-after") ?? "60", 10);
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));

        return getPublishedPosts({ retryCount: retryCount + 1 });
      }

      // * Bad Request - 잘못된 요청 (400)
      if (error.status === 400) {
        throw new Error("잘못된 요청입니다. 요청 형식을 확인해주세요.");
      }

      // * Not Found - 리소스를 찾을 수 없음 (404)
      if (error.status === 404) {
        throw new Error("요청한 Database를 찾을 수 없습니다.");
      }

      // * 기타 에러
      throw new Error(`Notion API 호출 중 에러가 발생했습니다: ${error.message}`);
    }

    // * api response 외의 error
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    return [];
  }
};
