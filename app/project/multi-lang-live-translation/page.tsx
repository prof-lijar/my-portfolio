import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Github } from 'lucide-react'
import { marked } from 'marked'

export const metadata: Metadata = {
  title: 'Multi-Language Live Translation | LI JAR',
  description:
    'Offline 1:N multilingual live broadcasting on Raspberry Pi — SLM evaluation, STT, translation, and multibroadcasting.',
}

const GITHUB_URL = 'https://github.com/prof-lijar/multi-lang-broadcast'

const YOUTUBE_EMBED = 'https://www.youtube.com/embed/gKAVchHu2LU'

const GALLERY = [
  '/leaudio1.jpg',
  '/leaudio2.jpg',
  '/leaudio3.jpg',
  '/leaudio4.jpg',
  '/leaudio5.jpg',
  '/leaudio6.jpg',
]

const STACK = [
  'Python',
  'Raspberry Pi',
  'Whisper / STT',
  'SLM (Ollama)',
  'Multi-language UI',
  'LE Audio / broadcasting',
]

const REPORT_MD = `
# SLM models & multibroadcasting translation

## Summary
This work evaluates **small language models (SLMs)** for **low-latency, real-time multilingual translation** in a **1:N multibroadcasting** setup (e.g. Korean, Japanese, Chinese, English, Vietnamese). The stack combines **local inference** (Ollama with Qwen, Llama, Phi) and a **hybrid backend** for **STT → translation → TTS**, targeting **on-device / Raspberry Pi** deployment where possible.

## Repository
The [multi-lang-broadcast](https://github.com/prof-lijar/multi-lang-broadcast) codebase includes application and speech pipelines, live translation scripts, and documentation for running the system offline.
`.trim()

export default function MultiLangLiveTranslationPage() {
  const reportHtml = marked.parse(REPORT_MD, { gfm: true, breaks: true })

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
          Research · Edge AI
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Multi-Language Live Translation
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Offline-capable <strong>1:N multilingual live broadcasting</strong> intended for{' '}
          <strong>Raspberry Pi</strong>: speech recognition, translation with SLMs, and routing
          audio to multiple listeners. Includes comparative analysis of SLM trade-offs for
          real-time multibroadcasting workflows.
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
                title="Multi-language live translation — demo"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Hardware & setup</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {GALLERY.map((src, i) => (
              <div
                key={src}
                className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted/30"
              >
                <Image
                  src={src}
                  alt={`Multibroadcasting translation setup ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Technical overview</h2>
          <div
            className="prose prose-sm prose-invert max-w-none rounded-xl border border-border bg-card/50 p-6 text-foreground"
            dangerouslySetInnerHTML={{ __html: reportHtml }}
          />
        </div>
      </div>
    </section>
  )
}
