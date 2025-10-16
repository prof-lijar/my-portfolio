import BlogPostCard from "@/components/component/blog-post-card";
import { fetchBlogPosts } from "@/lib/data";

export default async function Blog() {
  const posts = await fetchBlogPosts();

  return (
    <section
      className="container mt-10  mx-auto px-4 md:px-6 lg:px-8"
      id="projects"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {posts.map((post) => (
          <div key={post.id}>
            <BlogPostCard
              id={post.id}
              author={post.author}
              title={post.title}
              content={post.content}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
