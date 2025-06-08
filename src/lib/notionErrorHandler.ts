import { APIResponseError } from "@notionhq/client";

export async function handleNotionError(
  error: unknown,
  retryFn: () => Promise<any>,
  retryCount: number,
  maxRetry = 3
) {
  if (error instanceof APIResponseError) {
    if (error.status === 429) {
      if (retryCount >= maxRetry) {
        throw new Error("최대 재시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.");
      }
      const retryAfter = parseInt((error.headers as Headers).get("retry-after") ?? "60", 10);
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return retryFn();
    }
    if (error.status === 400) {
      throw new Error("잘못된 요청입니다. 요청 형식을 확인해주세요.");
    }
    if (error.status === 404) {
      throw new Error("요청한 Database를 찾을 수 없습니다.");
    }
    throw new Error(`Notion API 호출 중 에러가 발생했습니다: ${error.message}`);
  }
  if (error instanceof Error) {
    throw new Error(error.message);
  }

  return null;
}
