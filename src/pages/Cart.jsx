import { useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useDarkModeContext from "../hooks/useDarkModeContext";
import { setUser } from "../redux/slices/cartSlice";

const Nav = lazy(() => import("../components/layout/Nav"));
const CartItems = lazy(() => import("../components/cart/CartItems"));
const CartSummary = lazy(() => import("../components/cart/CartSummary"));

function SectionSkeleton({ darkMode, height = "h-24" }) {
  return (
    <div
      className={`w-full animate-pulse rounded-sm ${height} ${
        darkMode ? "bg-zinc-900" : "bg-zinc-100"
      }`}
    />
  );
}

export default function Cart() {
  const dispatch = useDispatch();
  const { darkMode } = useDarkModeContext();

  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.email) return;

    dispatch(setUser({ email: user.email }));
  }, [user, dispatch]);

  const totalItems = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const pageClass = darkMode ? "bg-black text-white" : "bg-white text-black";
  const eyebrowClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const mutedTextClass = darkMode ? "text-zinc-400" : "text-zinc-500";
  const linkClass = darkMode
    ? "text-zinc-400 hover:text-white"
    : "text-zinc-500 hover:text-black";
  const emptySectionClass = darkMode
    ? "border-zinc-800 bg-black text-white"
    : "border-zinc-200 bg-white text-black";
  const emptyButtonClass = darkMode
    ? "border-white text-white hover:bg-white hover:text-black"
    : "border-black text-black hover:bg-black hover:text-white";

  return (
    <div className={`min-h-screen ${pageClass}`}>
      <Suspense fallback={<SectionSkeleton darkMode={darkMode} height="h-20" />}>
        <Nav />
      </Suspense>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-8 lg:px-12">
        <header className="mb-12">
          <p className={`mb-3 text-xs uppercase tracking-[0.24em] ${eyebrowClass}`}>
            Alma Literária
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-light uppercase tracking-[0.18em] sm:text-4xl">
                Seu Carrinho
              </h1>

              <p className={`mt-3 text-sm ${mutedTextClass}`}>
                {totalItems} {totalItems === 1 ? "item selecionado" : "itens selecionados"}
              </p>
            </div>

            <Link
              to="/home"
              className={`text-xs uppercase tracking-[0.2em] transition ${linkClass}`}
            >
              Continuar comprando
            </Link>
          </div>
        </header>

        {!items || items.length === 0 ? (
          <section className={`border px-6 py-20 text-center ${emptySectionClass}`}>
            <h2 className="text-lg font-light uppercase tracking-[0.24em]">
              Seu carrinho está vazio
            </h2>

            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${mutedTextClass}`}>
              Explore nossa seleção de clássicos e descubra obras marcantes para
              adicionar à sua coleção.
            </p>

            <Link
              to="/home"
              className={`mt-8 inline-flex min-h-[52px] items-center justify-center border px-8 text-xs uppercase tracking-[0.22em] transition ${emptyButtonClass}`}
            >
              Voltar para a loja
            </Link>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            <div>
              <Suspense fallback={<SectionSkeleton darkMode={darkMode} height="h-[420px]" />}>
                <CartItems />
              </Suspense>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <Suspense fallback={<SectionSkeleton darkMode={darkMode} height="h-[320px]" />}>
                <CartSummary />
              </Suspense>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}