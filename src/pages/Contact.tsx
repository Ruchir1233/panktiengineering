
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-orange-500 mb-12 text-center">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Address</h3>
                  <p>Dhamdachi Valsad,<br />Gujarat 396001 India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <p>+91 98795-23937</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p>rohit4860@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
                  <p>Monday - Saturday<br />10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
            <div className="h-96">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.2781129259984!2d72.9488511744523!3d20.617517780930925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0c3abbb881df7%3A0x91c65f85ba6d70f3!2sPankti%20engineering!5e0!3m2!1sen!2sin!4v1746965202776!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
