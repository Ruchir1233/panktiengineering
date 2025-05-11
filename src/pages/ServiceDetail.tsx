
import { useParams } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serviceDetails = {
  'gates': {
    title: 'GATES',
    description: `Gates give the first impression to your guests, visitors, and anyone passing through your houses, offices. We specialize in creating custom gates that combine security with aesthetic appeal.`,
    features: [
      `Custom designs to match your property's style`,
      'High-quality materials for durability',
      'Professional installation',
      'Regular maintenance services',
    ],
    images: [
      '/lovable-uploads/gate.jpeg',
    ]
  },
  'staircase-railing': {
    title: 'STAIRCASE RAILING',
    description: `Installing balconies and staircase railings is extremely crucial to ensure the all-round safety of your property. Our railings combine safety with style.`,
    features: [
      'Contemporary and traditional designs',
      'Durable materials for long-lasting performance',
      'Safety-first approach',
      'Custom measurements and installations',
    ],
    images: [
      '/lovable-uploads/b0226e35-c1b3-4629-87c7-df035fab3dd9.png',
    ]
  },
  'boundary-walls': {
    title: 'BOUNDARY WALLS',
    description: `Professional boundary wall fabrication with premium materials and expert craftsmanship. Our boundary walls provide security while enhancing your property's appearance.`,
    features: [
      'Custom height and design options',
      'Integration with security systems',
      'Weather-resistant materials',
      'Professional installation team',
    ],
    images: [
      '/lovable-uploads/homeimage.png',
    ]
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = serviceDetails[id as keyof typeof serviceDetails];

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-orange-500 mb-12 text-center">{service.title}</h1>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-lg leading-relaxed mb-8">{service.description}</p>
                <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                {service.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${service.title} ${index + 1}`}
                    className="w-full rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
