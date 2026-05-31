import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { BlogTags, getExcerpt, getReadingTime } from "@/lib/blog-render";
import { listPublishedBlogPosts } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export default async function Blog() {
  const posts = await listPublishedBlogPosts();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6">
      <section className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300">
          Blog
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Notes on building, learning, and research.
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-300">
          Personal essays, project notes, and technical writing from Li Jar.
        </p>
      </section>

      {posts.length ? (
        <div className="divide-y divide-gray-800 border-y border-gray-800">
          {posts.map((post) => (
            <article
              key={post.id}
              className="grid gap-5 py-7 md:grid-cols-[220px_1fr]"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block overflow-hidden rounded-md border border-gray-800 bg-gray-950"
              >
                {post.cover_image_url ? (
                  <Image
                    src={post.cover_image_url}
                    alt=""
                    width={440}
                    height={280}
                    className="h-44 w-full object-cover transition-transform duration-300 hover:scale-105 md:h-full"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-gray-900 text-sm text-gray-500 md:h-full">
                    LI JAR
                  </div>
                )}
              </Link>

              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    {post.published_at
                      ? new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                        }).format(new Date(post.published_at))
                      : "Draft"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {getReadingTime(post.content_json)} min read
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold leading-tight text-white transition-colors hover:text-cyan-200">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {post.excerpt || getExcerpt(post.content_json)}
                </p>
                <div className="mt-4">
                  <BlogTags tags={post.tags} />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-gray-800 bg-gray-950/60 p-8 text-gray-300">
          No published posts yet.
        </div>
      )}
    </main>
  );
}
