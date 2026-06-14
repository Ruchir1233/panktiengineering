import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlatformRatings from "@/components/PlatformRatings";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <Hero />
      <PlatformRatings />
      <Services />
      <WhyUs />
      <AboutUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
