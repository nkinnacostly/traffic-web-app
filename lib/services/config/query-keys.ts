export enum QueryKeys {
  // Auth endpoints
  LOGIN = "/api/v1/auth/login",
  REGISTER = "/api/v1/auth/register",
  VERIFY_EMAIL = "/api/v1/auth/verify-email",
  
  // Business endpoints
  BUSINESS = "/api/v1/business",
  BUSINESSES = "/api/v1/businesses",
  
  // Product endpoints
  PRODUCTS = "/api/v1/products",
  PRODUCT = "/api/v1/products",
  
  // Dashboard endpoints
  DASHBOARD_STATS = "/api/v1/dashboard/stats",
  
  // Profile endpoints
  PROFILE = "/api/v1/users/profile",
  // Add new keys here — use the actual API path as the key value
}
