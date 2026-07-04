import { redirect } from "next/navigation";
import { BlogPostForm } from "@/components/component/blog-post-form";
import { isBlogAdminAuthenticated } from "@/lib/blog-auth";
import { isBlogDatabaseConfigured } from "@/lib/blog-env";

export const dynamic = "force-dynamic";

export default function BlogWritePage() {
  if (!isBlogAdminAuthenticated()) {
    redirect("/admin/blog");
  }

  const hasDatabase = isBlogDatabaseConfigured();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-8 border-b border-gray-800 pb-6">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300">
          Write
        </p>
        <h1 className="text-3xl font-semibold text-white">New blog post</h1>
        <p className="mt-2 text-sm text-gray-400">
          Draft fast with blocks, inline formatting, and image upload.
        </p>
      </div>
      {!hasDatabase ? (
        <div className="mb-6 rounded-md border border-amber-500/30 bg-amber-950/30 px-4 py-3 text-sm text-amber-100">
          UI mode only: blog database is not configured yet, so saving posts is disabled until DB env is set.
        </div>
      ) : null}
      <BlogPostForm
        cancelHref="/admin/blog"
        submitLabel="Save post"
        submitDisabled={!hasDatabase}
      />
    </main>
  );
}
