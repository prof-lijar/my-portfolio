import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Anygrow3 Smart Farm | LI JAR',
  description:
    'IoT smart farming: Python, Flask, Tkinter, serial hardware control, WebSockets, and a web dashboard.',
}

const GITHUB_URL = 'https://github.com/davidlijar/anygrow3.git'

const YOUTUBE_EMBED = 'https://www.youtube.com/embed/CgxNuzuAr1Q'

const STACK = ['Python', 'Flask', 'Tkinter', 'IoT', 'Serial I/O']

export default function AnygrowSmartFarmPage() {
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
          Smart Farm · IoT
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Anygrow3 — Smart Farm
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Re-programmed the whole project, originally built in Node.js, using{' '}
          <strong>Python</strong>. The system talks to a hardware chip over{' '}
          <strong>serial</strong>, streams sensor data, runs calculations, and exposes control
          through a <strong>Tkinter</strong> desktop UI and a <strong>Flask</strong> web app with{' '}
          <strong>WebSockets</strong> for live client–server updates.
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
                title="Anygrow3 Smart Farm — demo"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Implementation details</h2>
          <div className="prose prose-sm prose-invert max-w-none rounded-xl border border-border bg-card/50 p-6 text-muted-foreground">
            <h3 className="mt-0 text-base font-semibold text-foreground">구현 세부 사항</h3>
            <p>
              Python is used to communicate with the hardware chip device (serial communication),
              sending signals to request sensor data, receiving responses, and performing
              calculations. Tkinter provides the desktop control surface for connecting, streaming
              data, and driving features. Flask hosts the front-end web page, and WebSocket is used
              to communicate between the back-end server and the web client in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
