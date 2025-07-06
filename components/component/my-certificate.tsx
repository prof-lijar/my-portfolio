import Image from 'next/image'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'

const MyCertificates = () => {
  const certificates = [
    {
      imgSrc: '/javascript_DSA.png',
      description: 'Legacy Javascript Algorithms and Data Structures',
      verifyHref:
        'https://www.freecodecamp.org/certification/lijar/javascript-algorithms-and-data-structures',
      viewHref: '/javascript_DSA.png',
    },
    {
      imgSrc: '/RWD.png',
      description: 'Responsive Web Design',
      verifyHref:
        'https://www.freecodecamp.org/certification/lijar/responsive-web-design',
      viewHref: '/RWD.png',
    },
    {
      imgSrc: '/excel.jpg',
      description: 'Microsoft Excel Expert (Office 2016)',
      viewHref: '/excel.jpg',
    },
    { imgSrc: '/topik.png', description: 'TOPIK', viewHref: '/topik.png' },
    { imgSrc: '/grade.jpg', description: 'Transcript', viewHref: '/grade.jpg' },
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
              className="bg-gray-900/50 border-gray-800/50 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300 rounded-lg p-4 flex flex-col items-center gap-2"
            >
              <Image
                src={cert.imgSrc}
                alt="certificate"
                width={350}
                height={300}
                className="mb-3 rounded-lg"
              />
              <div className="flex items-start justify-between w-full">
                <CardDescription>{cert.description}</CardDescription>
                <div className="flex items-center gap-2">
                  {cert.verifyHref && (
                    <Link href={cert.verifyHref}>
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

