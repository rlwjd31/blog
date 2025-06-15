// Blog 타입 정의
export type Blog = {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  date?: string;
  modifiedDate?: string;
  slug: string;
};

export type SortValueType = "oldest" | "latest";

export type Tag = {
  id: string;
  name: string;
  count: number;
};
