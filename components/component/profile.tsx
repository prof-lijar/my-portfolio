import Link from "next/link";
import Image from "next/image";
import {
  FaUser,
  FaFlag,
  FaGraduationCap,
  FaEnvelope,
  FaGlobe,
  FaLanguage,
  FaYoutube,
  FaGithub,
  FaBriefcase,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const info = [
  {
    label: "Spoken Language",
    value: (
      <span className="font-bold">
        English<span className="mx-1">|</span>Korean
        <span className="mx-1">|</span>Burmese<span className="mx-1">|</span>
        Akha
      </span>
    ),
    icon: <FaLanguage className="text-purple-500" />,
  },
  {
    label: "University/College",
    value: (
      <div className="flex flex-col font-bold text-base mt-1 mb-1">
        <span>Mandalay University of Technology</span>
        <span className="text-sm text-gray-500">2017 ~ 2020</span>
        <span className="mt-2">Vision College of Jeonju</span>
        <span className="text-sm text-gray-500">2023 ~ 2025</span>
      </div>
    ),
    icon: <FaGraduationCap className="text-pink-500" />,
  },
  {
    label: "Email",
    value: <span className="font-bold">davidbeljar@gmail.com</span>,
    icon: <FaEnvelope className="text-red-500" />,
  },
  {
    label: "Instagram",
    value: (
      <Link
        href={"https://www.instagram.com/lijar_00/"}
        target="_blank"
        className="hover:text-pink-500 transition-colors"
      >
        <span className="font-bold underline underline-offset-1">
          @lijar_00
        </span>
      </Link>
    ),
    icon: <FaInstagram className="text-pink-400" />,
  },
  {
    label: "LinkedIn",
    value: (
      <Link
        href={"https://www.linkedin.com/in/lijar/"}
        target="_blank"
        className="hover:text-blue-700 transition-colors"
      >
        <span className="font-bold underline underline-offset-1">
          linkedin.com/in/lijar
        </span>
      </Link>
    ),
    icon: <FaLinkedin className="text-blue-600" />,
  },
  {
    label: "GitHub",
    value: (
      <Link
        href={"https://github.com/prof-lijar"}
        target="_blank"
        className="hover:text-black transition-colors"
      >
        <span className="font-bold underline underline-offset-1">
          github.com/prof-lijar
        </span>
      </Link>
    ),
    icon: <FaGithub className="text-gray-800" />,
  },
];

const Profile = () => {
  return (
    <section className="w-full max-w-lg mx-auto bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-3xl shadow-2xl border border-gray-100 overflow-x-auto sm:overflow-visible">
      {/* Hero / Cover */}
      <div className="flex flex-col items-center justify-center py-8 px-2 sm:py-10 sm:px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="relative">
          <Image
            alt="LI JAR"
            className="rounded-full border-4 border-white shadow-xl"
            height={100}
            src="/lijar_profile.jpg"
            style={{ aspectRatio: "1/1", objectFit: "cover" }}
            width={100}
          />
        </div>
        <h1 className="mt-3 text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg break-words">
          LI JAR
        </h1>
        <p className="text-white/90 text-sm sm:text-base font-medium mt-1 text-center break-words">
          Software Engineer at{" "}
          <Link
            href="https://huemoneedu.com/"
            target="_blank"
            className="underline underline-offset-2 hover:text-blue-200 transition-colors break-all"
          >
            Huemone Lab
          </Link>
        </p>
      </div>
      {/* Info Section */}
      <div className="flex flex-col gap-0 divide-y divide-gray-200 bg-white/90 px-2 sm:px-6 py-6 sm:py-8 w-full">
        {info.map(({ label, value, icon }) => (
          <div
            key={label}
            className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 w-full min-w-0"
          >
            <div className="mt-1 text-lg sm:text-xl shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1 truncate">
                {label}
              </div>
              <div className="text-gray-900 text-sm sm:text-lg font-medium leading-snug break-words w-full min-w-0">
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
