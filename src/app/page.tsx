import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { About } from "@/components/About";
import { Changelog } from "@/components/Changelog";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { Stack } from "@/components/Stack";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="bg-grid">
        <Hero />
        <Metrics />
        <About />
        <Changelog />
        <Projects />
        <Process />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
