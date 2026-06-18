import SEOPage from "@/components/SEOPage";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Roofing Shed & Industrial Shed Construction in South Gujarat",
  "provider": { "@type": "LocalBusiness", "name": "Pankti Engineering", "telephone": "+91-9879523937" },
  "areaServed": ["Valsad", "Vapi", "Vapi GIDC", "Navsari", "South Gujarat"],
  "description": "MS roofing sheds and industrial sheds for homes, factories and warehouses in Valsad, Vapi and South Gujarat."
};

export default function RoofingSheds() {
  return (
    <SEOPage
      title="Roofing Shed & Industrial Shed Contractor in Valsad, Vapi | Pankti Engineering"
      metaDesc="MS roofing sheds & industrial sheds for homes, factories & warehouses in Valsad, Vapi, Navsari. 5★ rated contractor. Call +91 98795-23937."
      keywords="roofing shed valsad, industrial shed vapi, factory shed vapi gidc, MS shed contractor gujarat, warehouse shed navsari, shed fabrication south gujarat, shed contractor vapi"
      canonical="https://www.panktiengineering.com/services/roofing-sheds"
      h1="Roofing Shed & Industrial Shed Contractor in Valsad, Vapi & South Gujarat"
      tagline="Home parking sheds · Factory sheds · Warehouse · Industrial · Vapi GIDC specialists"
      schema={schema}
      paragraphs={[
        "Pankti Engineering is the most trusted shed fabrication contractor serving Valsad, Vapi, Navsari and all of South Gujarat. We design, fabricate and erect MS frame roofing sheds for homes, car parking areas, factory compounds, and large-scale industrial warehouses. From a simple 10×15 ft home parking shed to a 100×200 ft industrial godown for Vapi GIDC — we handle projects of every scale with the same commitment to quality and transparency.",
        "Our sheds use structural mild steel columns and rafters with galvalume colour-coated roofing sheets that reflect heat, resist corrosion, and handle Gujarat's heavy monsoon rainfall. We provide a complete turnkey service — from civil foundation to MS frame fabrication to sheet fixing and finishing. Every shed is structurally designed for the wind load and rain load typical to coastal South Gujarat.",
        "Industrial clients in Vapi GIDC: we have completed shed projects for manufacturing units, storage godowns, vehicle parking, and factory canopies across the Vapi industrial corridor. Our team visits Vapi weekly for measurements and project supervision. Call +91 98795-23937 for a free site visit and structural estimate. We also serve Bilimora, Umargam, Pardi, Navsari and Sanjan."
      ]}
      faqs={[
        { q: "What is the cost of a roofing shed in Gujarat in 2025?", a: "A basic home car parking shed (10×15 ft) starts from approximately ₹35,000–₹55,000 depending on height and roofing sheet quality. Industrial sheds are priced per square foot — typically ₹150–₹350/sqft for standard MS structures. Contact us for a free detailed estimate with no obligation." },
        { q: "Do you make industrial sheds for Vapi GIDC factories?", a: "Yes — Vapi GIDC is one of our main service areas. We regularly fabricate factory sheds, storage godowns, and canopy structures for Vapi's industrial estates. We handle fabrication, erection, and all related work ourselves." },
        { q: "How long does it take to erect a roofing shed?", a: "A typical residential parking shed takes 3–5 days. A medium factory shed (50×100 ft) takes 2–4 weeks depending on civil work. We provide a confirmed timeline before starting any project and stick to it." }
      ]}
    />
  );
}
