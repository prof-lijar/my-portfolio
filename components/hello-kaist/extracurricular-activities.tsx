'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';

const activities = [
  {
    id: 1,
    organization: null,
    role: null,
    duration: "2016",
    description: "4th China ASEAN-China Youth Cultural Exchange Festival held in Xi'an, China",
    category: null,
    image: "/hello-kaist/4th_asean_china_cultural_exchange_festival.jpg",
    link: null,
  },
  {
    id: 2,
    organization: null,
    role: null,
    duration: "2021",
    description: 'Maker Tour 2020, Myanmar',
    category: null,
    image: '/hello-kaist/maker_tour_2020.jpg',
    link: "https://www.facebook.com/actkengtung/posts/pfbid0jZWu9gHUQKvvEGtjooMWhSkkvGoVz2MWxAuop7zn9ALKzAcFY4JWb85CmCQNGhrJl",
  },
  {
    id: 3,
    organization: "AIM and Community Transformation",
    role: null,
    duration: "2018 - 2020",
    description: 'Local Youth Empowering Organization, Myanmar',
    category: null,
    image: '/hello-kaist/aim_and_community_transformation.jpg',
    link: "https://www.facebook.com/actkengtung/posts/pfbid02kJysUMQiJNLJuQYvykyM4U1R2xKTw1adQ4y4vo8uUrrVtfoLS2Qq2jkn57XAKkxel",
  },
  {
    id: 4,
    organization: null,
    role: null,
    duration: '2024',
    description: 'International Volunteer Program, Indonesia',
    category: null,
    image: '/hello-kaist/palembang_indonesia.jpeg',
    link: null,
  },
];

export default function ExtracurricularActivities() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-8 sm:py-12 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-10 text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Extracurricular Activities
          </h1>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: 'start', loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {activities.map((activity) => (
              <CarouselItem key={activity.id} className="pl-3 sm:pl-4 basis-[85%] sm:basis-1/2">
                <div className="bg-gray-900/50 border border-gray-800/50 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative w-full aspect-[4/3] sm:aspect-video bg-gray-800">
                    <Image
                      src={activity.image}
                      alt={activity.description}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 85vw, 50vw"
                    />
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <span className="inline-block rounded-full bg-black/60 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-gray-200 backdrop-blur-sm">
                        {activity.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5">
                    {activity.organization && (
                      <h3 className="text-sm sm:text-lg font-bold text-white mb-1 leading-tight">{activity.organization}</h3>
                    )}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{activity.description}</p>
                    {activity.link && (
                      <Link
                        href={activity.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-cyan-400 font-medium text-xs sm:text-sm"
                      >
                        View More
                      </Link>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          {activities.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? 'w-6 sm:w-8 bg-cyan-500'
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
