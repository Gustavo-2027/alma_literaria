import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useDarkModeContext from "../../hooks/useDarkModeContext";

function scrollToCatalogTop() {
  const target = document.getElementById("banner");

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

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const { darkMode } = useDarkModeContext();

  const goToPage = useCallback(
    (page) => {
      if (page === currentPage) return;

      setCurrentPage(page);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToCatalogTop();
        });
      });
    },
    [currentPage, setCurrentPage]
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

  const labelClass = darkMode ? "text-zinc-500" : "text-zinc-400";

  const getButtonClass = (isActive, isDisabled = false) => {
    if (isDisabled) {
      return darkMode
        ? "cursor-not-allowed border-zinc-800 text-zinc-700"
        : "cursor-not-allowed border-zinc-200 text-zinc-300";
    }

    if (isActive) {
      return darkMode
        ? "border-white bg-white text-black"
        : "border-black bg-black text-white";
    }

    return darkMode
      ? "border-zinc-700 text-white hover:bg-white hover:text-black"
      : "border-zinc-300 text-black hover:bg-black hover:text-white";
  };

  return (
    <nav
      className="mt-14 flex flex-col items-center justify-center gap-5"
      aria-label="Paginação dos livros"
    >
      <p className={`text-[11px] uppercase tracking-[0.24em] ${labelClass}`}>
        Página {currentPage} de {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`inline-flex min-h-[48px] items-center justify-center gap-2 border px-5 text-[11px] uppercase tracking-[0.22em] transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            getButtonClass(false, currentPage === 1)
          } ${
            darkMode
              ? "focus-visible:ring-white focus-visible:ring-offset-black"
              : "focus-visible:ring-black focus-visible:ring-offset-white"
          }`}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Anterior</span>
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Ir para a página ${page}`}
                className={`flex min-h-[48px] min-w-[48px] items-center justify-center border px-4 text-[11px] uppercase tracking-[0.22em] transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  getButtonClass(currentPage === page)
                } ${
                  darkMode
                    ? "focus-visible:ring-white focus-visible:ring-offset-black"
                    : "focus-visible:ring-black focus-visible:ring-offset-white"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`inline-flex min-h-[48px] items-center justify-center gap-2 border px-5 text-[11px] uppercase tracking-[0.22em] transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            getButtonClass(false, currentPage === totalPages)
          } ${
            darkMode
              ? "focus-visible:ring-white focus-visible:ring-offset-black"
              : "focus-visible:ring-black focus-visible:ring-offset-white"
          }`}
          aria-label="Próxima página"
        >
          <span>Próxima</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}