import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Timeline from "@/components/component/background-life";
import Profile from "@/components/component/profile";

export default function AboutPage() {
  return (
    <section
      className="relative min-h-[80vh] w-full flex flex-col items-center justify-center bg-transparent py-10 px-2 sm:px-4 md:px-8"
      id="about-me"
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-md mb-2">
          About Me
        </h2>
        <div className="w-full bg-gray-900/50 border-gray-800/50 rounded-2xl shadow-xl p-0 sm:p-2 md:p-6">
          <Tabs defaultValue="myinfo" className="w-full">
            <TabsList className="w-full flex justify-center gap-2 bg-gray-800/50 rounded-xl p-2 mb-4 shadow-sm">
              <TabsTrigger
                value="myinfo"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-base sm:text-lg font-semibold py-2 rounded-lg transition-all"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-base sm:text-lg font-semibold py-2 rounded-lg transition-all"
              >
                Background
              </TabsTrigger>
            </TabsList>
            <div className="w-full">
              <TabsContent
                value="myinfo"
                className="flex flex-col items-center gap-3 animate-fade-in"
              >
                <Profile />
              </TabsContent>
              <TabsContent value="password" className="animate-fade-in">
                <div className="w-full flex flex-col items-center">
                  <div className="w-full max-w-md border-b border-dashed border-gray-700/50 mb-6"></div>
                  <Timeline />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
