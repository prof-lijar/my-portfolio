import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NAMA E-commerce | LI JAR',
  description:
    'Food ordering and delivery web app with React and Firebase.',
}

const GITHUB_URL = 'https://github.com/NAMA-4/nama-ecommerce.git'
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/xHTkvlO1Vo8'

const STACK = ['React', 'Firebase', 'Food delivery', 'E-commerce']

export default function NamaEcommercePage() {
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
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Website</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          NAMA E-commerce
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Food ordering and delivery platform: React for the client and Firebase for shops, menus,
          and product data.
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
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Demo video</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={YOUTUBE_EMBED}
                title="NAMA E-commerce — demo"
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
              Built with React for front-end and application logic. Firebase stores shop information,
              food and product catalogs, and related data.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
