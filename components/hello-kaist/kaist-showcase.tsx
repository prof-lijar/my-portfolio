'use client';

import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function KaistShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2,
    margin: '0px 0px -100px 0px'
  });

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="mb-12 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={titleVariants}
        >
          <motion.h1 
            className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
            variants={titleVariants}
          >
            Project Showcase
          </motion.h1>
          <motion.p 
            className="mx-auto max-w-2xl text-lg text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A collection of projects demonstrating my skills in software development,
            AI/ML, and innovative solutions. Each project represents my commitment to
            solving real-world problems through technology.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="bg-gray-900/50 border-gray-800/50 shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/30 h-full">
                <CardHeader>
                  <motion.div 
                    className="mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.3 + (project.id * 0.1) }}
                  >
                    <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                      {project.category}
                    </span>
                  </motion.div>
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
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-2 text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ 
                            delay: 0.4 + (project.id * 0.1) + (index * 0.1),
                            duration: 0.4
                          }}
                        >
                          <motion.span 
                            className="mt-1 block h-1.5 w-1.5 rounded-full bg-cyan-500"
                            whileHover={{ scale: 1.5 }}
                          />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <motion.div 
                    className="flex flex-wrap items-center gap-2 border-t border-gray-800/50 pt-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 + (project.id * 0.1) }}
                  >
                    {project.icons.map((icon, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-1 rounded-md bg-gray-800/50 px-2 py-1 text-xs text-gray-300"
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: 'rgba(6, 182, 212, 0.2)',
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {typeof icon === 'string' ? <span>{icon}</span> : icon}
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

