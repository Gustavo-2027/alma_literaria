import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookCard from "../../../entities/book/ui/BookCard";
import { addToCart } from "../../../entities/cart/model/cartSlice";
import useTheme from "../../../features/theme/model/useTheme";
import { useToast } from "../../../features/toast/model/ToastContext";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

const GRID_ANIMATION_DURATION = 180;

function BooksGrid({
  books = [],
  currentPage = 1,
  totalPages = 1,
  resultsCount,
  title = "Obras disponíveis",
  subtitle = "Seleção",
  emptyFallback = null,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { darkMode } = useTheme();
  const { showToast } = useToast();

  const [renderedBooks, setRenderedBooks] = useState(books);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const timeoutRef = useRef(null);
  const previousBooksRef = useRef(books);

  useEffect(() => {
    const previousBooks = previousBooksRef.current;
    if (previousBooks === books) return;

    setIsTransitioning(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setRenderedBooks(books);
      previousBooksRef.current = books;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    }, GRID_ANIMATION_DURATION);

    return () => clearTimeout(timeoutRef.current);
  }, [books]);

  const visibleBooks = useMemo(() => renderedBooks, [renderedBooks]);
  const hasBooks = visibleBooks.length > 0;

  const handleRequireAuth = useCallback(
    (description) => {
      showToast({
        title: "Login necessário",
        description,
        actionLabel: "Entrar",
        actionTo: "/",
      });
    },
    [showToast]
  );

  const handleAddToCart = useCallback(
    (book) => {
      if (!user) {
        handleRequireAuth("Entre para adicionar itens ao carrinho.");
        return;
      }

      dispatch(addToCart(book));

      showToast({
        title: "Adicionado ao carrinho",
        description: book.name,
        actionLabel: "Ver carrinho",
        actionTo: "/cart",
      });
    },
    [dispatch, handleRequireAuth, showToast, user]
  );

  const handleAddToWishlist = useCallback(
    (book) => {
      if (!user) {
        handleRequireAuth("Entre para salvar livros.");
        return;
      }

      showToast({
        title: "Salvo nos desejos",
        description: book.name,
      });
    },
    [handleRequireAuth, showToast, user]
  );

  const subtleText = darkMode ? "text-zinc-500" : "text-zinc-400";
  const bodyText = darkMode ? "text-zinc-400" : "text-zinc-500";
  const titleText = darkMode ? "text-white" : "text-black";
  const divider = darkMode ? "border-zinc-900" : "border-zinc-200";

  return (
    <section className="w-full">
      {/* HEADER MAIS EDITORIAL */}
      <header
        className={`mb-14 border-b pb-8 ${divider} flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between`}
      >
        <div className="max-w-xl space-y-3">
          <p className={`text-[10px] uppercase tracking-[0.32em] ${subtleText}`}>
            {subtitle}
          </p>

          <h2 className={`text-3xl font-light tracking-[0.04em] ${titleText}`}>
            {title}
          </h2>

          <p className={`text-sm leading-7 ${bodyText}`}>
            Uma seleção para explorar com mais calma, contexto e direção.
          </p>
        </div>

        <div className="flex flex-col items-start gap-1 sm:items-end">
          {typeof resultsCount === "number" && (
            <p className={`text-[10px] uppercase tracking-[0.28em] ${subtleText}`}>
              {resultsCount} {resultsCount === 1 ? "obra" : "obras"}
            </p>
          )}

          {totalPages > 1 && (
            <p className={`text-[12px] ${bodyText}`}>
              Página <span className={titleText}>{currentPage}</span> de{" "}
              <span className={titleText}>{totalPages}</span>
            </p>
          )}
        </div>
      </header>

      {/* GRID */}
      {!hasBooks ? (
        emptyFallback
      ) : (
        <div
          className={`grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10 ${
            isTransitioning
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          } transition-all duration-300`}
        >
          {visibleBooks.map((book, index) => (
            <article
              key={`${currentPage}-${book.id}`}
              style={{
                transitionDelay: `${index * 40}ms`,
              }}
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isTransitioning
                  ? "opacity-0 translate-y-6"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <BookCard
                book={book}
                darkMode={darkMode}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                formatPrice={formatCurrency}
              />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default React.memo(BooksGrid);