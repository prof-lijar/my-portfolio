import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

const AI_AGENT_PITCH_EMBED =
  "https://www.youtube.com/embed/UTGoq-RxENE?autoplay=1&mute=1&playsinline=1&rel=0";
const LOKAL_AGENTS_DECK_EMBED = "https://gamma.app/embed/hllpkel3ghvif0z";
const LOKAL_AGENTS_DECK_URL =
  "https://gamma.app/docs/Lokal-Agents-hllpkel3ghvif0z";
const LOKAL_AGENTS_URL = "https://lokal-agents.vercel.app/";

export default function AiAgentPitchVideo() {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Listen to My Crazy Pitch Idea
            </h2>
          </div>
          <Button size="sm" asChild>
            <a
              href={LOKAL_AGENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Learn More
            </a>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(260px,360px)_1fr] lg:items-stretch">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-gray-800/70 bg-black shadow-sm lg:mx-0">
            <div className="relative aspect-[9/16] w-full">
              <iframe
                src={AI_AGENT_PITCH_EMBED}
                title="AI agents pitch video"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          <div className="hidden overflow-hidden rounded-xl border border-gray-800/70 bg-black shadow-sm md:flex md:flex-col">
            <div className="relative min-h-0 flex-1">
              <iframe
                src={LOKAL_AGENTS_DECK_EMBED}
                title="Lokal Agents"
                className="absolute inset-0 h-full w-full border-0"
                allow="fullscreen"
                allowFullScreen
              />
            </div>
            <div className="border-t border-gray-800/70 bg-gray-950/80 p-3">
              <Button size="sm" className="w-full" asChild>
                <a
                  href={LOKAL_AGENTS_DECK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Slides
                </a>
              </Button>
            </div>
          </div>

          <Button className="w-full md:hidden" asChild>
            <a
              href={LOKAL_AGENTS_DECK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Full Slides
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
