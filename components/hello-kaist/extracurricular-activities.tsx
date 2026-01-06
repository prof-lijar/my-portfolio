'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';

const activities = [
  {
    id: 1,
    organization: null,
    role: null,
    duration: "2016",
    description: "4th China ASEAN-China Youth Cultural Exchange Festival held in Xi'an, China",
    category: null,
    image: "/hello-kaist/4th_asean_china_cultural_exchange_festival.jpg",
  },
  {
    id: 2,
    organization: null,
    role: null,
    duration: "2021",
    description: 'Maker Tour 2020, Myanmar',
    category: null,
    image: '/hello-kaist/maker_tour_2020.jpg',
  },
  {
    id: 3,
    organization: "AIM and Community Transformation",
    role: null,
    duration: "2018 - 2020",
    description: 'Local Youth Empowering Organization, Myanmar',
    category: null,
    image: '/hello-kaist/aim_and_community_transformation.jpg',
  },
  {
    id: 4,
    organization: null,
    role: null,
    duration: '2024',
    description: 'International Volunteer Program, Indonesia',
    category: null,
    image: '/hello-kaist/palembang_indonesia.jpeg',
  },
];

export default function ExtracurricularActivities() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play: slide from right to left every 4 seconds
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        // Loop back to the beginning
        api.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Extracurricular Activities
          </h1>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {activities.map((activity, index) => (
                <CarouselItem key={activity.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <div className="bg-gray-900/50 border-gray-800/50 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/30">
                    {/* Image Gallery */}
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-800">
                      <Image
                        src={activity.image}
                        alt={activity.organization || ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {activity.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="inline-block rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm">
                          {activity.duration}
                        </span>
                      </div>
                    </div>

                    {/* Description Below */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{activity.organization}</h3>
                      <p className="text-cyan-400/80 font-medium text-sm mb-3">{activity.role}</p>
                      <p className="text-gray-400 text-sm mb-4">{activity.description}</p>
                      
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {activities.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? 'w-8 bg-cyan-500'
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

