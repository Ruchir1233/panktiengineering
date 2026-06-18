import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Phone } from "lucide-react";

interface FAQ { q: string; a: string; }
interface Props {
  title: string;
  metaDesc: string;
  keywords: string;
  canonical: string;
  h1: string;
  tagline: string;
  paragraphs: string[];
  faqs: FAQ[];
  schema?: object;
}

export default function SEOPage({ title, metaDesc, keywords, canonical, h1, tagline, paragraphs, faqs, schema }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.panktiengineering.com/logo.png" />
        {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      </Helmet>

      <Navbar />

      {/* Hero */}
      <div className="pt-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 py-14 max-w-4xl">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest block mb-3">Pankti Engineering · Valsad & Vapi</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">{h1}</h1>
          <p className="text-gray-400 text-lg">{tagline}</p>
        </div>
      </div>
      <div className="h-1 bg-orange-500" />

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed text-base mb-6">{p}</p>
            ))}

            {/* FAQ */}
            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-l-4 border-orange-500 pl-5">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#1a1a1a] rounded-2xl p-6 text-white">
              <div className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Free Quote</div>
              <p className="text-sm text-gray-300 mb-5 leading-relaxed">Call or WhatsApp us for a free site visit and transparent quote. We serve Valsad, Vapi, Navsari & South Gujarat.</p>
              <a href="tel:+919879523937" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded-xl w-full transition-colors mb-3">
                <Phone className="w-4 h-4" /> +91 98795-23937
              </a>
              <a href="https://wa.me/919879523937" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b558] text-white font-bold px-4 py-3 rounded-xl w-full transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="text-xs text-gray-500 mb-2">Areas We Serve</div>
                <div className="flex flex-wrap gap-2">
                  {["Valsad","Vapi","Navsari","Umargam","Bilimora","Pardi","Sanjan"].map(c => (
                    <span key={c} className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded-md">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
