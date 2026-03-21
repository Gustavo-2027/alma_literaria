import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  House,
  LogOut,
  Menu,
  MoonStar,
  ShoppingBag,
  SunMedium,
  X,
} from "lucide-react";

import { logout } from "../../redux/slices/authSlice";
import useDarkModeContext from "../../hooks/useDarkModeContext";
import { useToast } from "../../context/ToastContext";

function Nav() {
  const { darkMode, setDarkMode } = useDarkModeContext();
  const { showToast } = useToast();

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const totalItems =
    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  const handleLogout = useCallback(() => {
    closeMenu();

    if (user) {
      dispatch(logout());

      showToast({
        title: "Sessão encerrada",
        description: "Você saiu da sua conta.",
        actionLabel: "Entrar novamente",
        actionTo: "/",
        duration: 2800,
      });
    }

    navigate("/");
  }, [closeMenu, dispatch, navigate, showToast, user]);

  const handleCart = useCallback(() => {
    closeMenu();

    if (!user) {
      showToast({
        title: "Login necessário",
        description: "Crie uma conta ou entre para acessar o carrinho.",
        actionLabel: "Entrar",
        actionTo: "/",
        duration: 3200,
      });
      return;
    }

    navigate("/cart");
  }, [closeMenu, navigate, showToast, user]);

  const handleGoHome = useCallback(() => {
    closeMenu();
    navigate("/home");
  }, [closeMenu, navigate]);

  const theme = useMemo(() => {
    return {
      nav: darkMode
        ? "border-zinc-800 bg-black/95 text-white"
        : "border-zinc-200 bg-white/95 text-black",
      brand: darkMode ? "text-white" : "text-black",
      iconButton: darkMode
        ? "text-white hover:bg-zinc-900 focus-visible:ring-white/60"
        : "text-black hover:bg-zinc-100 focus-visible:ring-black/40",
      actionButton: darkMode
        ? "text-white hover:bg-zinc-900 focus-visible:ring-white/60"
        : "text-black hover:bg-zinc-100 focus-visible:ring-black/40",
      secondaryText: darkMode
        ? "text-zinc-400 hover:text-white"
        : "text-zinc-500 hover:text-black",
      mobileBorder: darkMode ? "border-zinc-800" : "border-zinc-200",
      badge: darkMode ? "bg-white text-black" : "bg-black text-white",
      overlay: darkMode ? "bg-black/40" : "bg-black/20",
    };
  }, [darkMode]);

  const baseDesktopButton =
    "inline-flex min-h-[44px] items-center justify-center gap-2 px-4 text-[11px] uppercase tracking-[0.22em] transition duration-300 focus:outline-none focus-visible:ring-2";
  const baseIconButton =
    "flex h-11 w-11 items-center justify-center transition duration-300 focus:outline-none focus-visible:ring-2";
  const baseMobileButton =
    "flex min-h-[48px] items-center gap-3 px-2 text-[11px] uppercase tracking-[0.22em] transition duration-300 focus:outline-none focus-visible:ring-2";

  return (
    <header>
      <nav
        className={`fixed left-0 top-0 z-50 w-full border-b px-4 py-5 backdrop-blur-md sm:px-8 lg:px-12 ${theme.nav}`}
        aria-label="Navegação principal"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            to="/home"
            onClick={closeMenu}
            className={`text-xl font-light uppercase tracking-[0.24em] transition hover:opacity-70 sm:text-2xl ${theme.brand}`}
          >
            Alma Literária
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`sm:hidden ${baseIconButton} ${theme.iconButton}`}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className={`${baseIconButton} ${theme.iconButton}`}
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
            </button>

            <button
              type="button"
              onClick={handleCart}
              className={`relative ${baseDesktopButton} ${theme.actionButton}`}
              aria-label={`Ver carrinho com ${totalItems} itens`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Carrinho</span>

              {totalItems > 0 && user ? (
                <span
                  className={`absolute -right-1 top-0 flex h-5 min-w-5 items-center justify-center px-1 text-[10px] font-medium ${theme.badge}`}
                >
                  {totalItems}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={handleGoHome}
              className={`${baseDesktopButton} ${theme.actionButton}`}
            >
              <House className="h-4 w-4" />
              <span>Início</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className={`${baseDesktopButton} ${theme.actionButton}`}
            >
              <LogOut className="h-4 w-4" />
              <span>{user ? "Sair" : "Entrar"}</span>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <>
            <div
              className={`fixed inset-0 top-[72px] z-[-1] sm:hidden ${theme.overlay}`}
              onClick={closeMenu}
              aria-hidden="true"
            />

            <div
              id="mobile-navigation"
              className={`overflow-hidden border-t pt-4 sm:hidden ${theme.mobileBorder}`}
            >
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`${baseMobileButton} ${theme.actionButton}`}
                >
                  {darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
                  <span>{darkMode ? "Modo Claro" : "Modo Escuro"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCart}
                  className={`relative ${baseMobileButton} ${theme.actionButton}`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Carrinho</span>

                  {totalItems > 0 && user ? (
                    <span
                      className={`ml-auto flex h-5 min-w-5 items-center justify-center px-1 text-[10px] font-medium ${theme.badge}`}
                    >
                      {totalItems}
                    </span>
                  ) : null}
                </button>

                <button
                  type="button"
                  onClick={handleGoHome}
                  className={`${baseMobileButton} ${theme.actionButton}`}
                >
                  <House className="h-4 w-4" />
                  <span>Início</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${baseMobileButton} ${theme.actionButton}`}
                >
                  <LogOut className="h-4 w-4" />
                  <span>{user ? "Sair" : "Entrar"}</span>
                </button>
              </div>
            </div>
          </>
        ) : null}
      </nav>
    </header>
  );
}

export default React.memo(Nav);