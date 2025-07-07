import NextJsIcon from "@/resource/nextjs.svg";
import ReactJsIcon from "@/resource/reactjs.svg";
import TypeScriptIcon from "@/resource/ts.svg";
import CIcon from "@/resource/c.svg";
import { DatabaseIcon } from "../icons/icons";
import GitIcon from "@/resource/git.svg";
import GitHubIcon from "@/resource/github.svg";
import TailWindCss from "@/resource/tailwind.svg";
import BootStrapIcon from "@/resource/bootstrap.svg";
import FlaskIcon from "@/resource/flask.svg";
import JSPIcon from "@/resource/jsp.svg";
import LanguageIcon from "@/resource/lang.svg";
import JavascriptIcon from "@/resource/js.svg";
import VercelIcon from "@/resource/vercel.svg";
import NetlifyIcon from "@/resource/netlify.svg";

import JavaIcon from "@/resource/java.svg";
import PythonIcon from "@/resource/python.svg";
import TkinterIcon from "@/resource/tkinter.svg";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const MySkills = () => {
  const skills = {
    frontend: [
      {
        name: "Javascript",
        icon: <JavascriptIcon className="w-8 h-8 text-yellow-400" />,
      },
      {
        name: "TypeScript",
        icon: <TypeScriptIcon className="w-8 h-8 text-blue-500" />,
      },
      {
        name: "ReactJs",
        icon: <ReactJsIcon className="w-8 h-8 text-blue-400" />,
      },
      {
        name: "NextJs",
        icon: <NextJsIcon className="w-8 h-8 text-gray-800 dark:text-white" />,
      },
      {
        name: "Tailwind",
        icon: <TailWindCss className="w-8 h-8 text-teal-400" />,
      },
      {
        name: "Bootstrap",
        icon: <BootStrapIcon className="w-8 h-8 text-purple-500" />,
      },
    ],
    backend: [
      {
        name: "Python",
        icon: <PythonIcon className="w-8 h-8 text-blue-600" />,
      },
      {
        name: "Flask",
        icon: <FlaskIcon className="w-8 h-8 text-gray-800 dark:text-white" />,
      },
      { name: "Java", icon: <JavaIcon className="w-8 h-8 text-red-600" /> },
      { name: "JSP", icon: <JSPIcon className="w-8 h-8 text-red-700" /> },
      {
        name: "Databases",
        icon: <DatabaseIcon className="w-8 h-8 text-blue-900" />,
      },
    ],
    tools: [
      { name: "Git", icon: <GitIcon className="w-8 h-8 text-orange-600" /> },
      {
        name: "GitHub",
        icon: (
          <Link
            href="https://github.com/davidlijar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="w-8 h-8 text-gray-800 dark:text-white fill-current" />
          </Link>
        ),
      },
      {
        name: "Vercel",
        icon: (
          <VercelIcon className="w-8 h-8 text-gray-800 dark:text-white fill-current" />
        ),
      },
      {
        name: "Netlify",
        icon: <NetlifyIcon className="w-8 h-8 text-teal-500 fill-current" />,
      },
    ],
  };

  return (
    <section
      className="container mx-auto px-2 py-10 md:px-4 lg:px-6"
      id="skills"
    >
      <div className="grid gap-10">
        <div className="grid gap-2 place-items-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Skills
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400">
            I have developed some skills:
          </p>
        </div>

        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="grid gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-center md:text-left capitalize">
              {category}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {skillList.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-gray-900/50 border-gray-800/50 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300 rounded-lg p-4 flex flex-col items-center gap-2"
                >
                  {skill.icon}
                  <span className="text-xs font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MySkills;
