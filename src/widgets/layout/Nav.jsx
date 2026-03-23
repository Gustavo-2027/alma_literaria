import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  House,
  LogOut,
  LogIn,
  Menu,
  MoonStar,
  ShoppingBag,
  SunMedium,
  X,
  Library,
} from "lucide-react";
import { clearAuth } from "../../features/auth/model/authSlice";
import { signOutUser } from "../../features/auth/api/authService";
import useTheme from "../../features/theme/model/useTheme";
import { useToast } from "../../features/toast/model/ToastContext";
import Reveal from "../../shared/ui/Reveal";

function Nav() {
  const { darkMode, setDarkMode } = useTheme();
  const { showToast } = useToast();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  const handleGoLogin = useCallback(() => {
    closeMenu();
    navigate("/");
  }, [closeMenu, navigate]);

  const handleLogout = useCallback(async () => {
    closeMenu();

    if (!user) {
      navigate("/");
      return;
    }

    const { error } = await signOutUser();

    if (error) {
      showToast({
        title: "Erro ao sair",
        description: error.message,
        duration: 3000,
      });
      return;
    }

    dispatch(clearAuth());

    showToast({
      title: "Sessão encerrada",
      description: "Você saiu da sua conta.",
      duration: 2500,
    });

    navigate("/");
  }, [closeMenu, dispatch, navigate, showToast, user]);

  const handleAuthAction = useCallback(() => {
    if (user) {
      handleLogout();
      return;
    }

    handleGoLogin();
  }, [handleGoLogin, handleLogout, user]);

  const handleGoCatalog = useCallback(() => {
    closeMenu();
    navigate("/catalogo");
  }, [closeMenu, navigate]);

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

  const isActive = useCallback(
    (path) => location.pathname.startsWith(path),
    [location.pathname]
  );

  const theme = useMemo(() => {
    const lightScrolled =
      "border-zinc-200/80 bg-white/82 text-black shadow-[0_10px_30px_rgba(0,0,0,0.04)]";
    const lightTop = "border-zinc-200/50 bg-white/68 text-black";
    const darkScrolled =
      "border-zinc-800/80 bg-black/82 text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)]";
    const darkTop = "border-zinc-900/70 bg-black/60 text-white";

    return {
      nav: darkMode
        ? scrolled
          ? darkScrolled
          : darkTop
        : scrolled
        ? lightScrolled
        : lightTop,

      brand: darkMode ? "text-white" : "text-black",

      navLink: darkMode
        ? "text-zinc-400 hover:text-white"
        : "text-zinc-500 hover:text-black",

      navLinkActive: darkMode ? "text-white" : "text-black",

      iconButton: darkMode
        ? "text-zinc-300 hover:text-white hover:bg-white/6 focus-visible:ring-white/40"
        : "text-zinc-600 hover:text-black hover:bg-black/5 focus-visible:ring-black/20",

      primaryAction: darkMode
        ? "border-white/12 text-white hover:bg-white hover:text-black focus-visible:ring-white/40"
        : "border-black/10 text-black hover:bg-black hover:text-white focus-visible:ring-black/20",

      mobilePanel: darkMode
        ? "border-zinc-800 bg-black/96 text-white"
        : "border-zinc-200 bg-white/96 text-black",

      mobileItem: darkMode
        ? "text-zinc-300 hover:bg-white/5 hover:text-white"
        : "text-zinc-600 hover:bg-black/5 hover:text-black",

      mobileItemActive: darkMode
        ? "bg-white/6 text-white"
        : "bg-black/5 text-black",

      badge: darkMode ? "bg-white text-black" : "bg-black text-white",

      overlay: "bg-black/28",

      divider: darkMode ? "bg-zinc-800" : "bg-zinc-200",
    };
  }, [darkMode, scrolled]);

  const baseIconButton =
    "inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2";

  const baseDesktopLink =
    "group relative inline-flex min-h-[44px] items-center justify-center px-3 text-[11px] uppercase tracking-[0.26em] transition-all duration-300";

  const basePrimaryAction =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-5 text-[11px] uppercase tracking-[0.24em] transition-all duration-300 focus:outline-none focus-visible:ring-2";

  const baseMobileButton =
    "flex min-h-[52px] w-full items-center gap-3 rounded-2xl px-4 text-[11px] uppercase tracking-[0.24em] transition-all duration-300 focus:outline-none focus-visible:ring-2";

  const desktopLinks = [
    { label: "Início", path: "/home", onClick: handleGoHome },
    { label: "Catálogo", path: "/catalogo", onClick: handleGoCatalog },
  ];

  return (
    <header>
      <Reveal
        as="nav"
        preset="soft-down"
        duration={900}
        distance={14}
        threshold={0}
        initialVisible
        className={`fixed left-0 top-0 z-50 w-full border-b px-4 backdrop-blur-xl transition-all duration-500 sm:px-8 lg:px-12 ${
          scrolled ? "py-3" : "py-4"
        } ${theme.nav}`}
        aria-label="Navegação principal"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Reveal
            as="div"
            preset="fade"
            duration={700}
            delay={40}
            threshold={0}
            initialVisible
          >
            <Link
              to="/home"
              onClick={closeMenu}
              className={`shrink-0 text-[0.98rem] font-light uppercase tracking-[0.34em] transition duration-500 hover:opacity-70 sm:text-[1.08rem] ${
                scrolled ? "scale-[0.985]" : "scale-100"
              } ${theme.brand}`}
              aria-label="Ir para a página inicial da Alma Literária"
            >
              Alma Literária
            </Link>
          </Reveal>

          <Reveal
            as="div"
            preset="fade"
            duration={800}
            delay={80}
            threshold={0}
            initialVisible
            className="hidden items-center gap-2 md:flex"
          >
            <div className="flex items-center gap-1">
              {desktopLinks.map((item) => {
                const active = isActive(item.path);

                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={item.onClick}
                    className={`${baseDesktopLink} ${
                      active ? theme.navLinkActive : theme.navLink
                    }`}
                  >
                    <span>{item.label}</span>

                    <span
                      className={`absolute bottom-[7px] left-1/2 h-px -translate-x-1/2 transition-all duration-300 ${
                        active
                          ? `w-8 ${darkMode ? "bg-white" : "bg-black"}`
                          : `w-0 ${
                              darkMode ? "bg-white" : "bg-black"
                            } group-hover:w-6 opacity-60`
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className={`mx-2 h-5 w-px ${theme.divider}`} />

            <button
              type="button"
              onClick={toggleTheme}
              className={`${baseIconButton} ${theme.iconButton}`}
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {darkMode ? <SunMedium size={17} /> : <MoonStar size={17} />}
            </button>

            <button
              type="button"
              onClick={handleCart}
              className={`relative ${baseIconButton} ${theme.iconButton}`}
              aria-label={`Ver carrinho com ${totalItems} itens`}
            >
              <ShoppingBag size={17} />

              {totalItems > 0 && user ? (
                <span
                  className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-medium ${theme.badge}`}
                >
                  {totalItems}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={handleAuthAction}
              className={`${basePrimaryAction} ${theme.primaryAction}`}
            >
              {user ? <LogOut size={15} /> : <LogIn size={15} />}
              <span>{user ? "Sair" : "Entrar"}</span>
            </button>
          </Reveal>

          <Reveal
            as="div"
            preset="fade"
            duration={750}
            delay={80}
            threshold={0}
            initialVisible
            className="flex items-center gap-2 md:hidden"
          >
            <button
              type="button"
              onClick={toggleTheme}
              className={`${baseIconButton} ${theme.iconButton}`}
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {darkMode ? <SunMedium size={17} /> : <MoonStar size={17} />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`${baseIconButton} ${theme.iconButton}`}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </Reveal>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 md:hidden ${
            menuOpen ? "mt-4 max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Reveal
            as="div"
            preset="soft-up"
            duration={700}
            distance={12}
            threshold={0}
            disabled={!menuOpen}
            className={`rounded-[2rem] border p-3 ${theme.mobilePanel} ${
              menuOpen ? "translate-y-0" : "-translate-y-2"
            } transition-all duration-500`}
            id="mobile-navigation"
          >
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGoHome}
                className={`${baseMobileButton} ${
                  isActive("/home") ? theme.mobileItemActive : theme.mobileItem
                }`}
              >
                <House size={16} />
                <span>Início</span>
              </button>

              <button
                type="button"
                onClick={handleGoCatalog}
                className={`${baseMobileButton} ${
                  isActive("/catalogo")
                    ? theme.mobileItemActive
                    : theme.mobileItem
                }`}
              >
                <Library size={16} />
                <span>Catálogo</span>
              </button>

              <button
                type="button"
                onClick={handleCart}
                className={`${baseMobileButton} ${theme.mobileItem}`}
              >
                <ShoppingBag size={16} />
                <span>Carrinho</span>

                {totalItems > 0 && user ? (
                  <span
                    className={`ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-medium ${theme.badge}`}
                  >
                    {totalItems}
                  </span>
                ) : null}
              </button>

              <div className={`my-2 h-px w-full ${theme.divider}`} />

              <button
                type="button"
                onClick={handleAuthAction}
                className={`${baseMobileButton} ${theme.mobileItem}`}
              >
                {user ? <LogOut size={16} /> : <LogIn size={16} />}
                <span>{user ? "Sair" : "Entrar"}</span>
              </button>
            </div>
          </Reveal>
        </div>
      </Reveal>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-500 md:hidden ${
          menuOpen
            ? `opacity-100 ${theme.overlay}`
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </header>
  );
}

export default React.memo(Nav);