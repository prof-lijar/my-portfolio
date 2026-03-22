import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'MiNaw AI | LI JAR',
  description:
    'Speech-enabled AI chatbot with Python, Gemini, LangChain, Azure Speech, and Flask.',
}

const GITHUB_URL = 'https://github.com/davidlijar/speech-to-text-azure.git'
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/knJOzX9djJk'

const STACK = ['Python', 'Gemini API', 'LangChain', 'Azure Speech', 'Flask']

export default function MinawAiPage() {
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
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">AI ChatBot</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">MiNaw AI</h1>
        <p className="max-w-3xl text-muted-foreground">
          Exploratory project combining speech recognition, LLM reasoning with Gemini, and LangChain
          — aimed toward a RAG-style assistant that can work with custom data. Work in progress.
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
                title="MiNaw AI — demo"
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
              Mainly programmed with Python. Azure for speech recognition and Gemini API for the
              LLM. Flask server for web hosting.
            </p>
            <p>
              Speech recognition and speech-to-text, then processing with the Gemini API; output can
              be fed to text-to-speech for voice replies from the model.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
