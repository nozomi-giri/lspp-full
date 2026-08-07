import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import { GO_TO_TOP_SCROLL_THRESHOLD } from "../constants";
import { scrollToTop } from "../utils/scroll";

function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > GO_TO_TOP_SCROLL_THRESHOLD);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      className="fixed bottom-8 right-8 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-opacity duration-200 hover:opacity-85"
      onClick={scrollToTop}
      aria-label="Go to top"
    >
      <FiArrowUp size={20} />
    </button>
  );
}

export default GoToTop;
