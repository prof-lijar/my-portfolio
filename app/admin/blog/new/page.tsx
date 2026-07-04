import { redirect } from "next/navigation";
import { isBlogAdminAuthenticated } from "@/lib/blog-auth";

export default function NewBlogPostPage() {
  if (!isBlogAdminAuthenticated()) {
    redirect("/admin/blog");
  }

  redirect("/blog/write");
}
