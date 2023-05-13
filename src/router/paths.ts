export const routerPaths = {
  home: "/",
  lots: "/lots",
  // eslint-disable-next-line prettier/prettier, no-useless-escape
  lotDetails: "/lots/(?<id>[\w-]+)",
  help: "/help",
  some: "/some",
  notFound: ".*",
} as const;
