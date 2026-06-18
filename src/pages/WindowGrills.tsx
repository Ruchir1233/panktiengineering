import SEOPage from "@/components/SEOPage";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Iron Window Grill Fabrication in Valsad & Vapi",
  "provider": { "@type": "LocalBusiness", "name": "Pankti Engineering", "telephone": "+91-9879523937" },
  "areaServed": ["Valsad", "Vapi", "Navsari", "South Gujarat"],
  "description": "Custom iron window grills in plain and decorative designs for homes and offices in Valsad and Vapi. Powder coated, rust proof."
};

export default function WindowGrills() {
  return (
    <SEOPage
      title="Iron Window Grills in Valsad & Vapi | Pankti Engineering"
      metaDesc="Custom iron window grills in plain & decorative designs for homes in Valsad and Vapi. Powder coated, rust proof. Call +91 98795-23937 for free quote."
      keywords="window grill valsad, iron grill vapi, window grill design valsad, home grill vapi, iron window grill gujarat, MS grill valsad, window grill near me vapi"
      canonical="https://www.panktiengineering.com/services/window-grills"
      h1="Iron Window Grills in Valsad & Vapi — Custom Fitted & Powder Coated"
      tagline="Plain grills · Decorative designs · Powder coated · Custom sized to your windows"
      schema={schema}
      paragraphs={[
        "Window grills are a vital security addition for any home, apartment, or office in Gujarat. At Pankti Engineering, we fabricate custom iron window grills in mild steel square bars and flat bars — available in simple straight-bar patterns, geometric designs, and ornamental decorative styles. Every grill is made to your exact window dimensions and installed directly on-site by our team across Valsad, Vapi, Navsari and surrounding areas.",
        "All our window grills are powder coated for a durable, rust-resistant finish that holds up in Valsad and Vapi's coastal climate. We offer a wide range of colour options — black and dark grey are most popular for homes in this region. Whether you're building a new house in Valsad, renovating an apartment in Vapi, or securing a commercial premises in Navsari, our grills combine security with style at honest prices.",
        "We serve all areas including Valsad, Vapi, Vapi GIDC residential areas, Umargam, Bilimora, Pardi and Navsari. WhatsApp us photos of your windows and we will send you a design and quote the same day. Call +91 98795-23937 — free measurement, free site visit, transparent pricing."
      ]}
      faqs={[
        { q: "What is the price of iron window grills in Valsad or Vapi?", a: "Window grill prices depend on size, bar thickness, and design complexity. A standard 3×4 ft plain grill typically costs ₹1,500–₹3,000. Decorative grills cost more depending on the pattern. Send us your window measurements on WhatsApp for an instant quote." },
        { q: "How long do powder coated grills last in Gujarat's climate?", a: "A good powder coated iron grill lasts 10–15 years or more with minimal maintenance. We use quality powder coating that resists salt air, humidity, and monsoon moisture — ideal for homes near the coast in Valsad and Vapi." },
        { q: "Can you make matching grills for all windows in my house?", a: "Yes — we make matching sets for all windows in a single design and coating colour. This is our most common residential order. We ensure consistent colour and finish across every grill in the set." }
      ]}
    />
  );
}
