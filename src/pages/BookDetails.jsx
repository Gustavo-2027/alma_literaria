import { lazy, Suspense, useCallback, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";
import { books } from "../data/Books";
import useDarkModeContext from "../hooks/useDarkModeContext";
import { useToast } from "../context/ToastContext";
import { formatCurrency } from "../lib/formatCurrency";
import Footer from "../components/layout/Footer"

const Nav = lazy(() => import("../components/layout/Nav"));
const RelatedBooks = lazy(() => import("../components/books/RelatedBooks"));
const Reviews = lazy(() => import("../components/books/Reviews"));

function SectionSkeleton({ darkMode, height = "h-24" }) {
  return (
    <div
      className={`w-full animate-pulse rounded-sm ${height} ${
        darkMode ? "bg-zinc-900" : "bg-zinc-100"
      }`}
    />
  );
}

export default function BookDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { darkMode } = useDarkModeContext();
  const { showToast } = useToast();
  const user = useSelector((state) => state.auth.user);

  const book = useMemo(() => {
    return books.find((item) => item.id === Number(id)) ?? null;
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!book) return;

    if (!user) {
      showToast({
        title: "Login necessário",
        description: "Entre na sua conta para adicionar itens ao carrinho.",
        actionLabel: "Entrar",
        actionTo: "/",
        duration: 3200,
      });
      return;
    }

    dispatch(addToCart(book));

    showToast({
      title: "Adicionado ao carrinho",
      description: `${book.name} foi adicionado à sua seleção.`,
      actionLabel: "Ver carrinho",
      actionTo: "/cart",
      icon: "cart",
      duration: 3200,
    });
  }, [book, dispatch, showToast, user]);

  const handleAddToWishlist = useCallback(() => {
    if (!book) return;

    if (!user) {
      showToast({
        title: "Login necessário",
        description: "Entre na sua conta para salvar livros na sua lista de desejos.",
        actionLabel: "Entrar",
        actionTo: "/",
        duration: 3200,
      });
      return;
    }

    showToast({
      title: "Adicionado aos desejos",
      description: `${book.name} foi salvo na sua lista de desejos.`,
      duration: 2800,
    });
  }, [book, showToast, user]);

  const pageClass = darkMode ? "bg-black text-white" : "bg-white text-black";
  const mutedTextClass = darkMode ? "text-zinc-400" : "text-zinc-500";
  const softTextClass = darkMode ? "text-zinc-300" : "text-zinc-600";
  const descriptionClass = darkMode ? "text-zinc-300" : "text-zinc-700";
  const imageWrapperClass = darkMode ? "bg-zinc-950" : "bg-zinc-50";

  if (!book) {
    return (
      <div className={`flex min-h-screen items-center justify-center px-4 py-16 ${pageClass}`}>
        <div className="text-center">
          <p className="text-xl font-light uppercase tracking-[0.2em]">
            Livro não encontrado
          </p>

          <Link
            to="/home"
            className={`mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] transition ${
              darkMode
                ? "text-zinc-400 hover:text-white"
                : "text-zinc-500 hover:text-black"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar à biblioteca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 py-16 sm:px-8 lg:px-12 ${pageClass}`}>
      <section className="pb-8">
        <Suspense fallback={<SectionSkeleton darkMode={darkMode} height="h-20" />}>
          <Nav />
        </Suspense>
      </section>

      <div className="mx-auto max-w-7xl">
        <Link
          to="/home"
          className={`mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition ${
            darkMode
              ? "text-zinc-400 hover:text-white"
              : "text-zinc-500 hover:text-black"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar à biblioteca
        </Link>

        <section className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="flex items-start justify-center">
            <div className="w-full max-w-[540px]">
              <div className={`flex aspect-[4/5] items-center justify-center ${imageWrapperClass}`}>
                <img
                  src={book.image}
                  alt={book.name}
                  loading="eager"
                  decoding="async"
                  className="h-auto max-h-[680px] w-auto max-w-[78%] object-contain transition duration-300 hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className={`text-[11px] uppercase tracking-[0.18em] ${mutedTextClass}`}>
                {book.genre || "Literatura"}
              </span>

              <span
                className={`text-[11px] uppercase tracking-[0.18em] ${
                  darkMode ? "text-zinc-600" : "text-zinc-300"
                }`}
              >
                /
              </span>

              <span className={`text-[11px] uppercase tracking-[0.18em] ${mutedTextClass}`}>
                {book.publication_year || "Ano não informado"}
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-light leading-tight tracking-[0.04em] sm:text-4xl lg:text-5xl">
              {book.name}
            </h1>

            <div className="mb-6 flex items-center gap-2">
              <Star className="h-4 w-4 fill-current" />
              <span className={`text-sm ${softTextClass}`}>
                {book.rating?.toFixed(1) || "0.0"}
              </span>
            </div>

            <p className={`mb-8 text-base leading-7 ${softTextClass}`}>
              por{" "}
              <span className="font-medium text-current">
                {book.author || "Autor desconhecido"}
              </span>
            </p>

            <div className="mb-8 space-y-2 text-sm leading-7">
              <p>
                <span className="uppercase tracking-[0.14em] opacity-60">Editora:</span>{" "}
                {book.publisher || "Não especificado"}
              </p>
              <p>
                <span className="uppercase tracking-[0.14em] opacity-60">ISBN:</span>{" "}
                {book.isbn || "Não especificado"}
              </p>
              <p>
                <span className="uppercase tracking-[0.14em] opacity-60">Ano:</span>{" "}
                {book.publication_year || "Não especificado"}
              </p>
              <p>
                <span className="uppercase tracking-[0.14em] opacity-60">Categoria:</span>{" "}
                {book.genre || "Não especificado"}
              </p>
            </div>

            <p className={`mb-10 max-w-2xl text-base leading-8 sm:text-lg ${descriptionClass}`}>
              {book.description || "Nenhuma descrição disponível para este livro."}
            </p>

            <div className="mb-10">
              <p className="text-3xl font-light tracking-wide">
                {formatCurrency(book.price)}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`inline-flex min-h-[54px] items-center justify-center gap-2 px-8 text-xs uppercase tracking-[0.2em] transition ${
                  darkMode
                    ? "bg-white text-black hover:opacity-85"
                    : "bg-black text-white hover:opacity-85"
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                Adicionar ao Carrinho
              </button>

              <button
                type="button"
                onClick={handleAddToWishlist}
                className={`inline-flex min-h-[54px] items-center justify-center gap-2 border px-8 text-xs uppercase tracking-[0.2em] transition ${
                  darkMode
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                <Heart className="h-4 w-4" />
                Lista de Desejos
              </button>
            </div>
          </div>
        </section>

        <Suspense fallback={<SectionSkeleton darkMode={darkMode} height="h-40" />}>
          <Reviews />
        </Suspense>

        <Suspense fallback={<SectionSkeleton darkMode={darkMode} height="h-64" />}>
          <RelatedBooks currentBookId={book.id} />
        </Suspense>
      </div>
      <Footer/>
    </div>
  );
}