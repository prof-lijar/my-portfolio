'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          events?: { onStateChange?: (event: { data: number }) => void };
        }
      ) => unknown;
      PlayerState?: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const projects = [
  {
    id: 'lerobot',
    videoId: 'T6ZfFIE54tE',
    title: 'LeRobot : AI for Robot',
    description:
      'Training and deploying AI policies on real robotic hardware using Hugging Face LeRobot framework.',
  },
  {
    id: 'fr5-robot-arm',
    videoId: 'eNlEJKJfyA4',
    title: 'Control FR5 Robot Arm with Keyboard Keys Using Python SDK',
    description:
      'Real-time keyboard teleoperation of the FR5 robot arm through a custom Python SDK interface.',
  },
  {
    id: 'ros2-unity-panel',
    videoId: 'zf93q4JRH3w',
    title: 'ROS 2 Unity Robot Simulation Command Panel',
    description:
      'A command panel built in Unity for controlling and monitoring robots via ROS 2 communication.',
  },
  {
    id: 'unity-slam-nav',
    videoId: 'tyILF4LPVdo',
    title: 'Unity SLAM Nav Example (Unity ROS 2)',
    description:
      'SLAM-based autonomous navigation visualized and controlled through a Unity–ROS 2 integration.',
  },
];

const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_ENDED = 0;

export default function CurrentProjects() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const playersCreated = useRef(false);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api || isVideoPlaying) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [api, isVideoPlaying]);

  useEffect(() => {
    if (typeof window === 'undefined' || playersCreated.current) return;

    const createPlayers = () => {
      projects.forEach((project) => {
        const el = document.getElementById(`yt-player-${project.id}`);
        if (!el || (el as unknown as { __ytPlayer?: unknown }).__ytPlayer) return;
        try {
          new window.YT!.Player(`yt-player-${project.id}`, {
            videoId: project.videoId,
            events: {
              onStateChange(event: { data: number }) {
                if (event.data === YT_PLAYING) setIsVideoPlaying(true);
                else if (event.data === YT_PAUSED || event.data === YT_ENDED)
                  setIsVideoPlaying(false);
              },
            },
          });
        } catch {
          // ignore if player already exists or DOM not ready
        }
      });
      playersCreated.current = true;
    };

    if (window.YT?.Player) {
      createPlayers();
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayers();
    };

    const existing = document.getElementById('youtube-iframe-api');
    if (!existing) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const first = document.getElementsByTagName('script')[0];
      first?.parentNode?.insertBefore(tag, first);
    }
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-12 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Current Projects
          </h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Robotics and AI projects I&apos;m currently working on
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="pl-2 md:pl-4 md:basis-1/2"
                >
                  <div className="group rounded-xl border border-gray-800/50 bg-gray-900/50 overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10">
                    <div className="relative w-full h-[280px] min-h-[280px] bg-gray-800 flex items-center justify-center overflow-hidden">
                      <div
                        id={`yt-player-${project.id}`}
                        className="absolute inset-0 h-full w-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? 'w-8 bg-cyan-500'
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
