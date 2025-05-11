
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#222222] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-500">CONTACT US</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                <p>Dhamdachi, Valsad,<br />Gujarat 396001 India</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <p>+91 9897523937</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Opening Hours</p>
                <p>Mon – Sat 10:00AM to 6:00PM</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-500">SERVICES</h3>
            <ul className="space-y-3">
              <li>Iron Gate</li>
              <li>Boundary Wall</li>
              <li>Staircase Railing</li>
              <li>Roofing Shed</li>
              <li>Rolling Shutter</li>
              <li>Iron Grill</li>
              <li>Custom Fabrication</li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-500">LOCATION</h3>
            <div className="h-64 w-full rounded-lg overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.2781129259984!2d72.9488511744523!3d20.617517780930925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0c3abbb881df7%3A0x91c65f85ba6d70f3!2sPankti%20engineering!5e0!3m2!1sen!2sin!4v1746965202776!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-gray-400">© 2024 Pankti Engineering</p>
            <div className="flex gap-4">
              <Facebook className="w-6 h-6 text-orange-500 hover:text-orange-400 cursor-pointer" />
              <Instagram className="w-6 h-6 text-orange-500 hover:text-orange-400 cursor-pointer" />
              <Linkedin className="w-6 h-6 text-orange-500 hover:text-orange-400 cursor-pointer" />
              <Twitter className="w-6 h-6 text-orange-500 hover:text-orange-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
