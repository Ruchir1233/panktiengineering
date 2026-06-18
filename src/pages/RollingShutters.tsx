import SEOPage from "@/components/SEOPage";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Rolling Shutter Fabrication in Valsad & Vapi",
  "provider": { "@type": "LocalBusiness", "name": "Pankti Engineering", "telephone": "+91-9879523937" },
  "areaServed": ["Valsad", "Vapi", "Navsari", "South Gujarat"],
  "description": "Iron rolling shutters for shops, garages and factories in Valsad and Vapi. Manual, spring and motorized options."
};

export default function RollingShutters() {
  return (
    <SEOPage
      title="Rolling Shutter Fabrication in Valsad & Vapi | Pankti Engineering"
      metaDesc="Iron rolling shutters for shops, garages & factories in Valsad and Vapi. Manual, spring & motorized. 5★ rated. Call +91 98795-23937."
      keywords="rolling shutter valsad, iron shutter vapi, shop shutter valsad, rolling shutter fabrication vapi, garage shutter gujarat, MS shutter navsari, rolling shutter near me vapi"
      canonical="https://www.panktiengineering.com/services/rolling-shutters"
      h1="Iron Rolling Shutters in Valsad & Vapi — Shops, Garages & Factories"
      tagline="Manual · Spring balanced · Motorized · Repair & servicing available"
      schema={schema}
      paragraphs={[
        "Rolling shutters are the most common security solution for shops, showrooms, warehouses, garages and industrial units across Gujarat. Pankti Engineering fabricates and installs iron rolling shutters with galvanized mild steel slats that are smooth-running, durable, and built for years of daily use. We supply manual, spring-balanced, and motorized shutters for any opening size across Valsad, Vapi, Navsari and South Gujarat.",
        "Our rolling shutters feature precision-engineered side guide channels, heavy-duty barrel drums, and smooth ball-bearing rollers that ensure effortless operation even after years of daily use. All shutters are galvanized and optionally powder coated to resist rust in Valsad and Vapi's coastal environment. We also offer same-day repair and servicing of existing shutters from any manufacturer — broken springs, bent slats, seized drums and motor faults.",
        "Whether you have a new shop opening in Valsad market, a garage at your home in Vapi, or a large factory gate at Vapi GIDC — we supply, fabricate, and install the right shutter. WhatsApp us your opening width and height for a same-day quote: +91 98795-23937. We also serve Umargam, Pardi, Bilimora and Navsari with fast turnaround."
      ]}
      faqs={[
        { q: "What is the price of a rolling shutter in Valsad or Vapi?", a: "A standard 10×10 ft shop rolling shutter costs approximately ₹8,000–₹14,000 depending on gauge (thickness) and type. Spring-balanced shutters cost slightly more. Motorized shutters are higher. Send us your shutter width and height on WhatsApp for an exact quote." },
        { q: "Do you repair old rolling shutters in Vapi?", a: "Yes — we repair and service rolling shutters of any make and model in Vapi, Valsad and surrounding areas. Common repairs include spring replacement, drum alignment, slat repair, guide track straightening and motor servicing. We respond quickly to repair calls." },
        { q: "How long does installation of a rolling shutter take?", a: "A single rolling shutter can typically be installed in 4–6 hours. Multiple shutters or large industrial shutters may take a full day. We schedule same-day or next-day installation for most orders in Valsad and Vapi." }
      ]}
    />
  );
}
