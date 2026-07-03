import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setBlogOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">About Us</Link>

            {/* Blog dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setBlogOpen(!blogOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-orange-500 font-medium transition-colors"
              >
                Blog & FAQ <ChevronDown className={`w-4 h-4 transition-transform ${blogOpen ? "rotate-180" : ""}`} />
              </button>
              {blogOpen && (
                <div className="absolute top-8 left-0 bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-72 z-50">
                  <div className="px-3 py-1.5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Blog Posts</p>
                  </div>
                  <Link
                    to="/blog/iron-gate-design-ideas-valsad-vapi"
                    onClick={() => setBlogOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    🚪 Iron Gate Design Ideas — Valsad & Vapi
                  </Link>
                  <Link
                    to="/blog/roofing-shed-cost-gujarat-2025"
                    onClick={() => setBlogOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    🏠 Roofing Shed Cost in Gujarat 2025
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1 px-3 py-1.5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Service Pages</p>
                  </div>
                  <Link
                    to="/services/iron-gates"
                    onClick={() => setBlogOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Iron Gates — Valsad & Vapi
                  </Link>
                  <Link
                    to="/services/window-grills"
                    onClick={() => setBlogOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Window Grills — Valsad & Vapi
                  </Link>
                  <Link
                    to="/services/roofing-sheds"
                    onClick={() => setBlogOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Roofing Sheds — Valsad & Vapi
                  </Link>
                  <Link
                    to="/services/rolling-shutters"
                    onClick={() => setBlogOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    Rolling Shutters — Valsad & Vapi
                  </Link>
                  <Link
                    to="/fabrication-in-vapi"
                    onClick={() => setBlogOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    🔍 Fabrication in Vapi
                  </Link>
                </div>
              )}
            </div>

            <Link to="/contact" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Contact</Link>
            <a href="tel:+919879523937">
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl px-5">
                <Phone className="w-4 h-4 mr-2" />
                98795-23937
              </Button>
            </a>
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
          <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-gray-100 pt-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 font-medium py-2">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 font-medium py-2">About Us</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 font-medium py-2">Contact</Link>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest py-2">Blog Posts</p>
              <Link to="/blog/iron-gate-design-ideas-valsad-vapi" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500 text-sm py-2 pl-2">🚪 Iron Gate Design Ideas</Link>
              <Link to="/blog/roofing-shed-cost-gujarat-2025" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500 text-sm py-2 pl-2">🏠 Roofing Shed Cost Gujarat</Link>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest py-2">Services</p>
              <Link to="/services/iron-gates" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500 text-sm py-2 pl-2">Iron Gates</Link>
              <Link to="/services/window-grills" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500 text-sm py-2 pl-2">Window Grills</Link>
              <Link to="/services/roofing-sheds" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500 text-sm py-2 pl-2">Roofing Sheds</Link>
              <Link to="/services/rolling-shutters" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500 text-sm py-2 pl-2">Rolling Shutters</Link>
              <Link to="/fabrication-in-vapi" onClick={() => setMenuOpen(false)} className="block text-orange-500 font-medium text-sm py-2 pl-2">🔍 Fabrication in Vapi</Link>
            </div>

            <div className="pt-2">
              <a href="tel:+919879523937">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-xl">
                  <Phone className="w-4 h-4 mr-2" />
                  98795-23937
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
