import ClientSuccessStories from "../main/ClientStories";
import Cta from "../main/cta/Cta";
import FAQ from "../main/faq";
import Footer from "../main/Footer";
import Navbar from "../main/Navbar";
import Team from "../main/team/Team";
import AboutCards from "./components/AboutCards";
import HeroSection from "./components/HeroSection";
import Journey from "./components/Journey";

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="bg-black min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutCards/>
        <Journey/>
        <Team />
        <ClientSuccessStories />
        <FAQ />
        <Cta />
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
