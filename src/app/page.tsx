import { Bento } from "@/components/sections/Bento";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <VideoShowcase />
        <Features />
        <Bento />
        <HowItWorks />
        <CtaBanner />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
