import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "../../assets/footerlogo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 px-4 md:px-10 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Tagline */}
        <div>
          <img src={logo} alt="Bloodline Logo" className="h-14 mb-3 w-auto" />
          <p className="text-sm text-gray-600">
            Bloodline – your digital bridge between blood donors and those in need.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-red-500">Home</Link></li>
            <li><Link to="/search" className="hover:text-red-500">Find Donor</Link></li>
            <li><Link to="/donation-request" className="hover:text-red-500">Donation Request</Link></li>
            <li><Link to="/blog" className="hover:text-red-500">Blog</Link></li>
            <li><Link to="/register" className="hover:text-red-500">Join as Donor</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm">
            <FaPhoneAlt className="text-red-500" /> +8801234567890
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MdEmail className="text-red-500" /> bloodline.help@gmail.com
          </p>
          <p className="text-sm text-gray-600 mt-2">Chattogram, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm mt-10 border-t border-gray-300 pt-4 text-gray-500">
        &copy; {new Date().getFullYear()} <span className="text-red-500 font-semibold">Bloodline</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
