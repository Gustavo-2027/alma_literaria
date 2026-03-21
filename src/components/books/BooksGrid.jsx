import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { books } from "../../data/Books";
import Pagination from "./Pagination";
import BookCard from "./BookCard";
import { addToCart } from "../../redux/slices/cartSlice";
import useDarkModeContext from "../../hooks/useDarkModeContext";
import { useToast } from "../../context/ToastContext";
import { formatCurrency } from "../../lib/formatCurrency";

const BOOKS_PER_PAGE = 8;
const GRID_ANIMATION_DURATION = 200;

function BooksGrid() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { darkMode } = useDarkModeContext();
  const { showToast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [displayPage, setDisplayPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalPages = Math.max(1, Math.ceil(books.length / BOOKS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      setDisplayPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (currentPage === displayPage) return;

    setIsTransitioning(true);

    const timeout = window.setTimeout(() => {
      setDisplayPage(currentPage);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    }, GRID_ANIMATION_DURATION);

    return () => window.clearTimeout(timeout);
  }, [currentPage, displayPage]);

  const currentBooks = useMemo(() => {
    const startIndex = (displayPage - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;

    return books.slice(startIndex, endIndex);
  }, [displayPage]);

  const handleAddToCart = useCallback(
    (book) => {
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
    },
    [dispatch, showToast, user],
  );

  const handleAddToWishlist = useCallback(
    (book) => {
      if (!user) {
        showToast({
          title: "Login necessário",
          description:
            "Entre na sua conta para salvar livros na sua lista de desejos.",
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
    },
    [showToast, user],
  );

  const sectionTextClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const titleClass = darkMode ? "text-white" : "text-black";

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className={`mb-3 text-[11px] uppercase tracking-[0.3em] ${sectionTextClass}`}
          >
            Catálogo
          </p>

          <h2
            className={`text-2xl font-light uppercase tracking-[0.16em] sm:text-3xl ${titleClass}`}
          >
            Nossa Seleção
          </h2>
        </div>

        <p
          className={`text-[11px] uppercase tracking-[0.22em] ${sectionTextClass}`}
        >
          Página {currentPage} de {totalPages}
        </p>
      </header>

      <div
        className={`grid grid-cols-1 gap-x-6 gap-y-12 transition-all duration-[220ms] ease-out sm:grid-cols-2 lg:grid-cols-4 ${
          isTransitioning
            ? "translate-y-2 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {currentBooks.map((book, index) => (
          <div
            key={`${displayPage}-${book.id}`}
            style={{
              transitionDelay: `${index * 40}ms`,
            }}
            className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isTransitioning
                ? "translate-y-4 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <BookCard
              book={book}
              darkMode={darkMode}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              formatPrice={formatCurrency}
            />
          </div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
}

export default React.memo(BooksGrid);
