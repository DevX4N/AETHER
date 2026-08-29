import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Ignition from "@/components/sections/Ignition";
import TheCore from "@/components/sections/TheCore";
import ScaleData from "@/components/sections/ScaleData";
import EnergyFlow from "@/components/sections/EnergyFlow";
import ScaleApplications from "@/components/sections/ScaleApplications";
import Engineering from "@/components/sections/Engineering";
import CoreInspector from "@/components/sections/CoreInspector";
import Statement from "@/components/sections/Statement";
import FinalCore from "@/components/sections/FinalCore";
import CtaFinal from "@/components/sections/CtaFinal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ignition />
        <TheCore />
        <CoreInspector />
        <ScaleData />
        <EnergyFlow />
        <ScaleApplications />
        <Engineering />
        <Statement />
        <FinalCore />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
