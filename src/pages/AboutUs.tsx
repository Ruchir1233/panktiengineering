import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 py-14">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest block mb-2">Who We Are</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            About Pankti Engineering — Iron Fabrication in Valsad
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Valsad's most trusted iron and MS fabrication workshop since 2016.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Best Iron & MS Fabrication Workshop in Valsad, Gujarat
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-lg">
            <strong>Pankti Engineering</strong> is a leading iron and mild steel (MS) fabrication workshop located at Dhamdachi, Valsad, Gujarat. Established in 2016, we have completed over 300 projects for homes, shops, offices, and factories across Valsad, Vapi, Navsari, Umargam, Bilimora, and surrounding areas.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            We are proud to be the <strong>highest-rated fabrication workshop in Valsad</strong> — with a 5.0 star rating on Google Maps (72 reviews) and 5.0 on JustDial (71 reviews). Every project is completed with strict quality checks on material grade, weld strength, galvanization quality, and surface finishing.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Whether you need a custom iron gate for your new home in Valsad, window grills for your apartment, a roofing shed for your factory, or a complete industrial shed structure — we handle it all from design to installation.
          </p>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Our Services in Valsad</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-12">
            {[
              "Iron Gate Fabrication in Valsad",
              "Window Grill Making in Valsad",
              "Staircase Railing Fabrication Valsad",
              "Boundary Wall Fencing Valsad",
              "Roofing Shed Construction Valsad",
              "Rolling Shutter Installation Valsad",
              "Industrial Shed Fabrication Valsad",
              "Custom MS Fabrication Valsad",
            ].map(s => (
              <div key={s} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{s}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Areas We Serve</h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            We provide iron and MS fabrication services across Valsad district and beyond, including <strong>Valsad</strong>, <strong>Vapi</strong>, <strong>Navsari</strong>, <strong>Umargam</strong>, <strong>Bilimora</strong>, <strong>Dharampur</strong>, <strong>Pardi</strong>, <strong>Sanjan</strong>, <strong>Dhamdachi</strong>, and <strong>Mograwadi</strong>. Contact us for on-site measurement and installation anywhere in South Gujarat.
          </p>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8">
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Contact Pankti Engineering</h3>
            <p className="text-gray-600 mb-1">📍 Dhamdachi, Near Gundlav, Valsad, Gujarat 396035</p>
            <p className="text-gray-600 mb-1">📞 <a href="tel:+919879523937" className="text-orange-500 font-semibold hover:underline">+91 98795-23937</a></p>
            <p className="text-gray-600">🕘 Monday – Saturday: 9:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
