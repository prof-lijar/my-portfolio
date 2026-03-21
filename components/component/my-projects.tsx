import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
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
import { DatabaseIcon } from '../icons/icons';
import { ExternalLink, Server, Cloud, Code2, Users, Rocket } from 'lucide-react';

const MyProjects = () => {
  const projects = [
    {
      id: 1,
      slug: 'slm-models-analysis-multibroadcasting-translation',
      title: 'SLM Models Analysis for Multibroadcasting Translation',
      description: 'Technical evaluation of Small Language Models for real-time multilingual broadcasting.',
      icons: ['SLM', 'Multibroadcasting', 'Translation', 'Ollama', 'STT+TTS', 'Gemini'],
    },
    {
      id: 2,
      title: 'Vision-Guided Robot Pick System',
      description: 'Mini project for vision-guided robotic pick workflow.',
      icons: ['ROS2', 'Fairino FR5 Robot', 'Python', 'Unity', 'Gemini'],
      externalUrl:
        'https://sly-sunstone-e7a.notion.site/Vision-Guided-Robot-Pick-System-325faa9f1cd680419a83f31b4cd8dbd3',
      badge: 'Mini Project',
    },
    {
      id: 3,
      slug: 'anygrow3',
      title: 'Anygrow3',
      description: 'Smart Farm project',
      icons: [
        <PythonIcon key="python" className="w-6 h-6" />,
        <FlaskIcon key="flask" className="w-6 h-6" />,
        <TkinterIcon key="tkinter" className="w-6 h-6" />,
      ],
    },
    {
      id: 4,
      slug: 'nama-real-estate',
      title: 'NAMA Real Estate',
      description: 'Real Estate Website developed with Java, JSP',
      icons: [
        <JavaIcon key="java" className="w-6 h-6" />,
        <JSPIcon key="jsp" className="w-6 h-6" />,
        <DatabaseIcon key="db" className="w-6 h-6" />,
        'MySQL',
      ],
    },
    {
      id: 5,
      slug: 'minaw-ai',
      title: 'MiNaw AI',
      description: 'AI ChatBot developed using Gemini API, LangChain and Azure speech recognition',
      icons: ['GeminiAPI', 'LangChain', 'Azure'],
    },
    {
      id: 6,
      slug: 'metagrow',
      title: 'Metagrow',
      description: 'VR Shopping Mall',
      icons: ['Unity', 'C#'],
    },
    {
      id: 7,
      slug: 'nama-ecommerce',
      title: 'NAMA E-commerce',
      description: 'Food ordering and delivery Website',
      icons: [
        <ReactJsIcon key="react" className="w-6 h-6" />,
        <DatabaseIcon key="db" className="w-6 h-6" />,
        'Firebase',
      ],
    },
  ];

  const highlights = [
    { icon: <Rocket className="w-5 h-5 text-cyan-400" />, label: 'Founding Member' },
    { icon: <Server className="w-5 h-5 text-cyan-400" />, label: 'Software Engineer' },
    { icon: <Cloud className="w-5 h-5 text-cyan-400" />, label: 'Cloud Infrastructure' },
    { icon: <Code2 className="w-5 h-5 text-cyan-400" />, label: 'Project Setup & Architecture' },
    { icon: <Users className="w-5 h-5 text-cyan-400" />, label: 'AI EdTech Platform' },
  ];

  const techStack = [
    'Java/Spring Boot', 'TypeScript/Next.js', 'PostgreSQL', 'MongoDB', 'Google Cloud', 'Docker', 'CI/CD',
  ];

  const dentalHighlights = [
    { icon: <Users className="w-5 h-5 text-rose-400" />, label: 'Project Manager' },
    { icon: <Server className="w-5 h-5 text-rose-400" />, label: 'Back-End Developer' },
    { icon: <Cloud className="w-5 h-5 text-rose-400" />, label: 'Cloud & Deployment' },
    { icon: <Code2 className="w-5 h-5 text-rose-400" />, label: 'System Architecture' },
    { icon: <Rocket className="w-5 h-5 text-rose-400" />, label: 'Production Delivery' },
  ];

  const dentalTechStack = [
    'React Native',
    'Back-end API',
    'Gemini',
    'Cloud Infrastructure',
    'Deployment',
    'Monitoring',
  ];

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8" id="projects">
      <div className="grid gap-12">
        <div className="grid gap-4 place-items-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h2>
        </div>

        {/* Featured Project — Gyopool */}
        <div className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-gray-900 via-gray-900/80 to-cyan-950/30 p-[1px] shadow-lg shadow-cyan-500/10">
          <div className="rounded-2xl bg-gray-950/60 backdrop-blur-sm p-6 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-400 uppercase">
                    Featured
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-xs font-semibold tracking-wide text-green-400 uppercase">
                    Production
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    Gyopool AI
                  </h3>
                  <p className="mt-1 text-lg text-cyan-400">교풀AI — AI-powered Education Platform for Teachers</p>
                </div>

                <p className="text-gray-300 leading-relaxed max-w-2xl">
                  A full-scale AI EdTech SaaS platform that empowers teachers to design, run, and monitor AI-driven classes.
                  As a <span className="text-white font-semibold">founding member and back-end developer</span>, I built
                  the project from the ground up — setting up the cloud infrastructure, back-end architecture,
                  database design, deployment pipelines, and core API services that power the platform today.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5 rounded-lg bg-gray-800/50 px-3 py-2">
                      {item.icon}
                      <span className="text-sm text-gray-200">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-gray-800/80 border border-gray-700/50 px-2.5 py-1 text-xs font-medium text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.gyopool.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-cyan-400"
                  >
                    Visit Gyopool AI
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Project — DailyDental */}
        <div className="relative rounded-2xl border border-rose-500/30 bg-gradient-to-br from-gray-900 via-gray-900/80 to-rose-950/30 p-[1px] shadow-lg shadow-rose-500/10">
          <div className="rounded-2xl bg-gray-950/60 backdrop-blur-sm p-6 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-semibold tracking-wide text-rose-400 uppercase">
                    Featured
                  </span>
                  <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-400 uppercase">
                    Production App
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">DailyDental</h3>
                  <p className="mt-1 text-lg text-rose-400">구강 건강 교육 앱 — Landing & App Experience</p>
                </div>

                <p className="text-gray-300 leading-relaxed max-w-2xl">
                  A full education + AI-assisted experience for oral health. Built with{' '}
                  <span className="text-white font-semibold">React Native</span> for the app and{' '}
                  <span className="text-white font-semibold">Gemini</span> for AI-assisted experiences.
                  I served as the{' '}
                  <span className="text-white font-semibold">Project Manager and back-end developer</span> —
                  coordinating delivery while building the back-end services and system foundation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dentalHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 rounded-lg bg-gray-800/50 px-3 py-2"
                    >
                      {item.icon}
                      <span className="text-sm text-gray-200">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Focus
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dentalTechStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-gray-800/80 border border-gray-700/50 px-2.5 py-1 text-xs font-medium text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://dental-app-landing.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-rose-400"
                  >
                    Visit DailyDental
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-400">Other Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-gray-900/50 border-gray-800/50 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
                <CardHeader>
                  {project.badge && (
                    <span className="mb-2 inline-flex w-fit items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">
                      {project.badge}
                    </span>
                  )}
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.icons.map((icon, index) => (
                      <div key={index} className="flex items-center gap-1">
                        {typeof icon === 'string' ? <p>{icon}</p> : icon}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  {project.externalUrl ? (
                    <a href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">View Mini Project</Button>
                    </a>
                  ) : (
                    <Link href={`/project/${project.slug}`}>
                      <Button variant="outline">View Project</Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProjects;

