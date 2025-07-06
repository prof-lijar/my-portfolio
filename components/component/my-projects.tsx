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

const MyProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'Anygrow3',
      description: 'Smart Fram project',
      icons: [
        <PythonIcon key="python" className="w-6 h-6" />,
        <FlaskIcon key="flask" className="w-6 h-6" />,
        <TkinterIcon key="tkinter" className="w-6 h-6" />,
      ],
    },
    {
      id: 2,
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
      id: 3,
      title: 'MiNaw AI',
      description: 'AI ChatBot developed using Gemini API, LangChain and Azure speech recognition',
      icons: ['GeminiAPI', 'LangChain', 'Azure'],
    },
    {
      id: 4,
      title: 'Metagrow',
      description: 'VR Shopping Mall',
      icons: ['Unity', 'C#'],
    },
    {
      id: 5,
      title: 'NAMA E-commerce',
      description: 'Food ordering and delivery Website',
      icons: [
        <ReactJsIcon key="react" className="w-6 h-6" />,
        <DatabaseIcon key="db" className="w-6 h-6" />,
        'Firebase',
      ],
    },
    {
      id: 6,
      title: 'LI JAR | Portfolio',
      description: 'Personal Portfolio website',
      icons: [
        <NextJsIcon key="next" className="w-6 h-6" />,
        <ReactJsIcon key="react" className="w-6 h-6" />,
        <TailwindCssIcon key="tailwind" className="w-6 h-6" />,
        <DatabaseIcon key="db" className="w-6 h-6" />,
        'PostgreSQL',
      ],
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8" id="projects">
      <div className="grid gap-8">
        <div className="grid gap-4 place-items-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-900/50 border-gray-800/50 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {project.icons.map((icon, index) => (
                    <div key={index} className="flex items-center gap-1">
                      {typeof icon === 'string' ? <p>{icon}</p> : icon}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/project/${project.id}`}>
                  <Button variant="outline">View Project</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyProjects;

