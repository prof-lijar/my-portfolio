import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Orchast Agent | LI JAR',
  description:
    'Collection of Google ADK agents built with Agents CLI, Gemini, Vertex AI, and Python.',
}

const GITHUB_URL = 'https://github.com/prof-lijar/orchast_agent'

const STACK = [
  'Google ADK',
  'Agents CLI',
  'Gemini',
  'Vertex AI',
  'Python',
  'uv',
  'Docker',
]

const AGENTS = [
  {
    name: 'caveman-compressor',
    description:
      'Compresses verbose technical writing into compact, direct output while preserving meaning.',
  },
  {
    name: 'tutorial-debug-agent',
    description:
      'Guides developers through ADK setup and analyzes pasted terminal errors with tool calls.',
  },
  {
    name: 'course-generator',
    description:
      'Generates structured learning content as an agent workflow, including a long generated course artifact.',
  },
  {
    name: 'self-evolving-agent',
    description:
      'Explores an agent that can inspect, document, and improve its own behavior through a managed workflow.',
  },
]

const CAPABILITIES = [
  'Agent projects scaffolded around Google ADK deployable app structure',
  'Interactive local playground support through Agents CLI or ADK web',
  'Gemini model execution through Vertex AI',
  'Tool-call oriented agents for tutorial steps and terminal error analysis',
  'Docker and uv-based project setup for repeatable local runs',
]

export default function OrchastAgentProjectPage() {
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
          AI agents
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Orchast Agent
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          A multi-agent repository built with Google ADK and Google Agents CLI. It contains
          focused Gemini-powered agents for technical text compression, ADK tutorials,
          developer error debugging, course generation, and self-evolving agent experiments.
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
            <a href={`${GITHUB_URL}#quick-start`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Quick start
            </a>
          </Button>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Agent modules</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AGENTS.map((agent) => (
              <div
                key={agent.name}
                className="rounded-xl border border-border bg-card/50 p-5 shadow-sm"
              >
                <h3 className="font-semibold text-foreground">{agent.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {agent.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Implementation details</h2>
          <div className="prose prose-sm prose-invert max-w-none rounded-xl border border-border bg-card/50 p-6 text-muted-foreground">
            <p>
              Each agent is organized as a standalone ADK project with its own app folder,
              dependency manifest, tests, Dockerfile, and lockfile. The repository documents
              both Agents CLI and ADK web workflows, including local playground execution and
              deploy-oriented project structure.
            </p>
            <ul>
              {CAPABILITIES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
