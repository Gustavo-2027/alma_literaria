import { lazy, Suspense, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDarkModeContext from "../hooks/useDarkModeContext";
import { userInformations } from "../data/Users";
import BooksGridSkeleton from "../components/books/BooksGridSkeleton";
import Footer from "../components/layout/Footer";
import { setUser } from "../redux/slices/cartSlice";

const Nav = lazy(() => import("../components/layout/Nav"));
const Banner = lazy(() => import("../components/books/Banner"));
const BooksGrid = lazy(() => import("../components/books/BooksGrid"));

function NavSkeleton({ darkMode }) {
  return (
    <div
      className={`fixed left-0 top-0 z-50 h-20 w-full border-b animate-pulse ${
        darkMode
          ? "border-zinc-800 bg-black"
          : "border-zinc-200 bg-white"
      }`}
    />
  );
}

function BannerSkeleton({ darkMode }) {
  return (
    <div
      className={`mt-16 h-[30rem] w-full animate-pulse sm:h-[40rem] lg:h-[46rem] ${
        darkMode ? "bg-zinc-900" : "bg-zinc-100"
      }`}
    />
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const { darkMode } = useDarkModeContext();

  const currentUser = useMemo(() => {
    if (!authUser?.email) return null;

    return userInformations.find((user) => user.email === authUser.email) ?? null;
  }, [authUser]);

  useEffect(() => {
    if (!authUser?.email) return;

    dispatch(setUser({ email: authUser.email }));
  }, [authUser, dispatch]);

  const wrapperClass = darkMode ? "bg-black text-white" : "bg-white text-black";
  const eyebrowClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const dividerClass = darkMode ? "bg-zinc-700" : "bg-zinc-300";
  const descriptionClass = darkMode ? "text-zinc-400" : "text-zinc-500";

  return (
    <div className={`min-h-screen ${wrapperClass}`}>
      <Suspense fallback={<NavSkeleton darkMode={darkMode} />}>
        <Nav />
      </Suspense>

      <Suspense fallback={<BannerSkeleton darkMode={darkMode} />}>
        <Banner />
      </Suspense>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className={`mb-4 text-[11px] uppercase tracking-[0.32em] ${eyebrowClass}`}
          >
            Alma Literária
          </p>

          <h1 className="text-3xl font-light uppercase leading-tight tracking-[0.14em] sm:text-4xl lg:text-5xl">
            Bem-vindo
            {currentUser?.name ? `, ${currentUser.name}` : ", Visitante"}
          </h1>

          <div className={`mx-auto my-8 h-px w-16 ${dividerClass}`} />

          <p
            className={`mx-auto max-w-3xl text-sm leading-8 sm:text-base lg:text-lg ${descriptionClass}`}
          >
            Nossa curadoria reúne obras marcantes da literatura mundial,
            convidando você a explorar histórias que atravessam o tempo com
            elegância, profundidade e significado.
          </p>
        </div>
      </section>

      <main>
        <Suspense fallback={<BooksGridSkeleton />}>
          <BooksGrid />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}