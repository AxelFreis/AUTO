export const routes = {
  home: '/',
  quote: '/quote',
  booking: '/booking',
  checkout: '/checkout',
  success: '/success',
  account: '/account',
  admin: '/admin',
} as const;

export type RouteKey = keyof typeof routes;
