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
import JavascriptIcon from "@/resource/js.svg";
import JavaIcon from "@/resource/js.svg";
import { Calculator } from "lucide-react";
import Link from "next/link";
import CalculateReadingTime from "./calculate-reading-time";

interface props {
    id:string;
  title: string;
  content: string;
}

const BlogPostCard: React.FC<props> = ({ id, title, content }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            <div dangerouslySetInnerHTML={{ __html: content.substring(-5,100)+"..."}} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <CalculateReadingTime content={content}/>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/blog/${id}`}>
            <Button variant="outline">Read More&gt;&gt;</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogPostCard;
