
import { Users } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="relative py-20 bg-[#222222] text-white">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Users className="w-12 h-12 text-orange-500 mb-6" />
          <h2 className="text-4xl font-bold text-orange-500 mb-8">ABOUT US</h2>
          <p className="text-lg leading-relaxed">
            Pankti Engineering is the trusted name in the manufacturing market as Quality Metal fabrication service provider in Indore. Since its inception, we have raised the level of Iron and Steel Fabrication. We fabricate with selected iron and steel which is best in class for any kind of fabrication work. We pass our work through various quality tests and checks. The quality checks are strict to guidelines and quality standards set by us based on material strength, fabrication process, galvanization process and more factors. Being the most trusted fabrication shop in Indore, Pankti Engineering has redefined the processes of Iron Fabrication and Metal Fabrication.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
