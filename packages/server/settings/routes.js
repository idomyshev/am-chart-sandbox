export const ROUTES = {
  ROOT: "/",
  FAVICON: "/favicon.ico",
  AUTH_WITH_ONE_TIME_TOKEN: '/auth-with-one-time-token',
  CHART: '/chart',
  CHARTS: '/charts',
  DEMO: '/demo',
  SANDBOX: {
    PIE: '/sandbox/pie',
    COLUMN: '/sandbox/column'
  }
}

export const ROUTES_WITHOUT_AUTHORIZATION = [
  ROUTES.ROOT,
  ROUTES.FAVICON,
  ROUTES.AUTH_WITH_ONE_TIME_TOKEN,
  ROUTES.CHART,
  ROUTES.CHARTS,
  ROUTES.SANDBOX.PIE,
  ROUTES.SANDBOX.COLUMN,
  ROUTES.DEMO
]