import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookCard from "../../../entities/book/ui/BookCard";
import { addToCart } from "../../../entities/cart/model/cartSlice";
import useTheme from "../../../features/theme/model/useTheme";
import { useToast } from "../../../features/toast/model/ToastContext";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

const GRID_ANIMATION_DURATION = 90;

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
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setRenderedBooks(books);
      previousBooksRef.current = books;
      setIsTransitioning(false);
    }, GRID_ANIMATION_DURATION);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
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
      <header
        className={`mb-14 flex flex-col gap-6 border-b pb-8 sm:flex-row sm:items-end sm:justify-between ${divider}`}
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

      {!hasBooks ? (
        <div
          className={`transition-opacity duration-150 ease-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {emptyFallback}
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10 transition-[opacity,transform] duration-150 ease-out ${
            isTransitioning
              ? "translate-y-[4px] opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          {visibleBooks.map((book) => (
            <article
              key={`${currentPage}-${book.id}`}
              className="h-full transform-gpu"
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