import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Github, PlayCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SheetPilot | LI JAR',
  description:
    'Local AI spreadsheet workbench using Streamlit, Ollama, pandas, openpyxl, and sandboxed code execution.',
}

const GITHUB_URL = 'https://github.com/prof-lijar/sheetpilot'
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/9_hKYMj6v2w'

const STACK = [
  'Streamlit',
  'Ollama',
  'Python 3.11+',
  'pandas',
  'openpyxl',
  'Sandboxed exec',
]

const FEATURES = [
  'Interactive chat interface for prompting local Ollama models',
  'Excel and CSV upload, preview, listing, deletion, and download flow',
  'Prompt-to-pandas workflow for merging, filtering, sorting, pivoting, and calculations',
  'Generated code review before manual execution',
  'Markdown export for conversation history',
]

const SAFETY = [
  'AST-based static checks block risky imports and builtins',
  'Code execution is restricted to data-processing libraries and helpers',
  'Result writing is limited to the results directory through the save helper',
  'Execution timeout protects against long-running generated code',
]

export default function SheetPilotProjectPage() {
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
          Local AI workbench
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          SheetPilot
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          A Streamlit-based local AI workbench for Excel and CSV processing. Users upload
          spreadsheet files, describe the transformation they need in natural language, review
          the generated pandas code, execute it in a restricted environment, and download the
          processed result.
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
            <a href="https://youtu.be/9_hKYMj6v2w" target="_blank" rel="noopener noreferrer">
              <PlayCircle className="mr-2 h-4 w-4" />
              Demo video
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
                title="SheetPilot demo"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Workflow</h2>
          <div className="prose prose-sm prose-invert max-w-none rounded-xl border border-border bg-card/50 p-6 text-muted-foreground">
            <p>
              SheetPilot keeps spreadsheet data local while still giving users an AI-assisted
              analysis workflow. Ollama generates pandas code from the prompt, but the user
              reviews the generated code before execution. This makes the tool useful for
              repeated research or education spreadsheet tasks such as combining multiple
              experiment files and calculating grouped averages.
            </p>
            <ul>
              {FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Execution safety</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SAFETY.map((item) => (
              <div key={item} className="rounded-xl border border-border bg-card/50 p-5 shadow-sm">
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
