import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

//icons
import JavascriptIcon from '@/resource/js.svg'
import JavaIcon from '@/resource/js.svg'
import Link from 'next/link'
import CalculateReadingTime from './calculate-reading-time'

interface props {
  id: string
  author: string
  title: string
  content: string
}

const BlogPostCard: React.FC<props> = ({ id, author, title, content }) => {
  return (
    <div>
      <Card className="bg-gray-900/50 border-gray-800/50 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="flex justify-between pt-4">
            <p>By {author}</p>
            <CalculateReadingTime content={content} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 ">
            <div
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: content.substring(-5, 200) + '...',
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/blog/${id}`}>
            <Button variant="outline">Read More&gt;&gt;</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BlogPostCard
