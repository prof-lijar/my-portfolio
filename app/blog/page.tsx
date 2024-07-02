import { PythonIcon } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";

import { XIcon, ExpandIcon } from "lucide-react";

//icons
import JavascriptIcon from "@/resource/js.svg";
import JavaIcon from "@/resource/js.svg";
import { WriterEffect } from "@/components/component/typewriter-effect";
import BlogPostCard from "@/components/component/blog-post-card";
import { fetchBlogPosts } from "@/lib/data";
import CalculateReadingTime from "@/components/component/calculate-reading-time";

export default async function Blog() {
  const messages = [
    "Hello, World!",
    "Welcome to Next.js",
    "Typewriter Effect in Action",
  ];

  const posts = await fetchBlogPosts();



  return (
    <section
      className="container mt-10  mx-auto px-4 md:px-6 lg:px-8"
      id="projects"
    >
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id}>
            <BlogPostCard
              id={post.id}
              title={post.title}
              content={post.content}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
