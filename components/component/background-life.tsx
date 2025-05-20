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
        "Started a small food ordering and delivery start up business with three other friends. Role : Web Developer | Manager",
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
      title: "Teaching & Sharing",
      time: "2023~",
      description:
        "Teaching programming language mainly C and Html,Css to junior students, sharing knowledge information and leading in doing projects with them",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-6">
      <div className="relative border-l-2 border-gray-300 pl-4 sm:pl-8">
        {events.map((event, index) => (
          <div key={index} className="mb-8">
            <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full -left-1.5 sm:-left-2.5"></div>
            <div className="ml-6 sm:ml-8">
              <h3 className="font-bold mb-1 text-base sm:text-lg">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                {event.time}
              </p>
              <p className="text-sm sm:text-base">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
