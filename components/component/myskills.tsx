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
import TkinterIcon from "@/resource/tkinter.svg"
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const MySkills = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:px-6 lg:px-8" id="skills">
      <div className="grid gap-12">
        <div className="grid gap-4 place-items-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Skills
          </h2>
          <p>I have developed some skills : </p>
        </div>

        {/* Frontend Skills */}
        <div className="grid gap-4">
          <h3 className="text-2xl font-semibold tracking-tight text-center md:text-left">Frontend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {/* Javascript */}
            <Card className="flex flex-col items-center justify-center gap-2 p-4 text-center transition-transform duration-300 ease-in-out hover:scale-105">
              <JavascriptIcon className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
              <CardTitle className="text-base font-medium">Javascript</CardTitle>
            </Card>
            {/* TypeScript */}
            <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <TypeScriptIcon className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
              <CardTitle className="text-base font-medium leading-tight">TypeScript</CardTitle>
            </Card>
            {/* ReactJs */}
            <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <ReactJsIcon className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
              <CardTitle className="text-base font-medium leading-tight">ReactJs</CardTitle>
            </Card>
            {/* NextJs */}
            <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <NextJsIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 dark:text-white" />
              <CardTitle className="text-base font-medium leading-tight">NextJs</CardTitle>
            </Card>
             {/* Tailwind CSS */}
            <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <TailWindCss className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />
              <CardTitle className="text-base font-medium leading-tight">Tailwind CSS</CardTitle>
            </Card>
            {/* Bootstrap */}
            <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <BootStrapIcon className="w-10 h-10 text-purple-600" />
              <CardTitle className="text-base font-medium">Bootstrap</CardTitle>
            </Card>
          </div>
        </div>

        {/* Backend & Database Skills */}
        <div className="grid gap-4">
          <h3 className="text-2xl font-semibold tracking-tight text-center md:text-left">Backend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {/* Python */}
             <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <PythonIcon className="w-8 h-8 md:w-10 md:h-10 text-blue-700" />
              <CardTitle className="text-base font-medium">Python</CardTitle>
            </Card>
             {/* Flask */}
             <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <FlaskIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 dark:text-white" />
              <CardTitle className="text-base font-medium leading-tight">Flask</CardTitle>
            </Card>
            {/* Java */}
            <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <JavaIcon className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
              <CardTitle className="text-base font-medium">Java</CardTitle>
            </Card>
             {/* JSP */}
            <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <JSPIcon className="w-8 h-8 md:w-10 md:h-10 text-red-700" />
              <CardTitle className="text-base font-medium">JSP</CardTitle>
            </Card>
            {/* Databases */}
             <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out text-blue-900">
              <DatabaseIcon className="w-10 h-10 text-blue-900" />
              <CardTitle className="text-base font-medium">Databases</CardTitle>
            </Card>
          </div>
        </div>

        {/* Tools */}
        <div className="grid gap-4">
          <h3 className="text-2xl font-semibold tracking-tight text-center md:text-left">Tools</h3>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
           {/* Git */}
            <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <GitIcon className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
              <CardTitle className="text-base font-medium">Git</CardTitle>
            </Card>
            {/* GitHub */}
             <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <Link href={"https://github.com/davidlijar"} target="_blank" rel="noopener noreferrer">
                 <GitHubIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 dark:text-white fill-current" />
              </Link>
              <CardTitle className="text-base font-medium">GitHub</CardTitle>
            </Card>
            {/* Vercel */}
             <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <VercelIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 dark:text-white fill-current" />
              <CardTitle className="text-base font-medium">Vercel</CardTitle>
            </Card>
            {/* Netlify */}
             <Card className="flex flex-col items-center justify-center gap-2 p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
              <NetlifyIcon className="w-8 h-8 md:w-10 md:h-10 text-teal-500 fill-current" />
              <CardTitle className="text-base font-medium">Netlify</CardTitle>
            </Card>
             {/* C, Tkinter and Languages could be added here or in a separate "Languages" section */}
            {/* Other Languages and Skills (can be categorized or listed separately) */}
             {/* Add cards for C, Tkinter, Vercel, Netlify, and languages as needed */}
             {/* For simplicity, I'm not adding all of them as cards here, but you can follow the pattern */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySkills;
