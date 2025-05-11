
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            Pankti Engineering
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
            <Link to="/#services" className="text-gray-600 hover:text-primary transition-colors">Services</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Phone className="w-4 h-4 mr-2" />
              +91 98795-23937  
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
