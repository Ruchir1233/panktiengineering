import { ShieldCheck, Hammer, ThumbsUp, IndianRupee } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    desc: "Every piece passes strict quality checks before delivery. No shortcuts, no compromises."
  },
  {
    icon: Hammer,
    title: "9+ Years Experience",
    desc: "Serving Valsad since 2016. Years of hands-on craftsmanship in iron & MS fabrication work."
  },
  {
    icon: IndianRupee,
    title: "Honest Pricing",
    desc: "Fair, transparent quotes with no hidden costs. What we quote is what you pay."
  },
  {
    icon: ThumbsUp,
    title: "On-Time Delivery",
    desc: "We respect your time. Projects are completed within the agreed schedule, every time."
  },
];

const WhyUs = () => (
  <section className="py-16 bg-orange-500">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {reasons.map((r, i) => (
          <div key={i} className="text-center text-white">
            <r.icon className="w-10 h-10 mx-auto mb-3 text-white/80" />
            <h3 className="font-bold text-lg mb-2">{r.title}</h3>
            <p className="text-sm text-orange-100 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
