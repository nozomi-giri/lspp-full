import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
    </button>
  );
}

export default ThemeToggle;
