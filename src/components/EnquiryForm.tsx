import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/business";

const SERVICES = [
  "Iron Gate",
  "Window Grill",
  "Staircase Railing",
  "Roofing Shed",
  "Boundary Wall",
  "Rolling Shutter",
  "Industrial Shed",
  "Custom Fabrication",
];

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500";

/**
 * Quote enquiry form. There is no backend: on submit it opens WhatsApp with the
 * details pre-filled, so the enquiry reaches the business directly.
 */
const EnquiryForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hello Pankti Engineering, I would like a free quote.",
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Service: ${service}`,
      `Location: ${location.trim()}`,
    ];
    if (details.trim()) lines.push(`Details: ${details.trim()}`);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-orange-50 border border-orange-100 rounded-2xl p-6">
      <div>
        <h2 className="text-xl font-extrabold text-gray-900">Get a Free Quote</h2>
        <p className="text-sm text-gray-600 mt-1">
          Fill in the details and we'll continue the conversation on WhatsApp.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          className={fieldClass}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          aria-label="Your name"
        />
        <input
          className={fieldClass}
          placeholder="Phone number"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          autoComplete="tel"
          aria-label="Phone number"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <select
          className={fieldClass}
          value={service}
          onChange={(e) => setService(e.target.value)}
          aria-label="Service needed"
        >
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          className={fieldClass}
          placeholder="Site location (e.g. Vapi GIDC)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          aria-label="Site location"
        />
      </div>

      <textarea
        className={`${fieldClass} min-h-[96px]`}
        placeholder="Size, design or any other details (optional)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        aria-label="Project details"
      />

      <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-xl py-6 text-base font-semibold">
        <MessageCircle className="w-5 h-5 mr-2" />
        Send on WhatsApp
      </Button>
    </form>
  );
};

export default EnquiryForm;
