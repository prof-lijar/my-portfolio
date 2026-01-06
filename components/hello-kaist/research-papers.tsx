'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const researchPapers = [
  {
    id: 1,
    title: 'VR Shopping, Fitting, and Recommendation Service Based on Interactive Interface',
    authors: ['LI JAR', 'Sook Youn Kwon'],
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
    <section className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Research Publications
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            A collection of research papers I have co-authored.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            {researchPapers.map((paper) => (
              <Card
                key={paper.id}
                className="bg-gray-900/50 border-gray-800/50 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/30"
              >
              <CardHeader>
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                    {paper.type}
                  </span>
                  <span className="text-sm text-gray-500">{paper.year}</span>
                </div>
                <CardTitle className="text-xl text-white mb-3 leading-tight">
                  {paper.title}
                </CardTitle>
                <CardDescription className="text-gray-400 mb-2">
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
                <CardDescription className="text-gray-400">
                  <span className="font-semibold text-gray-300">Venue:</span> {paper.venue}
                </CardDescription>
                {paper.doi && (
                  <CardDescription className="text-gray-500 text-xs mt-1">
                    DOI: {paper.doi}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 leading-relaxed">{paper.abstract}</p>
                </div>
                {paper.keywords && paper.keywords.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {paper.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-block rounded-md bg-gray-800/50 px-2 py-1 text-xs text-gray-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 border-t border-gray-800/50 pt-4">
                  {paper.link && (
                    <Link href={paper.link} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
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
      </div>
    </section>
  );
}

