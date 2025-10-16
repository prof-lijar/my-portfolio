import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

//icons
import Link from "next/link";
import CalculateReadingTime from "./calculate-reading-time";

interface props {
  id: string;
  author: string;
  title: string;
  content: string;
}

const BlogPostCard: React.FC<props> = ({ id, author, title, content }) => {
  // Clean content by removing HTML tags for preview
  const cleanContent = content.replace(/<[^>]*>/g, "").trim();
  const previewContent =
    cleanContent.length > 150
      ? cleanContent.substring(0, 150) + "..."
      : cleanContent;

  return (
    <div className="h-full">
      <Card className="bg-gray-900/50 border-gray-800/50 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-lg leading-tight line-clamp-3 break-words">
            {title}
          </CardTitle>
          <CardDescription className="flex justify-between pt-4 text-sm">
            <p>By {author}</p>
            <CalculateReadingTime content={content} />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <div className="text-sm text-gray-300 leading-relaxed line-clamp-4 break-words">
            {previewContent}
          </div>
        </CardContent>
        <CardFooter className="flex-shrink-0 pt-4">
          <Link href={`/blog/${id}`} className="w-full">
            <Button variant="outline" className="w-full">
              Read More&gt;&gt;
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogPostCard;
