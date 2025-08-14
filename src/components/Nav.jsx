import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import {
  House,
  MoonStar,
  ShoppingBag,
  SunMedium,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { DarkModeContext } from "../context/DarkModeContext";

function Nav() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const totalItems = cartItems
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  function handleLogout() {
    if (user) {
      dispatch(logout());
      navigate("/");
      return;
    }
    navigate("/");
  }

  function handleCart() {
    if (!user) {
      alert("Crie uma conta para poder acessar o carrinho");
      return;
    }
    navigate("/cart");
  }

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
          {/* Logo */}
          <Link
            to="/home"
            className="text-2xl font-light uppercase tracking-wider hover:text-gray-300 transition-colors"
          >
            Alma Literária
          </Link>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menu Desktop */}
          <div className="hidden sm:flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
            </button>

            <button
              onClick={handleCart}
              className="flex items-center gap-2 text-sm font-light uppercase hover:text-gray-300 transition-colors relative"
              aria-label={`Ver Carrinho (${totalItems} itens)`}
            >
              {totalItems > 0 && user && (
                <span
                  className={`absolute -top-2 -right-4 flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium ${
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {totalItems}
                </span>
              )}
              <ShoppingBag className="w-5 h-5" />
              Carrinho
            </button>

            <Link
              to="/home"
              className="flex items-center gap-2 text-sm font-light uppercase hover:text-gray-300 transition-colors"
            >
              <House className="w-5 h-5" />
              Início
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-light uppercase hover:text-gray-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {user ? "Sair" : "Entrar"}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <div className="sm:hidden mt-4 flex flex-col gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
              {darkMode ? "Modo Claro" : "Modo Escuro"}
            </button>

            <button
              onClick={handleCart}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              Carrinho
              {totalItems > 0 && user && (
                <span
                  className={`absolute right-3 flex items-center justify-center w-5 h-5 rounded-full text-xs font-medium ${
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              to="/home"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <House className="w-5 h-5" />
              Início
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5" />
              {user ? "Sair" : "Entrar"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default React.memo(Nav);
