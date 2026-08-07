import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Perks from "../components/Perks";
import GoToTop from "../components/GoToTop";
import YourRole from "../components/YourRole";
import Gallery from "../components/Gallery";
import Mentors from "../components/Mentors";
import Resources from "../components/Resources";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Perks />
      <GoToTop />
      <YourRole />
      <Gallery />
      <Mentors />
      <Resources />
      <Faq />
      <Footer />
    </div>
  );
}

export default Home;
