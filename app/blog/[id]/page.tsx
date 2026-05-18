import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import {
  BackToBlogLink,
  BlogContentView,
  BlogTags,
  getExcerpt,
  getReadingTime,
} from "@/lib/blog-render";
import { getPublishedBlogPost } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPublishedBlogPost(params.id);

  if (!post) {
    return {
      title: "Blog post not found | LI JAR",
    };
  }

  return {
    title: `${post.title} | LI JAR`,
    description: post.excerpt || getExcerpt(post.content_json),
    openGraph: {
      title: post.title,
      description: post.excerpt || getExcerpt(post.content_json),
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPublishedBlogPost(params.id);

  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 md:px-6">
      <BackToBlogLink />

      <article className="mt-8">
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {post.published_at
                ? new Intl.DateTimeFormat("en", {
                    dateStyle: "long",
                  }).format(new Date(post.published_at))
                : "Draft"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {getReadingTime(post.content_json)} min read
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-5 text-lg leading-8 text-gray-300">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-5">
            <BlogTags tags={post.tags} />
          </div>
        </header>

        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt=""
            width={1400}
            height={760}
            priority
            className="mb-10 h-auto w-full rounded-lg border border-gray-800 object-cover"
          />
        ) : null}

        <BlogContentView content={post.content_json} />
      </article>
    </main>
  );
}
