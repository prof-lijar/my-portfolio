import Image from "next/image";
import { WriterEffect } from "./typewriter-effect";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const MainIntro = () => {
  const message1 = ["LI JAR", "Software Engineer", "AI Engineer"];

  const message2 = [
    "Hi, I'm LI JAR — I can't sleep without solving your problems.Will you help me?",
  ];

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8" id="about">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <WriterEffect str={message1} />
          </h2>
          <div className="text-gray-400">
            <p>{message2}</p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/prof-lijar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="w-7 h-7 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/lijar_00/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="w-7 h-7 text-pink-500 hover:text-pink-700 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/lijar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-7 h-7 text-blue-600 hover:text-blue-800 transition-colors" />
              </a>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "#artificialintelligence",
                "#syntheticbiology",
                "#web",
                "#AI",
                "#edtech",
                "#innovation",
                "#collaboration",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gray-800/50 text-xs font-semibold text-cyan-400 shadow-sm border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            alt="LI JAR"
            className="rounded-full border-4 border-gray-800/50 shadow-lg"
            height={400}
            src="/lijar.jpg"
            style={{
              aspectRatio: "400/400",
              objectFit: "cover",
            }}
            width={400}
          />
        </div>
      </div>
    </section>
  );
};

export default MainIntro;

