import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BUSINESS, GOOGLE, OTHER_PLATFORMS } from "@/lib/business";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

const AboutUs = () => {
  const google = useGoogleReviews();
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Pankti Engineering | Iron & MS Fabrication Valsad & Vapi Since 2016</title>
        <meta name="description" content={`About Pankti Engineering — Valsad & Vapi's most trusted iron and MS fabrication workshop since 2016. ${GOOGLE.rating.toFixed(1)}★ Google rated, ${GOOGLE.reviewCount} reviews, 150+ clients. Serving Valsad, Vapi, Navsari & South Gujarat.`} />
        <link rel="canonical" href="https://www.panktiengineering.com/about" />
        <meta property="og:title" content="About Pankti Engineering | Iron Fabrication Valsad & Vapi" />
        <meta property="og:description" content={`Valsad & Vapi's most trusted iron fabrication workshop since 2016. ${GOOGLE.rating.toFixed(1)}★ rated, ${GOOGLE.reviewCount} reviews.`} />
        <meta property="og:url" content="https://www.panktiengineering.com/about" />
      </Helmet>
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
            Iron & MS Fabrication Workshop serving Valsad, Vapi & South Gujarat
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5 text-lg">
            <strong>Pankti Engineering</strong> is a leading iron and mild steel (MS) fabrication workshop located at Dhamdachi, Valsad, Gujarat — just 25 minutes from Vapi. Established in 2016, we have completed over 300 projects for homes, shops, offices, and factories across <strong>Valsad, Vapi, Vapi GIDC, Navsari, Umargam, Bilimora, Pardi, Sanjan, Silvassa and Daman</strong>.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            We are proud to be one of the <strong>best-rated iron fabrication workshops in the Valsad–Vapi region</strong> — with a {google.rating.toFixed(1)} star rating on Google Maps ({google.count} reviews) and {OTHER_PLATFORMS.justdial.rating} on JustDial ({OTHER_PLATFORMS.justdial.count} reviews). Vapi clients: we travel to Vapi for all site measurements, supply, and installation work. Call <a href={`tel:${BUSINESS.phoneTel}`} className="text-orange-500 hover:underline">{BUSINESS.phoneDisplay}</a> to book a free site visit.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Whether you need a custom iron gate for your new bungalow in Vapi, window grills for your apartment in Valsad, a roofing shed for your Vapi GIDC factory, or a complete industrial shed structure — we handle everything from design to installation across South Gujarat.
          </p>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Our Services in Valsad & Vapi</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-12">
            {[
              { label: "Iron Gate Fabrication", to: "/services/iron-gates" },
              { label: "Window Grill Making", to: "/services/window-grills" },
              { label: "Staircase Railing Fabrication", to: "/services/staircase-railing" },
              { label: "Boundary Wall Fencing", to: "/services/boundary-walls" },
              { label: "Roofing Shed Construction", to: "/services/roofing-sheds" },
              { label: "Rolling Shutter Installation", to: "/services/rolling-shutters" },
              { label: "Industrial Shed Fabrication (Vapi GIDC)", to: "/services/industrial-sheds" },
              { label: "Custom MS Fabrication", to: "/services/custom-fabrication" },
            ].map(s => (
              <Link key={s.label} to={s.to} className="flex items-center gap-3 group">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm group-hover:text-orange-500 transition-colors">{s.label}</span>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Areas We Serve</h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            We provide iron and MS fabrication services across South Gujarat including <strong>Valsad</strong>, <strong>Vapi</strong>, <strong>Vapi GIDC</strong>, <strong>Navsari</strong>, <strong>Umargam</strong>, <strong>Bilimora</strong>, <strong>Dharampur</strong>, <strong>Pardi</strong>, <strong>Sanjan</strong>, <strong>Silvassa</strong> and <strong>Daman</strong>. We travel to your location for site measurement and installation anywhere in the region. Vapi clients can call for a same-day site visit — we are just 25 minutes from Vapi.
          </p>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8">
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Contact Pankti Engineering</h3>
            <p className="text-gray-600 mb-1">📍 Dhamdachi, Near Gundlav, Valsad, Gujarat {BUSINESS.postalCode}</p>
            <p className="text-gray-600 mb-1">📞 <a href={`tel:${BUSINESS.phoneTel}`} className="text-orange-500 font-semibold hover:underline">{BUSINESS.phoneDisplay}</a></p>
            <p className="text-gray-600">🕘 {BUSINESS.hoursDays.replace(" - ", " – ")}: {BUSINESS.hoursTime.replace(" - ", " – ")}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
