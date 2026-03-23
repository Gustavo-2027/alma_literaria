import { useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function scrollToCatalogTop() {
  const target = document.getElementById("catalog-top");

  if (!target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const navOffset = 88;
  const targetTop =
    target.getBoundingClientRect().top + window.scrollY - navOffset;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth",
  });
}

function buildPaginationItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis-right", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis-left", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "ellipsis-left",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-right",
    totalPages,
  ];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  darkMode,
}) {
  const items = useMemo(
    () => buildPaginationItems(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const goToPage = useCallback(
    (page) => {
      if (page === currentPage || typeof page !== "number") return;

      onPageChange(page);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToCatalogTop();
        });
      });
    },
    [currentPage, onPageChange]
  );

  const goToPreviousPage = useCallback(() => {
    if (currentPage <= 1) return;
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage >= totalPages) return;
    goToPage(currentPage + 1);
  }, [currentPage, goToPage, totalPages]);

  if (totalPages <= 1) return null;

  const subtleTextClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const inactiveClass = darkMode
    ? "text-zinc-500 hover:text-white"
    : "text-zinc-400 hover:text-black";
  const activeClass = darkMode
    ? "border-white text-white"
    : "border-black text-black";
  const disabledClass = darkMode
    ? "text-zinc-700 cursor-not-allowed"
    : "text-zinc-300 cursor-not-allowed";
  const dividerClass = darkMode ? "border-zinc-800" : "border-zinc-200";
  const focusRingClass = darkMode
    ? "focus-visible:ring-white focus-visible:ring-offset-black"
    : "focus-visible:ring-black focus-visible:ring-offset-white";

  return (
    <nav
      className={`flex w-full flex-col items-center gap-6 border-t pt-8 ${dividerClass}`}
      aria-label="Paginação do catálogo"
    >
      <div className="flex flex-col items-center gap-2">
        <p
          className={`text-[10px] uppercase tracking-[0.32em] ${subtleTextClass}`}
        >
          Navegação
        </p>

        <p
          className={`text-[11px] uppercase tracking-[0.24em] ${subtleTextClass}`}
          aria-live="polite"
        >
          Página {currentPage} de {totalPages}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          aria-label="Ir para a página anterior"
          className={`inline-flex h-10 items-center gap-2 border-b px-1 text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            currentPage === 1 ? disabledClass : inactiveClass
          } ${focusRingClass} ${
            currentPage === 1 ? "border-transparent" : dividerClass
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {items.map((item, index) => {
            if (typeof item !== "number") {
              return (
                <span
                  key={`${item}-${index}`}
                  className={`inline-flex h-10 min-w-[28px] items-center justify-center text-[11px] ${subtleTextClass}`}
                  aria-hidden="true"
                >
                  —
                </span>
              );
            }

            const isActive = item === currentPage;

            return (
              <button
                key={item}
                type="button"
                onClick={() => goToPage(item)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Ir para a página ${item}`}
                className={`inline-flex h-10 min-w-[32px] items-center justify-center border-b px-1 text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${focusRingClass} ${
                  isActive ? activeClass : `${inactiveClass} border-transparent`
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          aria-label="Ir para a próxima página"
          className={`inline-flex h-10 items-center gap-2 border-b px-1 text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            currentPage === totalPages ? disabledClass : inactiveClass
          } ${focusRingClass} ${
            currentPage === totalPages ? "border-transparent" : dividerClass
          }`}
        >
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}