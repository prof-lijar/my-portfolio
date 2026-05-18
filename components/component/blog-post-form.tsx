import Link from "next/link";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogEditor } from "@/components/component/blog-editor";
import { saveBlogPostAction } from "@/app/admin/blog/actions";
import type { BlogPost } from "@/lib/blog-types";

export function BlogPostForm({ post }: { post?: BlogPost | null }) {
  return (
    <form action={saveBlogPostAction} className="space-y-6">
      {post?.id ? <input name="id" type="hidden" value={post.id} /> : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={post?.title || ""}
              placeholder="What are you writing about?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={post?.excerpt || ""}
              placeholder="Short summary for the blog list and metadata"
            />
          </div>

          <BlogEditor initialContent={post?.content_json} />
        </div>

        <aside className="space-y-4 rounded-md border border-gray-800 bg-gray-950/70 p-4 lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              defaultValue={post?.status || "draft"}
              className="h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={post?.slug || ""}
              placeholder="auto-generated-from-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={post?.tags.join(", ") || ""}
              placeholder="AI, research, portfolio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImageUrl">Cover image URL</Label>
            <Input
              id="coverImageUrl"
              name="coverImageUrl"
              defaultValue={post?.cover_image_url || ""}
              placeholder="/uploads/blog/image.webp"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button asChild type="button" variant="outline">
              <Link href="/admin/blog">Cancel</Link>
            </Button>
          </div>
        </aside>
      </div>
    </form>
  );
}

