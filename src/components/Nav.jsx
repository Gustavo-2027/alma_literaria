import { Link } from "react-router-dom";
import { MoonStar, ShoppingBag, SunMedium } from "lucide-react";
import useDarkModeContext from "../hooks/useDarkModeContext";

export default function Nav() {
  const { darkMode, setDarkMode } = useDarkModeContext();

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 w-full  py-4 px-4 sm:px-8 lg:px-12 shadow-md z-10 ${
          darkMode
            ? "bg-gradient-to-b from-gray-100 to-white text-gray-800"
            : "bg-black text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-light uppercase tracking-wider">
            Alma Literária
          </Link>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="cursor-pointer"
            >
              {darkMode ? <SunMedium size={15} /> : <MoonStar size={15} />}
            </button>
            <Link
              to="/"
              className="text-sm font-light uppercase hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-sm font-light uppercase hover:text-gray-300 transition-colors"
              aria-label="Ver Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              Carrinho
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
