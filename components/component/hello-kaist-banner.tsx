'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Bot, GraduationCap, FileText, Trophy } from 'lucide-react';

const stats = [
  { icon: Bot, label: 'Robotics Projects', value: '' },
  { icon: Trophy, label: 'Milestones', value: '4' },
  { icon: FileText, label: 'Publications', value: '1' },
  { icon: GraduationCap, label: 'Activities', value: '4+' },
];

const previewImages = [
  {
    src: '/hello-kaist/ksii_iconi_2014.jpeg',
    alt: 'KSII Conference',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/hello-kaist/gyopool_ai.png',
    alt: 'Gyopool AI',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/hello-kaist/nama.png',
    alt: 'NAMA Startup',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/hello-kaist/maker_tour_2020.jpg',
    alt: 'Maker Tour',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/hello-kaist/palembang_indonesia.jpeg',
    alt: 'International Volunteer',
    span: 'col-span-1 row-span-1',
  },
];

const videoThumbnails = [
  { videoId: 'T6ZfFIE54tE', label: 'LeRobot AI' },
  { videoId: 'eNlEJKJfyA4', label: 'FR5 Robot Arm' },
];

export default function HelloKaistBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="container mx-auto px-4 md:px-6 lg:px-8">
      <Link href="/hello-kaist" className="block group">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-gray-800/60 bg-gradient-to-br from-gray-900 via-gray-900/95 to-cyan-950/30"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ borderColor: 'rgba(6, 182, 212, 0.4)' }}
        >
          {/* Ambient glow */}
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700 group-hover:bg-cyan-500/20 group-hover:scale-125" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl transition-all duration-700 group-hover:bg-cyan-500/15" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Left: Content */}
            <div className="lg:col-span-2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-xs font-medium text-cyan-400 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                  </span>
                  KAIST Application Showcase
                </span>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hello, KAIST
              </motion.h2>

              <motion.p
                className="text-gray-400 mb-8 leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Explore my journey in robotics, AI research, and community building
                — from founding startups to publishing at international conferences.
              </motion.p>

              {/* Stats grid */}
              <motion.div
                className="grid grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center gap-3 rounded-lg bg-gray-800/40 px-4 py-3 border border-gray-800/50 transition-colors duration-300 group-hover:border-gray-700/60"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  >
                    <stat.icon className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                    <div>
                      <p className="text-lg font-bold text-white leading-none">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                className="flex items-center gap-2 text-cyan-400 font-medium transition-all duration-300 group-hover:gap-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                View Full Showcase
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.div>
            </div>

            {/* Right: Bento preview grid */}
            <div className="lg:col-span-3 p-4 md:p-6 lg:p-8">
              <motion.div
                className="grid grid-cols-4 grid-rows-3 gap-2 h-full min-h-[320px] lg:min-h-[400px]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {/* Large featured image */}
                <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden bg-gray-800">
                  <Image
                    src="/hello-kaist/ksii_iconi_2014.jpeg"
                    alt="KSII Conference"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-xs font-medium text-white/90">
                    KSII ICONI 2024
                  </span>
                </div>

                {/* Video thumbnail 1 */}
                <div className="col-span-2 row-span-1 relative rounded-xl overflow-hidden bg-gray-800">
                  <Image
                    src={`https://img.youtube.com/vi/${videoThumbnails[0].videoId}/mqdefault.jpg`}
                    alt={videoThumbnails[0].label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <div className="ml-0.5 w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-3 text-xs font-medium text-white/90">
                    {videoThumbnails[0].label}
                  </span>
                </div>

                {/* Gyopool AI */}
                <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden bg-gray-800">
                  <Image
                    src="/hello-kaist/gyopool_ai.png"
                    alt="Gyopool AI"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 25vw, 15vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* NAMA */}
                <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden bg-gray-800">
                  <Image
                    src="/hello-kaist/nama.png"
                    alt="NAMA Startup"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 25vw, 15vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Video thumbnail 2 */}
                <div className="col-span-2 row-span-1 relative rounded-xl overflow-hidden bg-gray-800">
                  <Image
                    src={`https://img.youtube.com/vi/${videoThumbnails[1].videoId}/mqdefault.jpg`}
                    alt={videoThumbnails[1].label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <div className="ml-0.5 w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-3 text-xs font-medium text-white/90">
                    {videoThumbnails[1].label}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
