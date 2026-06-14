import { Card, CardContent } from "@/components/ui/card";

const allServices = [
  {
    id: "window-grills",
    image: "/services/window-grill.svg",
    title: "Window Grills",
    description: "Stylish and secure iron window grills in plain or decorative patterns — custom sized and fitted on-site.",
    tag: null,
  },
  {
    id: "roofing-sheds",
    image: "/services/roofing-shed.svg",
    title: "Roofing Sheds",
    description: "Durable MS frame roofing sheds for homes, factories, car parking, and industrial warehouses.",
    tag: null,
  },
  {
    id: "gates",
    image: "/lovable-uploads/gate.jpg",
    title: "Gates",
    description: "Custom iron gates for homes, offices, and factories. Designed for beauty, strength, and security.",
    tag: "Most Popular",
  },
  {
    id: "staircase-railing",
    image: "/lovable-uploads/staircase.jpg",
    title: "Staircase Railing",
    description: "Safety-first iron railing solutions for residential and commercial staircases, balconies, and terraces.",
    tag: null,
  },
  {
    id: "boundary-walls",
    image: "/lovable-uploads/boundarywall.jpg",
    title: "Boundary Walls",
    description: "Solid iron and MS boundary wall fabrication with expert craftsmanship for every property type.",
    tag: null,
  },
  {
    id: "rolling-shutters",
    image: "/services/rolling-shutter.svg",
    title: "Rolling Shutters",
    description: "Heavy-duty iron rolling shutters for shops, showrooms, garages, and industrial units.",
    tag: null,
  },
  {
    id: "industrial-sheds",
    image: "/services/industrial-shed.svg",
    title: "Industrial Sheds",
    description: "Heavy-duty MS structural sheds for factories, manufacturing plants, storage godowns and more.",
    tag: null,
  },
  {
    id: "custom-fabrication",
    image: "/services/custom-fab.svg",
    title: "Custom Fabrication",
    description: "Any iron or MS fabrication work — tanks, platforms, supports, furniture, and structural metalwork.",
    tag: null,
  },
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
            From window grills and gates to industrial sheds — quality iron and MS fabrication across Valsad, Gujarat.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allServices.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group rounded-2xl cursor-default"
            >
              <div className="relative overflow-hidden">
                {service.tag && (
                  <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {service.tag}
                  </span>
                )}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-base font-extrabold mb-1.5 text-gray-900">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
