import { Link } from "react-router-dom";
import lsppLogo from "../assets/lsppLogo.webp";
import { scrollToSection } from "../utils/scroll";

function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-hero-bg px-8 py-8 text-center text-text">
      <div className="absolute -left-20 -top-20 z-[1] h-[350px] w-[350px] rounded-full bg-primary opacity-50 blur-[60px]" />
      <div className="absolute -right-16 -bottom-24 z-[1] h-[300px] w-[300px] rounded-full bg-accent opacity-50 blur-[60px]" />

      <div className="relative z-[2]">
        <img
          src={lsppLogo}
          alt="LSPP"
          className="mx-auto mb-6 h-[50px] mix-blend-multiply"
        />

        <h1 className="mb-4 text-5xl text-primary">Learn, Lead and Grow</h1>
        <p className="mx-auto mb-8 max-w-[600px] text-lg text-text-muted">
          Build new skills, grow your network, and shape a career path that
          excites you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/#perks"
            className="rounded-card bg-accent px-7 py-3 font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            onClick={() => scrollToSection("perks")}
          >
            Explore Perks
          </Link>
          <Link
            to="/#faq"
            className="rounded-card border border-primary bg-card-bg px-7 py-3 font-semibold text-primary transition-transform duration-200 hover:-translate-y-0.5"
            onClick={() => scrollToSection("faq")}
          >
            Read FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
