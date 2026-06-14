import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "gates",
    image: "/lovable-uploads/gate.jpg",
    title: "GATES",
    description: "Custom iron and steel gates that leave a lasting first impression. Designed for beauty, strength, and security.",
    tag: "Most Popular"
  },
  {
    id: "staircase-railing",
    image: "/lovable-uploads/staircase.jpg",
    title: "STAIRCASE RAILING",
    description: "Safety-first railing solutions for residential and commercial staircases, balconies, and terraces.",
    tag: null
  },
  {
    id: "boundary-walls",
    image: "/lovable-uploads/boundarywall.jpg",
    title: "BOUNDARY WALLS",
    description: "Solid boundary wall fabrication with premium quality materials and expert workmanship for every property type.",
    tag: null
  },
];

const moreServices = [
  "Roofing Sheds",
  "Rolling Shutters",
  "Iron Grills",
  "Industrial Sheds",
  "Custom Fabrication",
  "Window Grills",
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm mb-3 block">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Fabrication Services
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            From elegant residential gates to heavy-duty industrial structures — we fabricate it all with precision.
          </p>
        </div>

        {/* Main 3 services */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {services.map((service) => (
            <Link key={service.id} to={`/services/${service.id}`}>
              <Card className="overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group rounded-2xl">
                <div className="relative overflow-hidden">
                  {service.tag && (
                    <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  )}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-extrabold mb-2 text-gray-900">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center text-orange-500 font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Also available */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-5">Also Available</h3>
          <div className="flex flex-wrap gap-3">
            {moreServices.map((s) => (
              <span
                key={s}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:border-orange-400 hover:text-orange-500 transition-colors cursor-default"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
