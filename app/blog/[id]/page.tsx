import CalculateReadingTime from "@/components/component/calculate-reading-time";
import { fetchBlogById } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const blog = await fetchBlogById(id);
  const title = blog.title;
  const content = blog.content;

  return (
    <section>
      <div className=" mt-5 container max-w-4xl mx-auto p-6 bg-gray-900/50 border-gray-800/50 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="flex justify-between items-center text-gray-400 mb-6">
          <span>By Li Jar</span>
          <span><CalculateReadingTime content={content}/></span>
        </div>
        <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
}
