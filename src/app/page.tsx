import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <VideoShowcase />
        <Features />
        <HowItWorks />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}