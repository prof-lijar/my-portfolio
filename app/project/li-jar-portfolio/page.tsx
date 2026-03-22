import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LI JAR | Portfolio (this site) | LI JAR',
  description:
    'Personal portfolio built with Next.js, Tailwind CSS, PostgreSQL, and Vercel.',
}

const GITHUB_URL = 'https://github.com/davidlijar/my-portfolio.git'
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/JobVrZYMTJA'

const STACK = ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Vercel']

export default function LiJarPortfolioProjectPage() {
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
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Portfolio</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          LI JAR | Portfolio
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          This site — projects, Hello KAIST, and more — built with the modern React stack and
          deployed on Vercel.
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
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Source code
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">View home</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Walkthrough video</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={YOUTUBE_EMBED}
                title="LI JAR Portfolio — demo"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Architecture</h2>
          <div className="prose prose-sm prose-invert max-w-none rounded-xl border border-border bg-card/50 p-6 text-muted-foreground">
            <h3 className="mt-0 text-base font-semibold text-foreground">Implementation details</h3>
            <p>
              Developed mainly using Next.js, Tailwind CSS, and PostgreSQL. Hosted on Vercel for
              fast global delivery and simple deployments.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
