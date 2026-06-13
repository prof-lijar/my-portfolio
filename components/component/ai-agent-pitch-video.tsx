import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

const AI_AGENT_PITCH_EMBED =
  "https://www.youtube.com/embed/UTGoq-RxENE?autoplay=1&mute=1&playsinline=1&rel=0";
const LOKAL_AGENTS_URL = "https://lokal-agents.vercel.app/";

export default function AiAgentPitchVideo() {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="mx-auto sm:max-w-md">
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
        <div className="overflow-hidden rounded-xl border border-gray-800/70 bg-black shadow-sm">
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
      </div>
    </section>
  );
}
