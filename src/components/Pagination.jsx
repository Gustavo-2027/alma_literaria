import { Livros } from "./Livros";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, setCurrentPage }) {
  const booksPerPage = 8;
  const totalPages = Math.ceil(Livros.length / booksPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg flex items-center gap-1 text-sm font-light uppercase tracking-wide cursor-pointer ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-light uppercase tracking-wide ${
              currentPage === page
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            aria-label={`Ir para a página ${page}`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg flex items-center gap-1 text-sm font-light uppercase cursor-pointer tracking-wide ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
        aria-label="Próxima página"
      >
        Próximo
        <ChevronRight className="w-4 h-4 cursor-pointer" />
      </button>
    </div>
  );
}
