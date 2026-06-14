import { Award, Clock, Users, Wrench } from "lucide-react";

const stats = [
  { icon: Clock, label: "Years in Business", value: "9+" },
  { icon: Users, label: "Happy Clients", value: "150+" },
  { icon: Wrench, label: "Projects Completed", value: "300+" },
  { icon: Award, label: "Quality Assured", value: "100%" },
];

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="text-white">
            <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm mb-4 block">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Valsad's Trusted<br />
              <span className="text-orange-500">Fabrication Experts</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Pankti Engineering is a trusted name in metal fabrication, proudly serving the people of Valsad and surrounding Gujarat since 2016. For nearly a decade, we have been the go-to workshop for quality iron and steel work — from custom gates and railings to industrial sheds and boundary walls.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Every project passes through our strict quality checks — from material selection and structural integrity to galvanization and finishing. We use only the best grade iron and steel to ensure lasting durability in the Gujarat climate.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
              <span className="text-orange-400 font-semibold italic">"Built to last a lifetime."</span>
            </div>
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/40 transition-colors"
              >
                <stat.icon className="w-8 h-8 text-orange-500 mb-4" />
                <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
