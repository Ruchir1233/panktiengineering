import { Helmet } from "react-helmet-async";
import { yearsInBusiness } from "@/lib/business";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, CheckCircle, Star } from "lucide-react";

const services = [
  { name: "Iron Gate Fabrication in Vapi", desc: "Sliding, swing & compound gates for homes, offices and factories in Vapi and Vapi GIDC." },
  { name: "Window Grill Fabrication in Vapi", desc: "Plain and decorative iron window grills, custom fitted and powder coated for homes in Vapi." },
  { name: "Staircase Railing in Vapi", desc: "MS iron railings for indoor and outdoor staircases, balconies and terraces in Vapi." },
  { name: "Roofing Shed in Vapi", desc: "MS frame roofing sheds for homes, car parking and factory compounds in Vapi GIDC." },
  { name: "Boundary Wall Fencing in Vapi", desc: "Iron and MS boundary wall fencing for homes, plots and factories across Vapi." },
  { name: "Rolling Shutter in Vapi", desc: "Iron rolling shutters for shops, garages and factories in Vapi. Manual and spring options." },
  { name: "Industrial Shed in Vapi GIDC", desc: "Large-span MS industrial sheds and warehouses for Vapi GIDC factories and manufacturing units." },
  { name: "Custom MS Fabrication in Vapi", desc: "Any iron or MS fabrication work — tanks, platforms, trolleys and structural metalwork for Vapi clients." },
];

