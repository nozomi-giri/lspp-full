import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import leapfrogLogo from "../assets/leapfrogLogo.webp";
import { NAV_LINKS } from "../constants";
import { scrollToSection } from "../utils/scroll";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card-bg px-8 py-4">
      <div className="flex items-center">
        <img
          src={leapfrogLogo}
          alt="Leapfrog Technology"
          className="h-7 mix-blend-multiply"
        />
      </div>
      <ul className="flex gap-8 font-medium">
        {NAV_LINKS.map((link) => (
          <li key={link.sectionId}>
            <Link
              to={`/#${link.sectionId}`}
              className="cursor-pointer transition-colors duration-200 hover:text-accent"
              onClick={() => scrollToSection(link.sectionId)}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/admin"
            className="cursor-pointer transition-colors duration-200 hover:text-accent"
          >
            Admin
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
