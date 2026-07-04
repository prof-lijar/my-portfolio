import { cookies } from "next/headers";
import crypto from "node:crypto";
import { getBlogAdminPassword } from "@/lib/blog-env";

const COOKIE_NAME = "blog_admin_session";
const SESSION_VALUE = "blog-admin";

function getSecret() {
  return getBlogAdminPassword();
}

function signSession(secret: string) {
  return crypto.createHmac("sha256", secret).update(SESSION_VALUE).digest("hex");
}

export function isBlogAdminConfigured() {
  return Boolean(getSecret());
}

export function verifyBlogPassword(password: string) {
  const secret = getSecret();
  if (!secret) return false;

  const expected = Buffer.from(secret);
  const received = Buffer.from(password);

  if (expected.length !== received.length) return false;
  return crypto.timingSafeEqual(expected, received);
}

export function createBlogAdminSession() {
  const secret = getSecret();
  if (!secret) return;

  cookies().set(COOKIE_NAME, signSession(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearBlogAdminSession() {
  cookies().delete(COOKIE_NAME);
}

export function isBlogAdminAuthenticated() {
  const secret = getSecret();
  if (!secret) return false;

  const value = cookies().get(COOKIE_NAME)?.value;
  return value === signSession(secret);
}
