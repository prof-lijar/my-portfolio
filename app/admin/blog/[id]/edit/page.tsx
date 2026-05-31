import { notFound, redirect } from "next/navigation";
import { deleteBlogPostAction } from "@/app/admin/blog/actions";
import { BlogPostForm } from "@/components/component/blog-post-form";
import { Button } from "@/components/ui/button";
import { isBlogAdminAuthenticated } from "@/lib/blog-auth";
import { getAdminBlogPost } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditBlogPostPage({ params }: PageProps) {
  if (!isBlogAdminAuthenticated()) {
    redirect("/admin/blog");
  }

  const post = await getAdminBlogPost(params.id);
  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-800 pb-6 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300">
            Edit post
          </p>
          <h1 className="text-3xl font-semibold text-white">{post.title}</h1>
        </div>
        <form action={deleteBlogPostAction}>
          <input name="id" type="hidden" value={post.id} />
          <Button variant="destructive">Delete</Button>
        </form>
      </div>
      <BlogPostForm post={post} />
    </main>
  );
}
