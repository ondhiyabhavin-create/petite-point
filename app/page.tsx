import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import StatsCounter from "@/components/StatsCounter";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import TableBooking from "@/components/TableBooking";
import Events from "@/components/Events";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import GSAPAnimations from "@/components/GSAPAnimations";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <GSAPAnimations />
      <Hero />
      <About />
      <StatsCounter />
      <Menu />
      <Gallery />
      <Reviews />
      <TableBooking />
      <Events />
      <Blog />
      <Contact />
    </main>
  );
}

