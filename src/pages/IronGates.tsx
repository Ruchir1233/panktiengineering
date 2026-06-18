import SEOPage from "@/components/SEOPage";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Iron Gate Fabrication in Valsad & Vapi",
  "provider": { "@type": "LocalBusiness", "name": "Pankti Engineering", "telephone": "+91-9879523937", "address": { "@type": "PostalAddress", "addressLocality": "Valsad", "addressRegion": "Gujarat", "addressCountry": "IN" } },
  "areaServed": ["Valsad", "Vapi", "Navsari", "Umargam", "South Gujarat"],
  "description": "Custom iron gate fabrication for homes, offices and factories in Valsad and Vapi. Sliding, swing and compound gates. Free quote available."
};

export default function IronGates() {
  return (
    <SEOPage
      title="Iron Gate Fabrication in Valsad & Vapi | Pankti Engineering"
      metaDesc="Custom iron gates for homes, offices & factories in Valsad and Vapi. Sliding, swing & compound gates. 5★ rated. Free quote: +91 98795-23937."
      keywords="iron gate valsad, iron gate vapi, compound gate valsad, sliding gate vapi, iron gate fabrication gujarat, gate manufacturer valsad vapi, iron gate near me vapi"
      canonical="https://www.panktiengineering.com/services/iron-gates"
      h1="Custom Iron Gates in Valsad & Vapi — Built to Last"
      tagline="Sliding gates · Swing gates · Compound gates · Homes, offices & factories"
      schema={schema}
      paragraphs={[
        "A gate is the very first impression your home or factory makes. At Pankti Engineering, we fabricate custom iron gates for residential bungalows, commercial properties, and industrial factories across Valsad, Vapi, Navsari and surrounding South Gujarat. Whether you want a modern horizontal-bar sliding gate, a decorative swing gate, or a heavy-duty compound gate for your factory in Vapi GIDC — we design, fabricate and install it all from our workshop in Dhamdachi, Valsad.",
        "Our iron gates are made from quality-grade mild steel (MS) and iron, treated with galvanization and powder coating to withstand Gujarat's humid coastal climate. Every gate comes with heavy-duty hinges, a reliable locking mechanism, and a professional finish that lasts decades. We take on-site measurements and deliver gates that fit your exact opening — no compromise, no guesswork. All our gates are priced transparently with no hidden costs.",
        "Vapi clients: our workshop in Dhamdachi, Valsad is just 25 minutes from Vapi. We regularly visit Vapi and Vapi GIDC for measurements and installations. Call or WhatsApp +91 98795-23937 to book a free same-day site visit. We also serve Umargam, Pardi, Sanjan, Bilimora and Navsari — no extra travel charges for these areas."
      ]}
      faqs={[
        { q: "How much does an iron gate cost in Valsad or Vapi?", a: "Gate prices depend on size, design, and material grade. A standard residential compound gate starts from approximately ₹8,000–₹15,000. Factory or industrial gates with motorized sliding can range higher. Call us for a free on-site quote — no obligation, no cost." },
        { q: "Do you make sliding gates for houses in Vapi?", a: "Yes — we fabricate both manual and motorized sliding gates for homes and factories in Vapi, Umargam, Pardi and Sanjan. We visit your location, take measurements, and install the gate ourselves. Typical delivery time is 5–10 working days." },
        { q: "How long does it take to make and install an iron gate?", a: "A standard gate takes 5–10 working days from order to installation. Complex custom designs may take slightly longer. We always confirm timelines upfront so you can plan accordingly." }
      ]}
    />
  );
}
