import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

const posts = [
  {
    href: "/blog/iron-gate-design-ideas-valsad-vapi",
    emoji: "🚪",
    tag: "Design Guide",
    title: "Iron Gate Design Ideas for Homes in Valsad and Vapi",
    desc: "Explore the most popular iron gate styles in 2025 — horizontal flat bar, decorative scroll, swing gates and more. With price guidance.",
    time: "5 min read",
  },
  {
    href: "/blog/roofing-shed-cost-gujarat-2025",
    emoji: "🏠",
    tag: "Price Guide",
    title: "How Much Does a Roofing Shed Cost in Gujarat? (2025)",
    desc: "Complete price breakdown for home parking sheds, factory sheds and industrial warehouses in Valsad, Vapi and South Gujarat.",
    time: "4 min read",
  },
];

const faqs = [
  { q: "Do you serve Vapi?", a: "Yes — we are 25 minutes from Vapi and offer free site visits to Vapi, Vapi GIDC, Umargam, Pardi and Sanjan." },
  { q: "How long does an iron gate take?", a: "5–10 working days from order to installation. We confirm the timeline upfront before starting." },
  { q: "Do you do free site visits?", a: "Yes — free on-site measurement and quote across Valsad, Vapi, Navsari and South Gujarat. No obligation." },
  { q: "What materials do you use?", a: "Quality-grade mild steel (MS) and iron, with galvanized and powder coated finish for long life in Gujarat's climate." },
];

const BlogSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">

      {/* Blog */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm block mb-2">Resources</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Blog & Guides</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {posts.map((p) => (
          <Link
            key={p.href}
            to={p.href}
            className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{p.emoji}</span>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">{p.tag}</span>
              <span className="text-xs text-gray-400 ml-auto">{p.time}</span>
            </div>
            <h3 className="font-extrabold text-gray-900 text-lg mb-2 group-hover:text-orange-500 transition-colors leading-snug">{p.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
            <div className="flex items-center gap-1 text-orange-500 font-semibold text-sm group-hover:gap-2 transition-all">
              Read article <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* FAQ */}
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-6 h-6 text-orange-500" />
        <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
              <span className="text-orange-500 font-black mt-0.5">Q.</span>
              {faq.q}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed pl-5">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/fabrication-in-vapi"
          className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all text-sm"
        >
          Looking for fabrication in Vapi? <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  </section>
);

export default BlogSection;
