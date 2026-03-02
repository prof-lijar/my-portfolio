'use client';

import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
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
      <PythonIcon key="python" className="w-4 h-4 sm:w-5 sm:h-5" />,
      <FlaskIcon key="flask" className="w-4 h-4 sm:w-5 sm:h-5" />,
      <TkinterIcon key="tkinter" className="w-4 h-4 sm:w-5 sm:h-5" />,
    ],
  },
  {
    id: 2,
    title: 'NAMA Real Estate',
    category: 'Web Development',
    description: 'A full-stack real estate platform featuring property listings, virtual tours, and an integrated booking system.',
    highlights: ['Property search with filters', 'Virtual tour integration', 'Secure payment processing'],
    icons: [
      <JavaIcon key="java" className="w-4 h-4 sm:w-5 sm:h-5" />,
      <JSPIcon key="jsp" className="w-4 h-4 sm:w-5 sm:h-5" />,
      <DatabaseIcon key="db" className="w-4 h-4 sm:w-5 sm:h-5" />,
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
      <ReactJsIcon key="react" className="w-4 h-4 sm:w-5 sm:h-5" />,
      <DatabaseIcon key="db" className="w-4 h-4 sm:w-5 sm:h-5" />,
    ],
  },
  {
    id: 6,
    title: 'LI JAR | Portfolio',
    category: 'Web Development',
    description: 'A responsive personal portfolio website showcasing projects and skills with modern UI/UX design.',
    highlights: ['Responsive design', 'SEO optimized', 'Fast page loads'],
    icons: [
      <NextJsIcon key="next" className="w-4 h-4 sm:w-5 sm:h-5" />,
      <ReactJsIcon key="react" className="w-4 h-4 sm:w-5 sm:h-5" />,
      <TailwindCssIcon key="tailwind" className="w-4 h-4 sm:w-5 sm:h-5" />,
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function KaistShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-gray-950 to-gray-900 py-8 sm:py-12 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-6 sm:mb-10 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={titleVariants}
        >
          <motion.h1
            className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            variants={titleVariants}
          >
            Project Showcase
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-xs sm:text-base text-gray-400"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A collection of projects demonstrating my skills in software development,
            AI/ML, and innovative solutions.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Card className="bg-gray-900/50 border-gray-800/50 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/30 h-full overflow-hidden">
                <CardHeader className="p-3 pb-2 sm:p-5 sm:pb-3">
                  <div className="mb-1">
                    <span className="inline-block rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-cyan-400">
                      {project.category}
                    </span>
                  </div>
                  <CardTitle className="text-sm sm:text-lg text-white leading-tight">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-[11px] sm:text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0 sm:p-5 sm:pt-0">
                  <div className="mb-2 sm:mb-3">
                    <h4 className="mb-1 text-[10px] sm:text-xs font-semibold text-gray-300 uppercase tracking-wider">Highlights</h4>
                    <ul className="space-y-0.5">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-sm text-gray-400 leading-snug">
                          <span className="mt-1 block h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 border-t border-gray-800/50 pt-2 sm:pt-3">
                    {project.icons.map((icon, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded bg-gray-800/50 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs text-gray-300"
                      >
                        {typeof icon === 'string' ? <span>{icon}</span> : icon}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
