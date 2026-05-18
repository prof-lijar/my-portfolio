"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearBlogAdminSession,
  createBlogAdminSession,
  isBlogAdminAuthenticated,
  verifyBlogPassword,
} from "@/lib/blog-auth";
import { deleteBlogPost, saveBlogPost } from "@/lib/blog-db";
import { normalizeBlogContent } from "@/lib/blog-render";
import type { BlogPostStatus } from "@/lib/blog-types";

function requireAdmin() {
  if (!isBlogAdminAuthenticated()) {
    throw new Error("Unauthorized");
  }
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function loginBlogAdminAction(formData: FormData) {
  const password = getString(formData, "password");

  if (!verifyBlogPassword(password)) {
    redirect("/admin/blog?error=invalid");
  }

  createBlogAdminSession();
  redirect("/admin/blog");
}

export async function logoutBlogAdminAction() {
  clearBlogAdminSession();
  redirect("/admin/blog");
}

export async function saveBlogPostAction(formData: FormData) {
  requireAdmin();

  const title = getString(formData, "title").trim();
  if (!title) {
    throw new Error("Title is required.");
  }

  const contentJsonRaw = getString(formData, "contentJson");
  const contentJson = normalizeBlogContent(JSON.parse(contentJsonRaw));
  const status = getString(formData, "status") as BlogPostStatus;

  const post = await saveBlogPost({
    id: getString(formData, "id") || undefined,
    slug: getString(formData, "slug"),
    title,
    excerpt: getString(formData, "excerpt"),
    coverImageUrl: getString(formData, "coverImageUrl"),
    contentJson,
    contentText: getString(formData, "contentText"),
    status: status === "published" ? "published" : "draft",
    tags: getTags(getString(formData, "tags")),
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPostAction(formData: FormData) {
  requireAdmin();

  const id = getString(formData, "id");
  if (id) {
    await deleteBlogPost(id);
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

