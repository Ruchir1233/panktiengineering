
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const services = [
  {
    id: "gates",
    image: "/lovable-uploads/gate.jpg",
    title: "GATES",
    description: "Gates give the first impression to your guests, visitors, and anyone passing through your houses, offices."
  },
  {
    id: "staircase-railing",
    image: "/lovable-uploads/staircase.jpg",
    title: "STAIRCASE RAILING",
    description: "Installing balconies is extremely crucial to ensure the all-round safety of your property."
  },
  {
    id: "boundary-walls",
    image: "/lovable-uploads/boundarywall.jpg",
    title: "BOUNDARY WALLS",
    description: "Professional boundary wall fabrication with premium materials and expert craftsmanship."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-16">
          OUR FABRICATION SERVICES
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.id} to={`/services/${service.id}`}>
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
