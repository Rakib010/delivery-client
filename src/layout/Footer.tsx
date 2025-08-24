import { Facebook, Twitter, Instagram, Linkedin } from "react-feather";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white py-8 px-4">
      <div className="container mx-auto text-center">
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <Link
            to="/"
            className="text-stone-400 hover:text-white transition"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </Link>
          <Link
            to="/"
            className="text-stone-400 hover:text-white transition"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </Link>
          <Link
            to="/"
            className="text-stone-400 hover:text-white transition"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </Link>
          <Link
            to="/"
            className="text-stone-400 hover:text-white transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </Link>
        </div>

        {/* Policy Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <Link
            to="/"
            className="text-stone-400 hover:text-white transition text-sm"
          >
            Privacy Policy
          </Link>
          <Link
            to="/"
            className="text-stone-400 hover:text-white transition text-sm"
          >
            Terms of Service
          </Link>
          <Link
            to="/"
            className="text-stone-400 hover:text-white transition text-sm"
          >
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-stone-400 text-sm">
          © {new Date().getFullYear()} Parcel Delivery Service
        </p>
      </div>
    </footer>
  );
}
