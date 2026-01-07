'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Award, Star, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const milestones = [
  {
    id: 1,
    title: 'NAMA | Start Up',
    year: '2021',
    date: 'January 2021',
    description: 'Started a small food ordering and delivery start up business with three other friends | Co-Founder, CEO',
    category: 'Start Up',
    image: '/hello-kaist/nama.png', 
    achievements: ['40 Restaurants', '5000+ Orders', '150,000,000 MMK Sales/Month'],
    layout: 'left',
    link: 'https://nama-ecom.netlify.app/',
  },
  {
    id: 2,
    title: 'AIM & Community Transformation',
    year: '2018',
    date: 'May 2018',
    description: 'Local Youth Empowering Organization | President',
    category: 'Community Service',
    image: '/hello-kaist/aim_and_community_transformation.jpg',
    achievements: ['30+ members', '300+ students', 'MakerTour2022 Local Partner'],
    layout: 'right',
    link: 'https://www.facebook.com/actkengtung/posts/pfbid02kJysUMQiJNLJuQYvykyM4U1R2xKTw1adQ4y4vo8uUrrVtfoLS2Qq2jkn57XAKkxel',
  },
  {
    id: 3,
    title: 'KSII The 16th International Conference on Internet (ICONI) 2024.',
    year: '2024',
    date: 'July 2024',
    description: 'VR Shopping, Fitting, and Recommendation Service Based on Interactive Interface | co-author, lead programmer',
    category: 'Achievement',
    image: '/hello-kaist/ksii_iconi_2014.jpeg',
    achievements: ['Korea Intellecual Property Office Commissioner Award', '1st Prize in Capstone Design Contest'],
    layout: 'left',
    link: '/iconi2024-vrshopping-fitting-recommending-service.pdf',
  },
  {
    id: 4,
    title: 'Gyopool AI',
    year: '2025',
    date: 'March 2025',
    description: 'AI platform for teachers and students | Project Founding Member, Software Engineer',
    category: 'Education',
    image: '/hello-kaist/gyopool_ai.png',
    achievements: ['Seed Infestment', '4000+ users'],
    layout: 'right',
    link: 'https://www.gyopool.com/',
  },

];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
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
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
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

const getContentVariants = (layout: 'left' | 'right') => ({
  hidden: { 
    opacity: 0, 
    x: layout === 'left' ? -30 : 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
});

function MilestoneItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.3,
    margin: '0px 0px -100px 0px'
  });

  return (
    <motion.div
      ref={ref}
      className="h-screen flex items-center justify-center snap-start relative overflow-hidden"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl ${
            milestone.layout === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
          } top-1/2 -translate-y-1/2`}
          animate={isInView ? { 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          className={`flex flex-col ${
            milestone.layout === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } items-center gap-8 lg:gap-16 max-w-7xl mx-auto`}
          variants={containerVariants}
        >
          {/* Image */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            variants={imageVariants}
          >
            <motion.img
              src={milestone.image}
              alt={milestone.title}
              className="w-full max-w-md object-contain"
              style={{ 
                rotate: '-3deg',
                transformStyle: 'preserve-3d'
              }}
              whileHover={{ 
                rotate: '-2deg',
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              onError={(e) => {
                console.error('Image failed to load:', milestone.image);
                // Fallback to a placeholder if image fails
                e.currentTarget.src = '/placeholder-avatar.jpg';
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6"
            variants={getContentVariants(milestone.layout as 'left' | 'right')}
          >
            <motion.div className="space-y-4" variants={containerVariants}>
              <motion.div className="flex items-center gap-3" variants={itemVariants}>
                <motion.div 
                  className="bg-cyan-500/10 p-3 rounded-full"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Award className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <motion.span 
                  className="inline-block rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  {milestone.category}
                </motion.span>
              </motion.div>

              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                variants={titleVariants}
              >
                {milestone.title}
              </motion.h2>

              <motion.div 
                className="flex items-center gap-2 text-gray-400"
                variants={itemVariants}
              >
                <Calendar className="w-5 h-5" />
                <span className="text-lg">{milestone.date}</span>
              </motion.div>
            </motion.div>

            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              {milestone.description}
            </motion.p>

            <motion.div 
              className="space-y-3 pt-4"
              variants={containerVariants}
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-200 flex items-center gap-2"
                variants={itemVariants}
              >
                {milestone.achievements ? <Star className="w-5 h-5 text-cyan-400" /> : ''}
                {milestone.achievements ? 'Key Achievements' : ''}
                {milestone.link && (
                  <Link
                    href={milestone.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
                    aria-label="View project"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Link>
                )}
              </motion.h3>
              <ul className="space-y-2">
                {milestone.achievements?.map((achievement, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 text-gray-400 group hover:text-cyan-400 transition-colors"
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <motion.span 
                      className="mt-1.5 block h-2 w-2 rounded-full bg-cyan-500 flex-shrink-0"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="text-lg">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Progress indicator */}
            <motion.div 
              className="flex items-center gap-2 pt-4"
              variants={itemVariants}
            >
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-gray-500">
                Milestone {index + 1} of {milestones.length}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Milestones() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Title Section */}
      <motion.div 
        ref={titleRef}
        className="h-screen flex items-center justify-center relative overflow-hidden snap-start"
        initial="hidden"
        animate={titleInView ? 'visible' : 'hidden'}
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>
        <div className="text-center z-10 px-4">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Milestones
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Key milestones that have shaped my academic and professional life
          </motion.p>
          <motion.div 
            className="mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              className="w-8 h-8 mx-auto text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Milestones */}
      <div className="snap-y snap-mandatory">
        {milestones.map((milestone, index) => (
          <MilestoneItem key={milestone.id} milestone={milestone} index={index} />
        ))}
      </div>
    </section>
  );
}

