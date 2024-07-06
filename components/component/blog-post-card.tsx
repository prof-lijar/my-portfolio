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

interface props {
  id: string
  title: string
  author: string
  content: string
}

const BlogPostCard: React.FC<props> = ({ id, title, content }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <JavascriptIcon className="w-6 h-6" />
            <JavaIcon className="w-6 h-6" />
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/blog/${id}`}>
            <Button variant="outline">Read&gt;&gt;</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BlogPostCard
