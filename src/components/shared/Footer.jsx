import Link from "next/link";
import { FaBookOpen, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="section-container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold mb-3">
            <FaBookOpen className="text-primary" />
            <span>
              Digital<span className="text-primary">Lessons</span>
            </span>
          </Link>
          <p className="text-sm opacity-80">
            Preserve your wisdom. Reflect mindfully. Grow together.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Contact</h3>
          <p className="text-sm opacity-80">support@digitallifelessons.com</p>
          <p className="text-sm opacity-80">+8801780500020</p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Legal</h3>
          <Link href="/terms" className="text-sm opacity-80 hover:text-primary block">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-sm opacity-80 hover:text-primary block mt-1">
            Privacy Policy
          </Link>
        </div>

        <div>
          <h3 className="font-bold mb-3">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-primary">
              <FaFacebook />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-secondary">
              <FaXTwitter />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-accent">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-primary">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-content/10 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Digital Life Lessons. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;