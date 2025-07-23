import { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { House, MoonStar, ShoppingBag, SunMedium, LogOut } from "lucide-react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function Nav() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 w-full py-4 px-4 sm:px-8 lg:px-12 shadow-md z-10 ${
          darkMode
            ? "bg-gradient-to-b from-gray-100 to-white text-gray-800"
            : "bg-gradient-to-b from-black/90 to-black/95 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-light uppercase tracking-wider hover:text-gray-300 transition-colors"
          >
            Alma Literária
          </Link>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700  transition-colors cursor-pointer"
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
            </button>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-sm font-light uppercase hover:text-gray-300 transition-colors cursor-pointer"
              aria-label="Ver Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              Carrinho
            </Link>
            <Link
              to="/home"
              className="flex items-center gap-2 text-sm font-light uppercase hover:text-gray-300 transition-colors cursor-pointer"
              aria-label="Início"
            >
              <House className="w-5 h-5" />
              Início
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-light uppercase hover:text-gray-300 transition-colors cursor-pointer"
              aria-label="Sair da conta"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}