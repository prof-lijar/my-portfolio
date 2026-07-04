const DATABASE_ENV_KEYS = [
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL_NON_POOLING",
] as const;

export function isBlogDatabaseConfigured() {
  return DATABASE_ENV_KEYS.some((key) => Boolean(process.env[key]));
}

export function requireBlogDatabaseEnv() {
  if (isBlogDatabaseConfigured()) return;

  throw new Error(
    `Blog database is not configured. Set one of: ${DATABASE_ENV_KEYS.join(", ")}.`
  );
}

export function getBlogAdminPassword() {
  return process.env.BLOG_ADMIN_PASSWORD || "";
}
