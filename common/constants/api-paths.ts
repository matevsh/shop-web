const API_URL = "http://localhost:3001";

export const apiPaths = {
  shop: {
    _exact: "/shop",
    create: "/shop/create",
  },
  product: {
    _productId: (productId: string) => `/product/${productId}`,
    _exact: "/product",
    create: "/product/create",
  },
  auth: {
    session: "/auth/session",
    logout: "/auth/logout",
    login: "/auth/login",
    register: "/auth/register",
  },
  log: {
    _exact: "/log",
  },
} as const;

export function url(path: string) {
  return API_URL + path;
}
