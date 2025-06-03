import Image from "next/image";
import { WriterEffect } from "./typewriter-effect";

const MainIntro = () => {
  const message1 = ["LI JAR", "Software Engineer", "AI Engineer"];

  const message2 = [
    "Hi, I'm LI JAR — I can't sleep without solving your problems. Help me sleep.",
  ];

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8" id="about">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <WriterEffect str={message1} />
          </h2>
          <div className="text-gray-500 dark:text-gray-400">
            <p>{message2}</p>
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
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-xs font-semibold text-blue-700 shadow-sm border border-blue-200 hover:from-blue-200 hover:to-pink-200 transition-colors cursor-pointer backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* <Button className="mt-4" variant="outline">
                Download Resume
              </Button> */}
        </div>
        <div className="flex items-center justify-center">
          <Image
            alt="LI JAR"
            className="rounded-full"
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
