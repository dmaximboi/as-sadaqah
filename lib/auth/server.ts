import { createNeonAuth } from "@neondatabase/auth/next/server";

export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.NEON_AUTH_BASE_URL &&
    process.env.NEON_AUTH_COOKIE_SECRET &&
    process.env.NEON_AUTH_COOKIE_SECRET.length >= 32
  );
}

export function getAuth() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;
  if (!baseUrl) throw new Error("NEON_AUTH_BASE_URL is not configured");
  if (!cookieSecret || cookieSecret.length < 32) {
    throw new Error("NEON_AUTH_COOKIE_SECRET must contain at least 32 characters");
  }
  return createNeonAuth({
    baseUrl,
    cookies: { secret: cookieSecret, sessionDataTtl: 180 }
  });
}
