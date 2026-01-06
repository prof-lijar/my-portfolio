import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const Footer = () => {
  return (
    <footer className="bg-transparent text-gray-400 py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/lijar.jpg" />
            <AvatarFallback>LJ</AvatarFallback>
          </Avatar>
          <span className="font-semibold">LI JAR | Portfolio</span>
        </div>
        <p>© 2026 LI JAR. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
