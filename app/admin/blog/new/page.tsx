import { redirect } from "next/navigation";
import { BlogPostForm } from "@/components/component/blog-post-form";
import { isBlogAdminAuthenticated } from "@/lib/blog-auth";

export const dynamic = "force-dynamic";

export default function NewBlogPostPage() {
  if (!isBlogAdminAuthenticated()) {
    redirect("/admin/blog");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-8 border-b border-gray-800 pb-6">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300">
          New post
        </p>
        <h1 className="text-3xl font-semibold text-white">Write blog post</h1>
      </div>
      <BlogPostForm />
    </main>
  );
}
