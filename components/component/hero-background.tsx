import Image from "next/image";

/**
 * Photo background for the first viewport of the home page.
 * Sits behind the page content but above the global animated <Background />.
 */
const HeroBackground: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-screen z-[-1] overflow-hidden">
      <Image
        alt=""
        src="/bg_0183.jpg"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Darkening layers keep the hero text readable and blend into the site background */}
      <div className="absolute inset-0 bg-gray-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/50 to-gray-950" />
    </div>
  );
};

export default HeroBackground;
