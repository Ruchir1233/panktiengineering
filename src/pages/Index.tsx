import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { ImageGallery } from "@/components/ImageGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <Hero />
      <Services />
      {/* <ImageGallery /> */}
      <AboutUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
