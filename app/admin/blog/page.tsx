import Link from "next/link";
import { FileText, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  isBlogAdminAuthenticated,
  isBlogAdminConfigured,
} from "@/lib/blog-auth";
import { listAdminBlogPosts } from "@/lib/blog-db";
import {
  loginBlogAdminAction,
  logoutBlogAdminAction,
} from "@/app/admin/blog/actions";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: {
    error?: string;
  };
};

function LoginView({ error }: { error?: string }) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-16">
      <form
        action={loginBlogAdminAction}
        className="w-full space-y-4 rounded-md border border-gray-800 bg-gray-950/80 p-6"
      >
        <div>
          <h1 className="text-2xl font-semibold text-white">Blog admin</h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to write and manage personal blog posts.
          </p>
        </div>

        {!isBlogAdminConfigured() ? (
          <p className="rounded-md border border-amber-500/30 bg-amber-950/30 p-3 text-sm text-amber-100">
            Set `BLOG_ADMIN_PASSWORD` before using the editor.
          </p>
        ) : null}

        {error === "invalid" ? (
          <p className="rounded-md border border-red-500/30 bg-red-950/30 p-3 text-sm text-red-100">
            Invalid password.
          </p>
        ) : null}

        <Input
          name="password"
          type="password"
          required
          placeholder="Admin password"
          disabled={!isBlogAdminConfigured()}
        />
        <Button className="w-full" disabled={!isBlogAdminConfigured()}>
          Sign in
        </Button>
      </form>
    </main>
  );
}

export default async function AdminBlogPage({ searchParams }: PageProps) {
  if (!isBlogAdminAuthenticated()) {
    return <LoginView error={searchParams?.error} />;
  }

  const posts = await listAdminBlogPosts();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-800 pb-6 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300">
            Admin
          </p>
          <h1 className="text-3xl font-semibold text-white">Blog posts</h1>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/blog/new">
              <Plus className="mr-2 h-4 w-4" />
              New post
            </Link>
          </Button>
          <form action={logoutBlogAdminAction}>
            <Button variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </div>

      {posts.length ? (
        <div className="divide-y divide-gray-800 border-y border-gray-800">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between gap-4 py-5 md:flex-row md:items-center"
            >
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-gray-500">
                  <span>{post.status}</span>
                  <span>/</span>
                  <span>{post.slug}</span>
                </div>
                <h2 className="truncate text-xl font-semibold text-white">
                  {post.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                  {post.excerpt || "No excerpt"}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {post.status === "published" ? (
                  <Button asChild variant="outline">
                    <Link href={`/blog/${post.slug}`}>View</Link>
                  </Button>
                ) : null}
                <Button asChild>
                  <Link href={`/admin/blog/${post.id}/edit`}>Edit</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-gray-800 bg-gray-950/70 p-8 text-center">
          <FileText className="mx-auto mb-3 h-8 w-8 text-gray-500" />
          <p className="text-gray-300">No posts yet.</p>
          <Button asChild className="mt-4">
            <Link href="/admin/blog/new">Write the first post</Link>
          </Button>
        </div>
      )}
    </main>
  );
}

