import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ResultsStrip from '@/components/ResultsStrip';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import HowIThinkSection from '@/components/HowIThinkSection';
import ServicesSection from '@/components/ServicesSection';
import AdsBudgetCalculator from '@/components/AdsBudgetCalculator';
import AboutSplitSection from '@/components/AboutSplitSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import MouseSpotlight from '@/components/MouseSpotlight';

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
      <CustomCursor />
      <MouseSpotlight />
      <Navbar />
      <HeroSection />
      <ResultsStrip />
      <CaseStudiesSection />
      <BeforeAfterSlider />
      <HowIThinkSection />
      <ServicesSection />
      <AdsBudgetCalculator />
      <AboutSplitSection />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
