export const paths = {
  home: "/",
  planetDetails: (id: string) => `/planets/${id}`,
  notFound: "/404",
} as const;
