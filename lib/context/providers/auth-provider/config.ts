// Auth provider configuration and constants

export const AUTH_CONFIG = {
  TOKEN_KEY: "token",
  USER_KEY: "user",
  PROTECTED_PATHS: ["/dashboard", "/create-business"],
  PUBLIC_PATHS: ["/auth/sign-in", "/auth/sign-up", "/auth/verify-email"],
};
