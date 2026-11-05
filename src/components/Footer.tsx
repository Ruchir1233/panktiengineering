import { MapPin, Phone, Clock, ExternalLink, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { BUSINESS, GOOGLE, whatsappLink } from "@/lib/business";

const footerServices = [
  { label: "Iron Gate", to: "/services/iron-gates" },
  { label: "Boundary Wall", to: "/services/boundary-walls" },
  { label: "Staircase Railing", to: "/services/staircase-railing" },
  { label: "Roofing Shed", to: "/services/roofing-sheds" },
  { label: "Rolling Shutter", to: "/services/rolling-shutters" },
  { label: "Iron Grill", to: "/services/window-grills" },
  { label: "Custom Fabrication", to: "/services/custom-fabrication" },
];

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Pankti Engineering Logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="font-extrabold text-white leading-none">Pankti Engineering</div>
                <div className="text-orange-500 text-xs tracking-widest uppercase">Since 2016</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Valsad's most trusted iron & MS fabrication workshop. Quality work, honest pricing.
            </p>

            {/* Google Rating in footer */}
            <a
              href={GOOGLE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-5 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-orange-500/40 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <div className="text-white text-xs font-semibold">⭐ {GOOGLE.rating.toFixed(1)} / 5 on Google</div>
                <div className="text-gray-400 text-xs">{GOOGLE.reviewCount} reviews · View on Maps</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-500 ml-1" />
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold mb-5 text-orange-500 uppercase tracking-widest">Services</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {footerServices.map(s => (
                <li key={s.label}>
                  <Link to={s.to} className="hover:text-orange-400 transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-5 text-orange-500 uppercase tracking-widest">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Dhamdachi, Valsad,<br />Gujarat {BUSINESS.postalCode}, India</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href={`tel:${BUSINESS.phoneTel}`} className="hover:text-orange-400 transition-colors">{BUSINESS.phoneDisplay}</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>{BUSINESS.hours}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MessageCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Chat on WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-sm font-bold mb-5 text-orange-500 uppercase tracking-widest">Location</h3>
            <div className="h-48 w-full rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.2781129259984!2d72.9488511744523!3d20.617517780930925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0c3abbb881df7%3A0x91c65f85ba6d70f3!2sPankti%20engineering!5e0!3m2!1sen!2sin!4v1746965202776!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Pankti Engineering. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
