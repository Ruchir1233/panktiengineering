import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, CheckCircle, Phone, ArrowLeft } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serviceData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  images: { src: string; alt: string }[];
  localImage?: string;
}> = {
  'gates': {
    title: 'Iron & Steel Gates',
    subtitle: 'Make a powerful first impression',
    description: 'Our custom-fabricated iron and steel gates are built for beauty, strength, and long-term durability. Whether you need a sliding gate for your bungalow, a grand entrance gate for your factory, or a decorative compound gate for your home, we craft every piece with precision. With over 9 years of experience in Valsad, Pankti Engineering is the trusted name for gate fabrication in Gujarat.',
    features: [
      'Sliding & swing gate options',
      'Custom designs — modern, traditional, decorative',
      'Powder-coated or galvanized finish for rust protection',
      'Heavy-duty hinges & locking mechanism included',
      'Suitable for residential, commercial & industrial use',
      'On-site measurement & professional installation',
    ],
    localImage: '/lovable-uploads/gate.jpg',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Modern steel sliding gate' },
      { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', alt: 'Iron fabrication work' },
      { src: 'https://images.unsplash.com/photo-1590725140246-20acddc1ec6a?w=800&q=80', alt: 'Steel gate installation' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Residential compound gate' },
      { src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', alt: 'House with iron gate' },
      { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', alt: 'Industrial steel gate' },
    ],
  },
  'staircase-railing': {
    title: 'Staircase Railings',
    subtitle: 'Safety and style for every staircase',
    description: 'A staircase railing is both a safety essential and a design statement. We fabricate custom railings for indoor staircases, outdoor steps, terraces, and balconies — in iron, mild steel, or combination designs. Each railing is carefully measured, crafted, and installed by our skilled team. We serve homes, offices, hospitals, apartments, and industrial facilities across Valsad and surrounding areas.',
    features: [
      'Indoor & outdoor staircase railings',
      'Balcony and terrace safety railings',
      'Various design styles: straight, spiral, curved',
      'Powder-coated finish for long life',
      'Corrosion-resistant treatment',
      'Meets safety standards for height & strength',
    ],
    localImage: '/lovable-uploads/staircase.jpg',
    images: [
      { src: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80', alt: 'Modern staircase railing' },
      { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', alt: 'Steel railing on stairs' },
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Interior staircase railing' },
      { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Home staircase' },
      { src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80', alt: 'Balcony iron railing' },
      { src: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80', alt: 'Terrace railing installation' },
    ],
  },
  'boundary-walls': {
    title: 'Boundary Walls',
    subtitle: 'Secure your property with confidence',
    description: 'A strong boundary wall protects your home, factory, or land while giving it a polished look. We design and fabricate iron and steel boundary fencing structures that are built to last — resistant to weather, rust, and physical impact. From simple compound fencing to decorative boundary walls with grills, we handle every type of requirement across Valsad district.',
    features: [
      'Iron & mild steel compound fencing',
      'Decorative grill-top boundary walls',
      'Custom height as per requirement',
      'Galvanized & powder-coated finish',
      'Works with concrete base or standalone',
      'Industrial & residential options available',
    ],
    localImage: '/lovable-uploads/boundarywall.jpg',
    images: [
      { src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80', alt: 'Metal boundary fence' },
      { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Property boundary wall' },
      { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', alt: 'Compound boundary fencing' },
      { src: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&q=80', alt: 'Industrial boundary fence' },
      { src: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80', alt: 'Steel fence installation' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Iron fence design' },
    ],
  },
  'roofing-sheds': {
    title: 'Roofing Sheds',
    subtitle: 'Durable shelter for homes & industry',
    description: 'From industrial warehouses to car parking sheds and residential sunshades, Pankti Engineering designs and erects steel roofing structures that are strong, weather-resistant, and built to last decades. We handle the complete process from design to fabrication to on-site installation, using quality-grade mild steel and roofing sheets.',
    features: [
      'Industrial & residential shed fabrication',
      'Car parking, factory & warehouse sheds',
      'Galvalume and color-coated roofing sheets',
      'Strong MS frame with anchor bolt foundation',
      'Wind & rain resistant construction',
      'Custom span width from 10ft to 100ft+',
    ],
    localImage: undefined,
    images: [
      { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', alt: 'Industrial roofing shed' },
      { src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80', alt: 'Steel shed construction' },
      { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', alt: 'Large industrial warehouse' },
      { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', alt: 'Building structure' },
      { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', alt: 'Car parking shade' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Roofing sheet shed' },
    ],
  },
  'rolling-shutters': {
    title: 'Rolling Shutters',
    subtitle: 'Secure your shop or factory with ease',
    description: 'Rolling shutters are the go-to solution for shops, showrooms, warehouses, garages, and industrial units. Pankti Engineering fabricates and installs high-quality mild steel rolling shutters that are smooth to operate, weather-resistant, and built for years of daily use. Available in manual and spring-balanced versions for all opening sizes.',
    features: [
      'Manual, spring & motorized options',
      'Shop fronts, garages, factories & godowns',
      'Galvanized steel slats for rust protection',
      'Smooth ball-bearing side guide rollers',
      'Available in all widths & heights',
      'Same-day emergency repair service available',
    ],
    localImage: undefined,
    images: [
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Shop rolling shutter' },
      { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Commercial rolling shutter' },
      { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', alt: 'Industrial shutter' },
      { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', alt: 'Rolling door installation' },
      { src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80', alt: 'Steel rolling shutter' },
      { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', alt: 'Garage rolling door' },
    ],
  },
  'iron-grills': {
    title: 'Iron Grills',
    subtitle: 'Safety grills for windows & doors',
    description: 'Iron window grills and door grills are an essential safety measure for any home or office in Gujarat. We fabricate custom iron grills in a wide variety of designs — from simple straight-bar grills to ornate decorative patterns. All grills are powder-coated for rust protection and fitted with precision to your exact window or door dimensions.',
    features: [
      'Window grills, door grills & ventilation grills',
      'Standard & decorative/designer patterns',
      'Mild steel & square bar options',
      'Powder-coated in any colour',
      'Custom sizing for all window/door types',
      'Quick turnaround & on-site fitting',
    ],
    localImage: undefined,
    images: [
      { src: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80', alt: 'Window iron grill' },
      { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', alt: 'Decorative iron grill' },
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Door safety grill' },
      { src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80', alt: 'Iron bar grill' },
      { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Home window grill' },
      { src: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80', alt: 'Iron grill design' },
    ],
  },
  'industrial-sheds': {
    title: 'Industrial Sheds',
    subtitle: 'Heavy-duty structures for factories & warehouses',
    description: 'We design and construct pre-engineered and conventional industrial sheds for factories, manufacturing plants, storage godowns, and agricultural use. Our sheds are built with structural steel frames and high-quality roofing sheets designed to handle Gujarat\'s climate. Turnkey services from design to civil work to erection available.',
    features: [
      'Factory, warehouse & agricultural sheds',
      'Pre-Engineered Building (PEB) options',
      'Structural steel MS columns & rafters',
      'Galvalume color-coated roofing',
      'Side cladding & ventilator options',
      'Foundation to roof — turnkey available',
    ],
    localImage: undefined,
    images: [
      { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', alt: 'Large industrial shed' },
      { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', alt: 'Factory steel shed' },
      { src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80', alt: 'Warehouse building' },
      { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', alt: 'Industrial facility' },
      { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', alt: 'Steel structure shed' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'PEB shed construction' },
    ],
  },
  'custom-fabrication': {
    title: 'Custom Fabrication',
    subtitle: 'If you can imagine it, we can build it',
    description: 'Don\'t see what you need? Pankti Engineering takes on custom fabrication projects of any scale. From MS tanks and platforms to conveyors, supports, trolleys, and unique structural metalwork — if it can be made from iron or steel, we can fabricate it. Our workshop in Dhamdachi, Valsad is equipped for cutting, bending, welding, and finishing any custom requirement.',
    features: [
      'MS tanks, hoppers & storage structures',
      'Platforms, mezzanines & walkways',
      'Conveyors & material handling equipment',
      'Steel furniture & industrial trolleys',
      'One-off prototypes to bulk production',
      'Welding, cutting, bending & finishing in-house',
    ],
    localImage: undefined,
    images: [
      { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', alt: 'Metal fabrication workshop' },
      { src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80', alt: 'Custom steel fabrication' },
      { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', alt: 'Industrial metalwork' },
      { src: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80', alt: 'Welding fabrication' },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Custom iron work' },
      { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', alt: 'Steel structure custom' },
    ],
  },
  'window-grills': {
    title: 'Window Grills',
    subtitle: 'Stylish protection for every window',
    description: 'Window grills are a vital security addition to any home, office, or commercial establishment. Pankti Engineering fabricates window grills in mild steel square bars and flat bars, available in dozens of patterns — from clean modern designs to traditional ornamental styles. All grills come with a durable powder-coat finish that matches your window frames.',
    features: [
      'Plain, fancy & designer grill patterns',
      'MS square bar & flat bar options',
      'Powder-coated in white, black, or any RAL colour',
      'Customized to exact window dimensions',
      'Quick turnaround — typically 3-5 days',
      'Includes on-site fixing & grouting',
    ],
    localImage: undefined,
    images: [
      { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', alt: 'Window iron grill design' },
      { src: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80', alt: 'Decorative window grill' },
      { src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80', alt: 'Home window security grill' },
      { src: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80', alt: 'Modern window grill' },
      { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', alt: 'Steel window grill' },
      { src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', alt: 'Fitted window grill' },
    ],
  },
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const service = id ? serviceData[id] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service not found</h1>
          <Link to="/" className="text-orange-500 hover:underline">← Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = service.localImage
    ? [{ src: service.localImage, alt: service.title }, ...service.images]
    : service.images;

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImg = () => setLightboxIdx(i => i !== null ? (i - 1 + allImages.length) % allImages.length : 0);
  const nextImg = () => setLightboxIdx(i => i !== null ? (i + 1) % allImages.length : 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero banner */}
      <div className="pt-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 py-14">
          <Link to="/#services" className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest block mb-2">Our Services</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">{service.title}</h1>
          <p className="text-gray-400 text-lg">{service.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Info */}
          <div className="lg:col-span-1">
            <p className="text-gray-600 leading-relaxed text-base mb-8">{service.description}</p>

            <h2 className="text-lg font-bold text-gray-900 mb-4">What's Included</h2>
            <ul className="space-y-3 mb-10">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA box */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Get a Free Quote</h3>
              <p className="text-gray-500 text-sm mb-4">Call us or WhatsApp — we'll get back to you within the hour.</p>
              <a
                href="tel:+919879523937"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors w-full justify-center"
              >
                <Phone className="w-4 h-4" />
                +91 98795-23937
              </a>
            </div>
          </div>

          {/* Right: Image Gallery */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Gallery <span className="text-gray-400 font-normal text-sm">— click to enlarge</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allImages.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-xl cursor-pointer group relative"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-colors bg-black/40 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={allImages[lightboxIdx].src}
            alt={allImages[lightboxIdx].alt}
            className="max-w-4xl max-h-[85vh] w-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-400 transition-colors bg-black/40 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIdx + 1} / {allImages.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ServiceDetail;
