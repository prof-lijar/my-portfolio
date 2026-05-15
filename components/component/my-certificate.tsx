import Image from 'next/image'
import Link from 'next/link'

import { CardDescription } from '@/components/ui/card'

type Certificate = {
  imgSrc?: string
  pdfSrc?: string
  description: string
  issuer?: string
  verifyHref?: string
  viewHref: string
}

const MyCertificates = () => {
  const certificates: Certificate[] = [
    {
      pdfSrc: '/supervised_machine_learning.pdf',
      description: 'Supervised Machine Learning: Regression and Classification',
      issuer: 'DeepLearning.AI / Coursera',
      verifyHref: 'https://coursera.org/share/6be08a2a104d891c5dab438a45d4ec77',
      viewHref: '/supervised_machine_learning.pdf',
    },
    {
      pdfSrc: '/advanced_learning_algorithm.pdf',
      description: 'Advanced Learning Algorithms',
      issuer: 'DeepLearning.AI / Coursera',
      verifyHref: 'https://coursera.org/share/b28d8a1ea915558d4248f345bf93eff7',
      viewHref: '/advanced_learning_algorithm.pdf',
    },
    {
      imgSrc: '/javascript_DSA.png',
      description: 'Legacy Javascript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      verifyHref:
        'https://www.freecodecamp.org/certification/lijar/javascript-algorithms-and-data-structures',
      viewHref: '/javascript_DSA.png',
    },
    {
      imgSrc: '/RWD.png',
      description: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      verifyHref:
        'https://www.freecodecamp.org/certification/lijar/responsive-web-design',
      viewHref: '/RWD.png',
    },
  ]

  return (
    <section
      className="container mx-auto px-4 md:px-6 lg:px-8 mt-5"
      id="certificates"
    >
      <div className="grid gap-8">
        <div className="grid gap-4 place-items-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Certificates
          </h2>
        </div>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group flex flex-col gap-3 rounded-lg border border-gray-800/60 bg-gray-900/50 p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-500/30"
            >
              <div className="block overflow-hidden rounded-md border border-gray-800 bg-slate-950">
                {cert.pdfSrc ? (
                  <iframe
                    src={`${cert.pdfSrc}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={cert.description}
                    className="h-56 w-full bg-white md:h-64"
                  />
                ) : (
                  <Image
                    src={cert.imgSrc ?? ''}
                    alt={cert.description}
                    width={350}
                    height={300}
                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02] md:h-64"
                  />
                )}
              </div>
              <div className="flex w-full items-start justify-between gap-4">
                <div className="min-w-0">
                  <CardDescription className="text-sm text-gray-200">
                    {cert.description}
                  </CardDescription>
                  {cert.issuer && (
                    <p className="mt-1 text-xs text-gray-500">{cert.issuer}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {cert.verifyHref && (
                    <Link
                      href={cert.verifyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm underline hover:text-cyan-400 transition-colors">
                        verify
                      </span>
                    </Link>
                  )}
                  <a
                    href={cert.viewHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-sm underline hover:text-cyan-400 transition-colors">
                      view
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MyCertificates
