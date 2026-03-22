import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/sections/HeroSection";
import MindsetSection from "../components/sections/MindsetSection";
import ExpertiseSection from "../components/sections/ExpertiseSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import StackSection from "../components/sections/StackSection";
import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContacSection";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <MindsetSection />
      <ExpertiseSection />
      <ProjectsSection />
      <StackSection />
      <AboutSection />
      <ContactSection />
    </MainLayout>
  );
}