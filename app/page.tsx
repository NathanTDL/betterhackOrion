import FooterSection from "@/components/homepage/footer";
import NewHeroSection from "@/components/homepage/new-hero";
import FeaturesSection from "@/components/homepage/features-section";
import HowItWorks from "@/components/homepage/how-it-works";

export default async function Home() {
  return (
    <div className="bg-black">
      <NewHeroSection />
      <HowItWorks />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
}
