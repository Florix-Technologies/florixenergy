import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ComparisonSection from "@/components/ComparisonSection";
import GreenBuildingSection from "@/components/GreenBuildingSection";
import VisionSection from "@/components/VisionSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ComparisonSection />
      <ProductsSection />
      <GreenBuildingSection />
      <VisionSection />
      <FooterSection />
    </div>
  );
};

export default Index;
