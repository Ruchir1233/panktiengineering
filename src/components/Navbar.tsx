import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Pankti Engineering Logo" className="w-10 h-10 object-contain" />
            <div>
              <span className="text-xl font-extrabold text-gray-900 leading-none block">Pankti Engineering</span>
              <span className="text-xs text-orange-500 font-semibold tracking-widest uppercase">Since 2016</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Home</Link>
            <Link to="/#services" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Services</Link>
            <Link to="/about" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">About Us</Link>
            <Link to="/contact" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Contact</Link>
            <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl px-5">
              <Phone className="w-4 h-4 mr-2" />
              +91 98795-23937
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 font-medium py-2">Home</Link>
            <Link to="/#services" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 font-medium py-2">Services</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 font-medium py-2">About Us</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 font-medium py-2">Contact</Link>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl">
              <Phone className="w-4 h-4 mr-2" />
              +91 98795-23937
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
