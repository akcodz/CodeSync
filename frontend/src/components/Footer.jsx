import React from "react";
import { Link } from "react-router-dom";
import { RiGithubFill, RiLinkedinFill, RiMailLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-[#121212] border-t border-zinc-800 text-zinc-400">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* BRAND */}
          <div>
            <h2 className="text-lg font-semibold text-zinc-100 mb-2">
              CodeSync
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Real-time collaborative coding platform with AI assistance,
              built for developers to code, learn, and grow together.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-sm font-medium text-zinc-300 mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/projects" className="hover:text-zinc-200 transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/problems" className="hover:text-zinc-200 transition">
                  Practice
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-zinc-200 transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL / CONTACT */}
          <div>
            <h3 className="text-sm font-medium text-zinc-300 mb-3">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="hover:text-zinc-200 transition"
                title="GitHub"
              >
                <RiGithubFill size={18} />
              </a>
              <a
                href="#"
                className="hover:text-zinc-200 transition"
                title="LinkedIn"
              >
                <RiLinkedinFill size={18} />
              </a>
              <a
                href="mailto:youremail@example.com"
                className="hover:text-zinc-200 transition"
                title="Email"
              >
                <RiMailLine size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 border-t border-zinc-800 pt-4">
          <span>© {new Date().getFullYear()} CodeSync. All rights reserved.</span>
          <span className="mt-2 md:mt-0">
            Built with ❤️ for developers
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;