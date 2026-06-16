import { Award, Clock, Users, Wrench } from "lucide-react";

const stats = [
  { icon: Clock, label: "Years in Business", value: "9+" },
  { icon: Users, label: "Happy Clients", value: "150+" },
  { icon: Wrench, label: "Projects Completed", value: "300+" },
  { icon: Award, label: "Google Rating", value: "5.0★" },
];

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm mb-4 block">About Us</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Valsad & Vapi's #1<br />
              <span className="text-orange-500">Iron Fabrication Workshop</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              <strong className="text-white">Pankti Engineering</strong> is the most trusted iron and MS fabrication workshop serving <strong className="text-white">Valsad, Vapi, Navsari, Umargam</strong> and all of South Gujarat since 2016. Whether you're in Valsad city, Vapi GIDC, or anywhere in between — we come to you for measurement and installation.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              We specialize in <strong className="text-gray-300">iron gate fabrication</strong>, <strong className="text-gray-300">window grills</strong>, <strong className="text-gray-300">staircase railings</strong>, <strong className="text-gray-300">boundary walls</strong>, <strong className="text-gray-300">roofing sheds</strong>, <strong className="text-gray-300">rolling shutters</strong>, and <strong className="text-gray-300">industrial sheds</strong> — all made with top-grade mild steel and iron for long life in Gujarat's climate.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              With <strong className="text-gray-300">5.0 stars on Google (72 reviews)</strong> and 5.0 on JustDial (71 reviews), we are the highest-rated iron fabrication workshop in the Valsad–Vapi region. <strong className="text-gray-300">Vapi clients:</strong> we are just 25 minutes away — call for a same-day site visit.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
              <span className="text-orange-400 font-semibold italic">"Built to last a lifetime."</span>
            </div>
          </div>

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

        {/* Service areas */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-5 text-center">Areas We Serve</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Valsad", "Vapi", "Vapi GIDC", "Navsari", "Umargam", "Bilimora", "Dharampur", "Pardi", "Sanjan", "Dhamdachi", "Silvassa", "Daman"].map(city => (
              <span key={city} className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
