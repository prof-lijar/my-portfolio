import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NAMA Real Estate | LI JAR',
  description:
    'Full-stack real estate platform with Java, JSP, servlets, JDBC, and MySQL.',
}

const GITHUB_URL = 'https://github.com/davidlijar/nama-real-estate-jsp.git'
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/jkwaKtZgZDA'

const STACK = ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL', 'Bootstrap', 'JavaScript']

export default function NamaRealEstatePage() {
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
          NAMA Real Estate
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          A JSP-based real estate platform for buyers, renters, owners, and agents — listings,
          profiles, search, and contact flows backed by a relational database.
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
                title="NAMA Real Estate — demo"
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
            <h3 className="mt-0 text-base font-semibold text-foreground">System design & architecture</h3>
            <p>
              The site uses JSP to dynamically generate pages for property listings, user profiles,
              and search results. Servlets handle user interaction, including login, property search,
              and contact forms. JDBC connects the application to a relational database (e.g. MySQL)
              that stores property details, user information, and communication records where needed.
              End users interact through an HTML, CSS, and JavaScript front end.
            </p>
            <h3 className="text-base font-semibold text-foreground">Implementation details</h3>
            <p>
              The project was developed in Eclipse IDE. The directory layout separates JSP pages,
              servlet classes, and database schema files that describe tables for property data,
              users, and communication details. JDBC is used to connect to the database and perform
              CRUD (Create, Read, Update, Delete) operations on that data.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
