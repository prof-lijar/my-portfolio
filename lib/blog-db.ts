import { sql } from "@vercel/postgres";
import { randomUUID } from "node:crypto";
import type { BlogContent, BlogPost, BlogPostInput } from "@/lib/blog-types";
import { getExcerpt, normalizeBlogContent } from "@/lib/blog-render";

function hasDatabase() {
  return Boolean(
    process.env.POSTGRES_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL_NON_POOLING
  );
}

function toPost(row: any): BlogPost {
  return {
    ...row,
    content_json: normalizeBlogContent(row.content_json),
    tags: Array.isArray(row.tags) ? row.tags : [],
  };
}

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "post";
}

export async function ensureBlogTable() {
  if (!hasDatabase()) {
    throw new Error("Postgres is not configured.");
  }

  await sql`
    create table if not exists blog_posts (
      id text primary key,
      slug text not null unique,
      title text not null,
      excerpt text,
      cover_image_url text,
      content_json jsonb not null default '{"blocks":[]}'::jsonb,
      status text not null default 'draft',
      tags jsonb not null default '[]'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      published_at timestamptz
    );
  `;
}

export async function listPublishedBlogPosts() {
  if (!hasDatabase()) return [];
  await ensureBlogTable();

  const data = await sql<BlogPost>`
    select *
    from blog_posts
    where status = 'published'
    order by published_at desc nulls last, updated_at desc;
  `;

  return data.rows.map(toPost);
}

export async function getPublishedBlogPost(slug: string) {
  if (!hasDatabase()) return null;
  await ensureBlogTable();

  const data = await sql<BlogPost>`
    select *
    from blog_posts
    where slug = ${slug} and status = 'published'
    limit 1;
  `;

  return data.rows[0] ? toPost(data.rows[0]) : null;
}

export async function listAdminBlogPosts() {
  await ensureBlogTable();

  const data = await sql<BlogPost>`
    select *
    from blog_posts
    order by updated_at desc;
  `;

  return data.rows.map(toPost);
}

export async function getAdminBlogPost(id: string) {
  await ensureBlogTable();

  const data = await sql<BlogPost>`
    select *
    from blog_posts
    where id = ${id}
    limit 1;
  `;

  return data.rows[0] ? toPost(data.rows[0]) : null;
}

async function getAvailableSlug(baseSlug: string, id?: string) {
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const data = await sql<{ id: string }>`
      select id
      from blog_posts
      where slug = ${slug}
      limit 1;
    `;

    if (!data.rows[0] || data.rows[0].id === id) return slug;
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

export async function saveBlogPost(input: BlogPostInput) {
  await ensureBlogTable();

  const id = input.id || randomUUID();
  const slug = await getAvailableSlug(
    slugify(input.slug || input.title),
    input.id
  );
  const contentJson = input.contentJson as BlogContent;
  const excerpt = input.excerpt?.trim() || getExcerpt(contentJson);
  const coverImageUrl = input.coverImageUrl?.trim() || null;
  const publishedAt =
    input.status === "published" ? new Date().toISOString() : null;

  const data = await sql<BlogPost>`
    insert into blog_posts (
      id,
      slug,
      title,
      excerpt,
      cover_image_url,
      content_json,
      status,
      tags,
      published_at
    )
    values (
      ${id},
      ${slug},
      ${input.title.trim()},
      ${excerpt},
      ${coverImageUrl},
      ${JSON.stringify(contentJson)}::jsonb,
      ${input.status},
      ${JSON.stringify(input.tags)}::jsonb,
      ${publishedAt}
    )
    on conflict (id) do update set
      slug = excluded.slug,
      title = excluded.title,
      excerpt = excluded.excerpt,
      cover_image_url = excluded.cover_image_url,
      content_json = excluded.content_json,
      status = excluded.status,
      tags = excluded.tags,
      updated_at = now(),
      published_at = case
        when blog_posts.status <> 'published' and excluded.status = 'published'
          then now()
        when excluded.status = 'published'
          then blog_posts.published_at
        else null
      end
    returning *;
  `;

  return toPost(data.rows[0]);
}

export async function deleteBlogPost(id: string) {
  await ensureBlogTable();

  await sql`
    delete from blog_posts
    where id = ${id};
  `;
}
