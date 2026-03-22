import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Github, FileText, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Metagrow — VR Shopping Mall | LI JAR',
  description:
    'VR shopping mall for clothing: Unity, C#, Ready Player Me avatars, and Meta Oculus Quest 3.',
}

const GITHUB_URL = 'https://github.com/davidlijar'

const YOUTUBE_EMBED = 'https://www.youtube.com/embed/VROCakQpbd0'

/** ICONI 2024 paper (served from /public) */
const PAPER_PDF = '/iconi2024-vrshopping-fitting-recommending-service.pdf'

/** ICONI 2024 conference documentation PDF (filename has spaces — encode for URL) */
const DOCUMENTATION_PDF = `/${encodeURIComponent(
  'The 16th International Conference on Internet (ICONI 2024)-documentation.pdf'
)}`

const STACK = ['Unity', 'C#', 'Ready Player Me', 'Meta Oculus Quest 3', 'VR / XR']

export default function VrShoppingMallPage() {
  return (
    <section className="container mx-auto max-w-5xl px-4 pb-16 pt-6 md:px-6 lg:px-8">
      <Link
        href="/portfolio"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to portfolio
      </Link>

      <div className="mb-8 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Metaverse VR · Research
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Metagrow — VR Shopping Mall
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          <strong>VR shopping mall for clothing</strong> where users
          explore and purchase items in virtual space. <strong>Ready Player Me</strong> powers a{' '}
          <strong>3D avatar creator</strong>, and <strong>Meta Oculus Quest 3</strong> is the target
          headset for the experience.
        </p>
        <div className="flex flex-wrap gap-2">
          {STACK.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="outline" size="sm" asChild>
            <a href={PAPER_PDF} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" />
              Conference paper (PDF)
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={DOCUMENTATION_PDF} target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              Documentation (PDF)
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Demo video</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={YOUTUBE_EMBED}
                title="Metagrow VR Shopping Mall — demo"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Architecture & implementation</h2>
          <div className="prose prose-sm prose-invert max-w-none rounded-xl border border-border bg-card/50 p-6 text-muted-foreground">
            <h3 className="mt-0 text-base font-semibold text-foreground">Implementation details</h3>
            <p>
              The goal is a VR retail experience focused on apparel: customers move through a
              virtual mall, browse products, and complete purchases in 3D. Ready Player Me
              integrates avatar creation so users can represent themselves in the space. The
              experience is built and tested with Meta Oculus Quest 3 as the primary VR client.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
