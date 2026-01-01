import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import JavascriptIcon from '@/resource/js.svg';
import JavaIcon from '@/resource/java.svg';
import PythonIcon from '@/resource/python.svg';
import FlaskIcon from '@/resource/flask.svg';
import TkinterIcon from '@/resource/tkinter.svg';
import JSPIcon from '@/resource/jsp.svg';
import ReactJsIcon from '@/resource/reactjs.svg';
import NextJsIcon from '@/resource/nextjs.svg';
import TailwindCssIcon from '@/resource/tailwind.svg';
import { DatabaseIcon } from '@/components/icons/icons';

const projects = [
  {
    id: 1,
    title: 'Anygrow3',
    category: 'Smart Farm',
    description: 'An IoT-based smart farming solution that monitors and automates plant growth using sensors and machine learning algorithms.',
    highlights: ['Real-time environmental monitoring', 'Automated irrigation control', 'Growth prediction using AI'],
    icons: [
      <PythonIcon key="python" className="w-5 h-5" />,
      <FlaskIcon key="flask" className="w-5 h-5" />,
      <TkinterIcon key="tkinter" className="w-5 h-5" />,
    ],
  },
  {
    id: 2,
    title: 'NAMA Real Estate',
    category: 'Web Development',
    description: 'A full-stack real estate platform featuring property listings, virtual tours, and an integrated booking system.',
    highlights: ['Property search with filters', 'Virtual tour integration', 'Secure payment processing'],
    icons: [
      <JavaIcon key="java" className="w-5 h-5" />,
      <JSPIcon key="jsp" className="w-5 h-5" />,
      <DatabaseIcon key="db" className="w-5 h-5" />,
    ],
  },
  {
    id: 3,
    title: 'MiNaw AI',
    category: 'AI/ML',
    description: 'An intelligent chatbot leveraging cutting-edge NLP technology for natural human-AI conversations.',
    highlights: ['Natural language understanding', 'Multi-language support', 'Voice interaction capability'],
    icons: ['GeminiAPI', 'LangChain', 'Azure'],
  },
  {
    id: 4,
    title: 'Metagrow',
    category: 'VR/AR',
    description: 'An immersive virtual reality shopping experience with interactive product visualization.',
    highlights: ['3D product rendering', 'Virtual try-on feature', 'Cross-platform compatibility'],
    icons: ['Unity', 'C#'],
  },
  {
    id: 5,
    title: 'NAMA E-commerce',
    category: 'Web Development',
    description: 'A modern food delivery platform with real-time order tracking and seamless user experience.',
    highlights: ['Real-time order tracking', 'Restaurant integration', 'Secure checkout'],
    icons: [
      <ReactJsIcon key="react" className="w-5 h-5" />,
      <DatabaseIcon key="db" className="w-5 h-5" />,
    ],
  },
  {
    id: 6,
    title: 'LI JAR | Portfolio',
    category: 'Web Development',
    description: 'A responsive personal portfolio website showcasing projects and skills with modern UI/UX design.',
    highlights: ['Responsive design', 'SEO optimized', 'Fast page loads'],
    icons: [
      <NextJsIcon key="next" className="w-5 h-5" />,
      <ReactJsIcon key="react" className="w-5 h-5" />,
      <TailwindCssIcon key="tailwind" className="w-5 h-5" />,
    ],
  },
];

export default function KaistShowcase() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Project Showcase
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            A collection of projects demonstrating my skills in software development,
            AI/ML, and innovative solutions. Each project represents my commitment to
            solving real-world problems through technology.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-gray-900/50 border-gray-800/50 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/30"
            >
              <CardHeader>
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                    {project.category}
                  </span>
                </div>
                <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-300">Key Highlights:</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-cyan-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t border-gray-800/50 pt-4">
                  {project.icons.map((icon, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-md bg-gray-800/50 px-2 py-1 text-xs text-gray-300"
                    >
                      {typeof icon === 'string' ? <span>{icon}</span> : icon}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/project/1">
            <Button variant="outline" size="lg" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
              View Project Details
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
