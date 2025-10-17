import { Link } from "react-router-dom";
import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="h-8 w-8 text-golden" />
              <div className="flex flex-col">
                <span className="text-golden font-playfair font-bold text-xl">
                  Advocate
                </span>
                <span className="text-white font-playfair text-sm -mt-1">
                  Raj Kumar Sha
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Expert Legal Solutions with Trust & Integrity. Specializing in Criminal Cases, Civil Matters, Family Disputes, and DRT/LRT.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-golden font-playfair font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-golden transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/book-appointment"
                  className="text-gray-300 hover:text-golden transition-colors text-sm"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-golden transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-golden font-playfair font-semibold text-lg mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-golden mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  8, Mochi Mahal, Sadar Bazar<br />
                  Barrackpore, Kolkata – 700120
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-golden mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <a
                    href="tel:8013763607"
                    className="block text-gray-300 hover:text-golden transition-colors text-sm"
                  >
                    8013763607
                  </a>
                  <a
                    href="tel:9143175368"
                    className="block text-gray-300 hover:text-golden transition-colors text-sm"
                  >
                    9143175368
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-golden flex-shrink-0" />
                <a
                  href="mailto:advocaterajkumarsha@gmail.com"
                  className="text-gray-300 hover:text-golden transition-colors text-sm break-all"
                >
                  advocaterajkumarsha@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-300 hover:text-golden transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-golden transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-golden transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-golden transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-golden/20 mt-8 pt-8">
          <p className="text-gray-400 text-sm text-center mb-2">
            © {new Date().getFullYear()} Advocate Raj Kumar Sha. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs text-center">
            Powered by{" "}
            <a
              href="https://www.royal300.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-golden hover:text-amber-500 transition-colors font-semibold"
            >
              ROYAL300
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
