import ClientSuccessStories from "../main/ClientStories";
import Cta from "../main/cta/Cta";
import FAQ from "../main/faq";
import Footer from "../main/Footer";
import MaintenancePricing from "../main/mpricing/MPricing";
import Navbar from "../main/Navbar";
import PricingPag from "../main/Pricing";

const PricingPage: React.FC = () => {
  return (
    <>
      <div className="bg-black min-h-screen">
        <Navbar />
        <PricingPag />
        <div id="Maintenance">
          <MaintenancePricing />
        </div>
        <ClientSuccessStories />
        <FAQ />
        <Cta />
        <Footer />
      </div>
    </>
  );
};

export default PricingPage;
