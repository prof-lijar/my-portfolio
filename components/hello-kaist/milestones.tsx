'use client';

import { useRef } from 'react';
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
    achievements: ['40 Restaurants', '5000+ Orders', '150,000,00 MMK Sales/Month'],
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
    achievements: ['Seed Investment', '4000+ users'],
    layout: 'right',
    link: 'https://www.gyopool.com/',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function MilestoneItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref}
      className="py-8 sm:py-16 lg:py-24 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/5 rounded-full blur-3xl ${
            milestone.layout === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
          } top-1/2 -translate-y-1/2`}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`flex flex-col ${
            milestone.layout === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } items-center gap-6 sm:gap-8 lg:gap-16 max-w-6xl mx-auto`}
        >
          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            variants={imageVariants}
          >
            <img
              src={milestone.image}
              alt={milestone.title}
              className="w-full max-w-[280px] sm:max-w-sm lg:max-w-md object-contain rounded-lg"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-3 sm:space-y-5"
            variants={containerVariants}
          >
            <motion.div className="flex items-center gap-2 sm:gap-3 flex-wrap" variants={itemVariants}>
              <div className="bg-cyan-500/10 p-2 sm:p-3 rounded-full">
                <Award className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
              </div>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-cyan-400 border border-cyan-500/30">
                {milestone.category}
              </span>
            </motion.div>

            <motion.h2
              className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
              variants={titleVariants}
            >
              {milestone.title}
            </motion.h2>

            <motion.div className="flex items-center gap-2 text-gray-400" variants={itemVariants}>
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base">{milestone.date}</span>
            </motion.div>

            <motion.p
              className="text-sm sm:text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              {milestone.description}
            </motion.p>

            <motion.div className="space-y-2 pt-2" variants={containerVariants}>
              <motion.div className="flex items-center gap-2" variants={itemVariants}>
                {milestone.achievements && <Star className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />}
                {milestone.achievements && (
                  <span className="text-sm sm:text-base font-semibold text-gray-200">Key Achievements</span>
                )}
                {milestone.link && (
                  <Link
                    href={milestone.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300"
                    aria-label="View project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
              <ul className="space-y-1.5">
                {milestone.achievements?.map((achievement, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-2 text-gray-400"
                    variants={itemVariants}
                  >
                    <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                    <span className="text-xs sm:text-base">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="flex items-center gap-2 pt-2" variants={itemVariants}>
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm text-gray-500">
                Milestone {index + 1} of {milestones.length}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Milestones() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      {/* Title */}
      <motion.div
        ref={titleRef}
        className="py-16 sm:py-24 lg:py-32 flex items-center justify-center relative"
        initial="hidden"
        animate={titleInView ? 'visible' : 'hidden'}
      >
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
        <div className="text-center z-10 px-4">
          <motion.h1
            className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Milestones
          </motion.h1>
          <motion.p
            className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Key milestones that have shaped my academic and professional life
          </motion.p>
          <motion.div
            className="mt-8 sm:mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Milestones */}
      <div>
        {milestones.map((milestone, index) => (
          <MilestoneItem key={milestone.id} milestone={milestone} index={index} />
        ))}
      </div>
    </section>
  );
}
