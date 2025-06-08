import { Post } from "@/types/blog.type";
import { APIResponseError, Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getPublishedPosts = async ({
  retryCount = 0,
}: {
  retryCount?: number;
}): Promise<Post[]> => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    return response.results as unknown as Promise<Post[]>;
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

    return [];
  }
};
