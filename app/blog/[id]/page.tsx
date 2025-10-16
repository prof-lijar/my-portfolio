import CalculateReadingTime from "@/components/component/calculate-reading-time";
import { fetchBlogById } from "@/lib/data";
import { formatContentToHtml } from "@/lib/format-content";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const blog = await fetchBlogById(id);
  const title = blog.title;
  const content = blog.content;
  const formattedContent = formatContentToHtml(content);

  return (
    <section className="w-full overflow-hidden">
      <div className="mt-5 container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-900/50 border-gray-800/50 rounded-lg w-full overflow-hidden">
        <h1 className="text-3xl font-bold mb-4 break-words">{title}</h1>
        <div className="flex justify-between items-center text-gray-400 mb-6">
          <span>By Li Jar</span>
          <span>
            <CalculateReadingTime content={content} />
          </span>
        </div>
        <div
          className="prose prose-invert max-w-none break-words overflow-wrap-anywhere w-full overflow-hidden blog-content"
          style={{
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            maxWidth: "100%",
            overflowX: "hidden",
          }}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </div>
    </section>
  );
}
