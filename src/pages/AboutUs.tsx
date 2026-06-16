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
            About Pankti Engineering — Iron Fabrication in Valsad & Vapi, Gujarat
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Valsad & Vapi's most trusted iron and MS fabrication workshop since 2016.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Best Iron & MS Fabrication Workshop serving Valsad, Vapi & South Gujarat
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-lg">
            <strong>Pankti Engineering</strong> is a leading iron and mild steel (MS) fabrication workshop located at Dhamdachi, Valsad, Gujarat — just 25 minutes from Vapi. Established in 2016, we have completed over 300 projects for homes, shops, offices, and factories across <strong>Valsad, Vapi, Vapi GIDC, Navsari, Umargam, Bilimora, Pardi, Sanjan, Silvassa and Daman</strong>.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            We are proud to be the <strong>highest-rated iron fabrication workshop in the Valsad–Vapi region</strong> — with a 5.0 star rating on Google Maps (72 reviews) and 5.0 on JustDial (71 reviews). Vapi clients: we travel to Vapi for all site measurements, supply, and installation work. Call <a href="tel:+919879523937" className="text-orange-500 hover:underline">+91 98795-23937</a> to book a free site visit.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Whether you need a custom iron gate for your new bungalow in Vapi, window grills for your apartment in Valsad, a roofing shed for your Vapi GIDC factory, or a complete industrial shed structure — we handle everything from design to installation across South Gujarat.
          </p>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Our Services in Valsad & Vapi</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-12">
            {[
              "Iron Gate Fabrication in Valsad & Vapi",
              "Window Grill Making in Valsad & Vapi",
              "Staircase Railing Fabrication Valsad Vapi",
              "Boundary Wall Fencing Valsad Vapi",
              "Roofing Shed Construction Valsad Vapi",
              "Rolling Shutter Installation Valsad Vapi",
              "Industrial Shed Fabrication Vapi GIDC",
              "Custom MS Fabrication South Gujarat",
            ].map(s => (
              <div key={s} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{s}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Areas We Serve</h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            We provide iron and MS fabrication services across South Gujarat including <strong>Valsad</strong>, <strong>Vapi</strong>, <strong>Vapi GIDC</strong>, <strong>Navsari</strong>, <strong>Umargam</strong>, <strong>Bilimora</strong>, <strong>Dharampur</strong>, <strong>Pardi</strong>, <strong>Sanjan</strong>, <strong>Silvassa</strong> and <strong>Daman</strong>. We travel to your location for site measurement and installation anywhere in the region. Vapi clients can call for a same-day site visit — we are just 25 minutes from Vapi.
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
