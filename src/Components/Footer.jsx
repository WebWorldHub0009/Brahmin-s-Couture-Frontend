import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaSearchLocation,
} from "react-icons/fa";
import { FaPinterestP, FaXTwitter } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import VisitorCounter from "./VisitorCounter";
import Translator from "./Translator";
import logo from "../assets/images/logo.png";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Footer() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [inView, controls]);

  return (
    <motion.footer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="bg-[#f9f9f9] text-gray-800 px-6 md:px-16 pt-20 pb-10 relative overflow-hidden"
    >
      {/* Glowing Accents */}
      <div className="absolute -top-20 left-[-100px] w-[300px] h-[300px] bg-pink-200 blur-[130px] opacity-20 rounded-full -z-10" />
      <div className="absolute -bottom-20 right-[-100px] w-[300px] h-[300px] bg-pink-200 blur-[150px] opacity-20 rounded-full -z-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm z-10 relative">
        {/* About */}
        <div className="flex flex-col space-y-3">
          <img src={logo} alt="Brahmani Couture Logo" className="w-[80px] md:w-[120px]" />
          <h4 className="text-gray-900 font-semibold mb-2">About Brahmani&nbsp;Couture</h4>
          <p className="leading-relaxed">
            Brahmani Couture weaves heritage craftsmanship with modern aesthetics.
            Explore handcrafted sarees, bespoke ethnic wear, and exquisite accessories
            — designed to drape you in timeless elegance.
          </p>
          <div className="mt-4">
            <a
              href="https://mail.brahmanicouture.com/webmail"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 border border-pink-500 text-pink-600 rounded hover:bg-pink-500 hover:text-white transition duration-300 text-sm font-medium"
            >
              Web Mail
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              ["Home", "/"],
              ["Customised Sarees", "/customised-sarees"],
              ["Handloom Sarees", "/handloom-saree"],
              ["Pattu Sarees", "/pattu-saree"],
              ["Contact Us", "/contact"],
              ["About", "/about"],
              ["Terms and Conditions", "/tnc"],
              ["Cancellation and Refund", "/refund"],
              ["Privacy Policy", "/privacy"],
              ["Shipping Delivery", "/shipping"],
              ["Privacy Policy", "/privacy"],
            ].map(([text, link], i) => (
              <li key={i}>
                <Link to={link} className="hover:text-pink-500 transition duration-300">
                  {text}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="mt-6 text-gray-900 font-semibold">Emails</h4>
          <ul className="mt-2 space-y-2">
            {["Info@brahmanicouture.com"].map((email, i) => (
              <li key={i}>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center space-x-2 hover:text-pink-500 transition duration-300"
                >
                  <FaEnvelope className="text-pink-500" />
                  <span>{email}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Trending Collections */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Trending Collections</h4>
          <ul className="space-y-2">
            {[
              "Kanchipuram Pattu",
              "Banarasi Silk",
              "Chanderi Cotton",
              "Paithani Weaves",
              "Kalamkari Prints",
              "Ikat Elegance",
              "Patola Splendor",
              "Organza Drapes",
              "Tussar Classics",
            ].map((saree, i) => (
              <li key={i}>
                <Link to="/trending" className="hover:text-pink-500 transition duration-300">
                  {saree}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Address & Socials */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Our Address</h4>
          <address className="not-italic leading-relaxed mb-4">
            Shop&nbsp;No.&nbsp;1/2, Ground&nbsp;Floor Sri, CCMB Colony<br />
            Sai Nagar Colony, Boduppal<br />
            Hyderabad, Secunderabad,<br />
            Telangana&nbsp;500092
          </address>

          <div className="flex items-center gap-4 mb-4">
            <div><Translator /></div>
          </div>

          <div className="mt-6 flex space-x-4">
            <a href="https://x.com/brahmanicouture" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition"><FaXTwitter size={20} /></a>
            <a href="https://in.pinterest.com/Brahmanidesignerboutique/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition"><FaPinterestP size={20} /></a>
            <a href="https://www.linkedin.com/in/brahmaniscouture/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition"><FaLinkedinIn size={20} /></a>
            <a href="https://www.youtube.com/@brahmanicouture2023" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition"><FaYoutube size={20} /></a>
            <a href="https://www.instagram.com/brahmani_couture/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition"><FaInstagram size={20} /></a>
            <a href="https://www.facebook.com/sirifashionn/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition"><FaFacebookF size={20} /></a>
            <a href="https://g.co/kgs/r2fkBAb" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition"><FaSearchLocation size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-300 pt-6 space-y-2 relative z-10">
        <VisitorCounter />
        <p>© {new Date().getFullYear()} Brahmani Couture. All rights reserved.</p>
        <p>
          Designed &amp; Developed by{" "}
          <a
            href="https://webworldhub.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-pink-500 hover:text-pink-400 transition"
          >
            Web World Hub
          </a>
        </p>
      </div>
    </motion.footer>
  );
}
