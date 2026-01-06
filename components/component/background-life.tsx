import React from "react";

const Timeline = () => {
  const events = [
    {
      title: "Primary - High School",
      time: "2006-2016",
      description: "No.6 Basic Education High School,KengTung, Myanmar",
    },
    {
      title: "Graduated High School",
      time: "2016 March",
      description:
        "Passed The Matriculation Exam with 6 distinctions. Marks:497/600",
    },
    {
      title: "Participant",
      time: "2016 August",
      description:
        "4th China Asean Youth Cultural Exchange Festival held in Xi'an",
    },
    {
      title: "Started University",
      time: "2017",
      description:
        "Mandalay University of Technology. Major : Electrical Power Engineering",
    },
    {
      title: "Start Up",
      time: "2021",
      description:
        "Started a small food ordering and delivery start up business with three other friends. Role : Co-Founder | CEO",
    },
    {
      title: "Started College",
      time: "2023~",
      description:
        "Vision College of Jeonju. Dept : Department of International Coorperation and Technology. Major : Computer Engineering",
    },
    {
      title: "Campus Activities",
      time: "2024 Jan",
      description:
        "Volunteering in Palembang, Indonesia with more than 30 students of Vision College of Jeonju",
    },
    {
      title: "Campus Activities",
      time: "2023 May, 2024 June",
      description: "Metaverse EXPO 2023 Seoul , Smart Tech Korea 2024",
    },
    {
      title: "Start-Up club, Mentoring & Teaching",
      time: "2023~",
      description:
        "Teaching programming language mainly Html,Css, javaScript, React, Next.js, java, python to junior students, sharing knowledge information and leading projects",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-2 sm:px-6 bg-transparent rounded-2xl">
      <div className="relative pl-10 sm:pl-16">
        {/* Vertical Gradient Line */}
        <div className="absolute top-0 left-3 sm:left-6 h-full w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full"></div>
        {events.map((event, index) => (
          <div
            key={index}
            className="mb-16 flex items-start group relative animate-fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Glowing Timeline Dot */}
            <span className="absolute left-[-0.7rem] sm:left-[-1.1rem] flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 shadow-lg animate-pulse z-10">
              <span className="block w-3.5 h-3.5 bg-gray-900 rounded-full shadow-inner"></span>
            </span>
            {/* Floating Year Badge */}
            <span className="absolute -top-6 left-2 sm:left-6 bg-gray-800/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cyan-400 shadow-md border border-gray-700/50 z-10 animate-fade-in">
              {event.time}
            </span>
            {/* Glassmorphism Event Card */}
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-xl px-6 py-5 w-full border border-gray-800/50 hover:shadow-2xl transition-shadow duration-300 relative z-10">
              <h3 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-lg mb-2 flex items-center gap-2">
                {event.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

