import { useMemo } from "react";

import { books } from "../../../entities/book/model/booksData";
import useTheme from "../../../features/theme/model/useTheme";
import { formatCurrency } from "../../../shared/lib/formatCurrency";
import BookCardCompact from "../../../entities/book/ui/BookCardCompact";

function getRelatedBooks(allBooks, currentBookId, limit = 3) {
  const availableBooks = allBooks.filter((book) => book.id !== currentBookId);

  if (availableBooks.length <= limit) {
    return availableBooks;
  }

  const startIndex = currentBookId % availableBooks.length;
  const selected = availableBooks.slice(startIndex, startIndex + limit);

  if (selected.length === limit) {
    return selected;
  }

  const remaining = limit - selected.length;
  return [...selected, ...availableBooks.slice(0, remaining)];
}

export default function RelatedBooks({ currentBookId }) {
  const { darkMode } = useTheme();

  const relatedBooks = useMemo(() => {
    return getRelatedBooks(books, currentBookId, 3);
  }, [currentBookId]);

  if (!relatedBooks.length) return null;

  const eyebrowClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const titleClass = darkMode ? "text-white" : "text-black";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-0">
      <div className="mb-10">
        <p className={`mb-3 text-[11px] uppercase tracking-[0.3em] ${eyebrowClass}`}>
          Seleção complementar
        </p>

        <h2
          className={`text-2xl font-light uppercase tracking-[0.08em] sm:text-3xl ${titleClass}`}
        >
          Livros relacionados
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {relatedBooks.map((book, index) => (
          <div
            key={book.id}
            style={{ transitionDelay: `${index * 45}ms` }}
            className="translate-y-0 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <BookCardCompact
              book={book}
              darkMode={darkMode}
              formatPrice={formatCurrency}
            />
          </div>
        ))}
      </div>
    </section>
  );
}