'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const researchPapers = [
  {
    id: 1,
    title: 'VR Shopping, Fitting, and Recommendation Service Based on Interactive Interface',
    authors: ['Sook Youn Kwon, LI JAR'],
    venue: 'KSII The 16th International Conference on Internet (ICONI) 2024, Taiwan',
    year: 2024,
    type: 'Conference',
    link: '/iconi2024-vrshopping-fitting-recommending-service.pdf',
    doi: null,
    abstract: 'This study proposes an interactive VR shopping mall for the fashion industry with three key technologies: (1) a voice-controlled interface powered by generative AI enabling accessible shopping for people with physical limitations, (2) automatic virtual avatar generation using Open API that allows users to try on clothing virtually, and (3) an intelligent recommendation service that suggests suitable clothing based on user context and detailed item information (brand, style, color, material, weather, etc.).',
    keywords: [' VR Shopping mall', 'Generative AI', 'Gemini', 'Ghat GPT', 'Cloth Recommendation', 'Fitting'],
  },
];

export default function ResearchPapers() {
  return (
    <section className="bg-gradient-to-b from-gray-950 to-gray-900 py-8 sm:py-12 overflow-hidden">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-10 text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Research Publications
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-base text-gray-400">
            A collection of research papers I have co-authored.
          </p>
        </div>

        <div className="space-y-6">
          {researchPapers.map((paper) => (
            <Card
              key={paper.id}
              className="bg-gray-900/50 border-gray-800/50 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/30 overflow-hidden"
            >
              <CardHeader className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-full bg-cyan-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-cyan-400">
                    {paper.type}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">{paper.year}</span>
                </div>
                <CardTitle className="text-base sm:text-xl text-white leading-tight">
                  {paper.title}
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">
                  <span className="font-semibold text-gray-300">Authors:</span>{' '}
                  {paper.authors.map((author, index) => (
                    <span key={index}>
                      <span className={author.includes('LI JAR') ? 'text-cyan-400 font-medium' : ''}>
                        {author}
                      </span>
                      {index < paper.authors.length - 1 && ', '}
                    </span>
                  ))}
                </CardDescription>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">
                  <span className="font-semibold text-gray-300">Venue:</span> {paper.venue}
                </CardDescription>
                {paper.doi && (
                  <CardDescription className="text-gray-500 text-[10px] sm:text-xs mt-1">
                    DOI: {paper.doi}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  {paper.abstract}
                </p>
                {paper.keywords && paper.keywords.length > 0 && (
                  <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                    {paper.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-block rounded-md bg-gray-800/50 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs text-gray-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 border-t border-gray-800/50 pt-3 sm:pt-4">
                  {paper.link && (
                    <Link href={paper.link} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 text-xs sm:text-sm h-8 sm:h-9"
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                        View Paper
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
