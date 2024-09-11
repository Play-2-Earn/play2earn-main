<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-400 to-blue-600 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4">Play2Earn.ai</h4>
            <p className="text-sm md:text-base">
              Empowering individuals to earn through AI-powered gaming.
            </p>
          </div>
          <div>
            <h5 className="text-lg md:text-xl font-semibold mb-4">
              Quick Links
            </h5>
            <ul className="text-sm md:text-base">
              <li>
                <Link to="/about" className="hover:text-blue-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help-and-support" className="hover:text-blue-200">
                  Help and Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg md:text-xl font-semibold mb-4">
              Connect With Us
            </h5>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-200">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <FaInstagram size={24} />
              </a>
              <a
                href="https://github.com/Play-2-Earn"
                className="hover:text-blue-200"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-400 text-center text-sm md:text-base">
          <p>&copy; 2024 Play2Earn.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
=======
import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-400 to-blue-600 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4">Play2Earn.ai</h4>
            <p className="text-sm md:text-base">
              Empowering individuals to earn through AI-powered gaming.
            </p>
          </div>
          <div>
            <h5 className="text-lg md:text-xl font-semibold mb-4">
              Quick Links
            </h5>
            <ul className="text-sm md:text-base">
              <li>
                <Link to="/about" className="hover:text-blue-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help-and-support" className="hover:text-blue-200">
                  Help and Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg md:text-xl font-semibold mb-4">
              Connect With Us
            </h5>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-200">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <FaInstagram size={24} />
              </a>
              <a
                href="https://github.com/Play-2-Earn"
                className="hover:text-blue-200"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-400 text-center text-sm md:text-base">
          <p>&copy; 2024 Play2Earn.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
>>>>>>> 1270daa (cv + recent  games integration)
