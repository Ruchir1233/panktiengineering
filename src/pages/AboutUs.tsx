
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-orange-500 mb-8 text-center">About Us</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed mb-6">
              Pankti Engineering is the trusted name in the manufacturing market as Quality Metal fabrication service provider in Indore. Since its inception, we have raised the level of Iron and Steel Fabrication.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              We fabricate with selected iron and steel which is best in class for any kind of fabrication work. We pass our work through various quality tests and checks. The quality checks are strict to guidelines and quality standards set by us based on material strength, fabrication process, galvanization process and more factors.
            </p>
            <p className="text-lg leading-relaxed">
              Being the most trusted fabrication shop in Indore, Pankti Engineering has redefined the processes of Iron Fabrication and Metal Fabrication.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