const faqs = [
  { q: "Is there a good fabrication workshop near Vapi?", a: "Yes — Pankti Engineering in Dhamdachi, Valsad is just 25 minutes from Vapi and is one of the highest-rated iron fabrication workshops in the area with 5.0 stars on Google (72 reviews). We regularly travel to Vapi for site visits and installations. Call +91 98795-23937." },
  { q: "What fabrication services are available in Vapi?", a: "Pankti Engineering provides iron gate fabrication, window grills, staircase railings, boundary wall fencing, roofing sheds, rolling shutters, industrial sheds and custom MS fabrication work for clients in Vapi, Vapi GIDC, Umargam, Pardi and Sanjan." },
  { q: "Do you do fabrication work in Vapi GIDC?", a: "Yes — Vapi GIDC is one of our most active service areas. We fabricate roofing sheds, industrial sheds, rolling shutters, boundary fencing and custom metalwork for factories and manufacturing units in Vapi GIDC regularly." },
  { q: "How much does fabrication work cost in Vapi?", a: "Fabrication prices in Vapi depend on the type of work and size. Window grills start from ₹1,500, iron gates from ₹8,000, and roofing sheds from ₹35,000. Call or WhatsApp +91 98795-23937 for a free on-site quote with no obligation." },
  { q: "How far is Pankti Engineering from Vapi?", a: "Pankti Engineering is located in Dhamdachi, Valsad — approximately 20–25 minutes from Vapi by road. We offer free site visits to Vapi and all surrounding areas including Umargam, Pardi and Sanjan." },
];

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function FabricationInVapi() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pankti Engineering",
    "description": "Iron and MS fabrication services in Vapi, Gujarat. Iron gates, window grills, staircase railings, boundary walls, roofing sheds, rolling shutters and industrial sheds.",
    "url": "https://www.panktiengineering.com/fabrication-in-vapi",
    "telephone": "+91-9879523937",
    "address": { "@type": "PostalAddress", "streetAddress": "Dhamdachi, Near Gundlav", "addressLocality": "Valsad", "addressRegion": "Gujarat", "postalCode": "396001", "addressCountry": "IN" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "72", "bestRating": "5" },
    "areaServed": ["Vapi","Vapi GIDC","Umargam","Pardi","Sanjan","Valsad"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Fabrication in Vapi | Iron & MS Fabrication Services Vapi Gujarat — Pankti Engineering</title>
        <meta name="description" content="Looking for fabrication in Vapi? Pankti Engineering provides iron gates, window grills, roofing sheds, rolling shutters & industrial sheds in Vapi & Vapi GIDC. 5★ Google rated. Free quote: +91 98795-23937." />
        <meta name="keywords" content="fabrication in vapi, fabrication vapi, iron fabrication vapi, MS fabrication vapi, fabrication work vapi, fabrication contractor vapi, fabrication workshop near vapi, iron gate vapi, window grill vapi, rolling shutter vapi, roofing shed vapi, industrial shed vapi gidc, fabrication vapi gidc" />
        <link rel="canonical" href="https://www.panktiengineering.com/fabrication-in-vapi" />
        <meta property="og:title" content="Fabrication in Vapi — Pankti Engineering | Iron & MS Fabrication Services" />
        <meta property="og:description" content="Iron gate, window grill, roofing shed, rolling shutter & industrial shed fabrication in Vapi & Vapi GIDC. 5★ rated. Call +91 98795-23937." />
        <meta property="og:url" content="https://www.panktiengineering.com/fabrication-in-vapi" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <div className="pt-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 py-14 max-w-5xl">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest block mb-3">Serving Vapi, Vapi GIDC & Surrounding Areas</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
            Fabrication in Vapi<br />
            <span className="text-orange-500">Iron & MS Fabrication</span><br />
            <span className="text-3xl md:text-4xl">Services in Vapi, Gujarat</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed">
            Pankti Engineering is a top-rated iron and MS fabrication workshop serving Vapi — just 25 minutes away in Valsad. Iron gates, grills, sheds, shutters and more. Free site visit across all of Vapi.
          </p>
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-5 py-3 mb-8">
            <div className="flex">{[1,2,3,4,5].map(i=><Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400"/>)}</div>
            <span className="text-white font-bold">5.0</span>
            <span className="text-gray-400 text-sm">· 72 Google Reviews · Highest rated in Valsad–Vapi region</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="tel:+919879523937" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-4 rounded-xl text-lg transition-colors">
              <Phone className="w-5 h-5" /> Call for Free Quote
            </a>
            <a href="https://wa.me/919879523937" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b558] text-white font-bold px-7 py-4 rounded-xl text-lg transition-colors">
              <WaIcon /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
      <div className="h-1 bg-orange-500" />

      {/* Trust bar */}
      <div className="bg-orange-500 py-3">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 text-white text-sm font-semibold">
            <span>✓ Free Site Visit to Vapi</span>
            <span>✓ 5★ Google Rated · 72 Reviews</span>
            <span>✓ {yearsInBusiness()} Years Experience</span>
            <span>✓ 150+ Happy Clients</span>
            <span>✓ Vapi GIDC Specialists</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">

        {/* Intro paragraphs */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Iron & MS Fabrication Services in Vapi, Gujarat</h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            <strong>Pankti Engineering</strong> is the most trusted fabrication workshop serving Vapi, Vapi GIDC, Umargam, Pardi and Sanjan. Based in Dhamdachi, Valsad — just 20–25 minutes from Vapi — we provide complete iron and MS fabrication services including iron gate fabrication, window grills, staircase railings, boundary wall fencing, roofing sheds, rolling shutters, industrial sheds and custom MS fabrication for residential and industrial clients.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            With a <strong>5.0 star rating on Google with 72 verified reviews</strong> and 5.0 on JustDial with 71 ratings, we are one of the best-rated fabrication workshops in the Valsad–Vapi region. All fabrication work uses quality-grade mild steel and iron, galvanized and powder coated for long life in Gujarat's coastal climate.
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong>Vapi GIDC clients:</strong> we regularly fabricate roofing sheds, industrial sheds, rolling shutters, boundary fencing and custom metalwork for factories and manufacturing units across the Vapi industrial corridor. Our team offers free site visits to Vapi — call <strong>+91 98795-23937</strong> to book a same-day visit.
          </p>
        </div>

        {/* Services */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-7">All Fabrication Services We Offer in Vapi</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {services.map((s, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-orange-300 transition-colors">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{s.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-7">Frequently Asked Questions — Fabrication in Vapi</h2>
        <div className="space-y-5 mb-16">
          {faqs.map((faq, i) => (
            <div key={i} className="border-l-4 border-orange-500 pl-5 py-1">
              <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Areas */}
        <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-extrabold text-white mb-4">Areas We Serve Near Vapi</h2>
          <div className="flex flex-wrap gap-3 mb-5">
            {["Vapi","Vapi GIDC","Umargam","Pardi","Sanjan","Valsad","Navsari","Bilimora","Silvassa","Daman"].map(c=>(
              <span key={c} className="bg-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium">{c}</span>
            ))}
          </div>
          <p className="text-gray-400 text-sm">We travel to all locations above for free site measurement and professional installation. No extra travel charges for Vapi and nearby areas.</p>
        </div>

        {/* CTA */}
        <div className="bg-orange-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Need Fabrication Work in Vapi?</h2>
          <p className="text-orange-100 mb-6 max-w-lg mx-auto">Call or WhatsApp for a free on-site quote. We respond same day and offer free site visits across all of Vapi.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+919879523937" className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-xl text-lg hover:bg-orange-50 transition-colors">
              <Phone className="w-5 h-5" /> 98795-23937
            </a>
            <a href="https://wa.me/919879523937" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#20b558] transition-colors">
              <WaIcon /> WhatsApp
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
