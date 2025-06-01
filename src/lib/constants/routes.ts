export const ROUTES = {
  HOME: "/",
  BLOG: {
    ROOT: "/blog",
    WRITE: "/blog/write",
    DETAIL: (blogId: string) => `/blog/${blogId}`,
  },
  PORTFOLIO: "/portfolio",
  ABOUT: "/about",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type BlogRouteKey = keyof typeof ROUTES.BLOG;

export const getBlogDetailPath = (blogId: string) => ROUTES.BLOG.DETAIL(blogId);
