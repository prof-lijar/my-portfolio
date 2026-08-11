import SubNav from "./subNav";

import AboutPage from "@/app/about/page";
import MyProjects from "./my-projects";
import MainIntro from "./main-intro";
import HelloKaistBanner from "./hello-kaist-banner";
import ResearchPapers from "@/components/hello-kaist/research-papers";
import AiAgentPitchVideo from "./ai-agent-pitch-video";

export function LandingPage() {
  return (
    <>
      <main className="flex flex-col gap-16 py-12 md:py-16 lg:py-24">
        {/*
          Reserve the rest of the first viewport so the hero photo background
          (h-screen) is fully visible before the next section scrolls into view.
          The subtracted values are this wrapper's own offset from the top of
          the page (layout padding + main padding) plus the gap-16 below it.
        */}
        <section className="min-h-[calc(100vh-152px)] md:min-h-[calc(100vh-168px)] lg:min-h-[calc(100vh-200px)]">
          <MainIntro />
        </section>
        <AiAgentPitchVideo />
        <section className="z-20">
          <SubNav />
        </section>

        <section>
          <ResearchPapers />
        </section>

        <section>
          <HelloKaistBanner />
        </section>

        <section>
          <MyProjects />
        </section>

        <section className="mt-[-50px]">
          <AboutPage />
        </section>
      </main>
    </>
  );
}
