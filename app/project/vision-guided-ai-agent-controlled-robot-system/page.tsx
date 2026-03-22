import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExternalLink, ArrowLeft, Github, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vision-Guided Robot Pick System | LI JAR',
  description:
    'Vision-guided robotic pick workflow with ROS 2, Fairino FR5, Python, Unity, and Gemini.',
}

const NOTION_URL =
  'https://sly-sunstone-e7a.notion.site/Vision-Guided-Robot-Pick-System-325faa9f1cd680419a83f31b4cd8dbd3'

const GITHUB_URL = 'https://github.com/prof-lijar/vision-guided-robot-pick-system'

const YOUTUBE_EMBED = 'https://www.youtube.com/embed/WER_G-ni5jg'

const PDF_PATH = '/vision-guided-robot-pick-system.pdf'

const STACK = ['ROS 2', 'Fairino FR5', 'Python', 'Unity', 'Gemini']

export default function VisionGuidedRobotPickPage() {
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
          Mini project
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Vision-Guided AI Agent–Controlled Robot Pick System
        </h1>
        <p className="max-w-3xl text-muted-foreground">
        This project integrates a depth camera, YOLO object detection, hand-eye calibration, and a FAIRINO collaborative robot arm — controlled by natural language commands processed by a Gemini AI agent. A Unity 3D interface visualizes detected objects in real time and allows the user to issue commands in any language.
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
            <a href={PDF_PATH} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-2 h-4 w-4" />
              Project report (PDF)
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={NOTION_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Documentation
            </a>
          </Button>
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
                title="Vision-Guided Robot Pick System — demo"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
