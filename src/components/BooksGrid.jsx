import { useState } from "react";
import { Livros } from "./Livros";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function BooksGrid() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const totalPages = Math.ceil(Livros.length / booksPerPage);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = Livros.slice(indexOfFirstBook, indexOfLastBook);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="max-w-7xl w-full p-6 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {currentBooks.map((livro) => (
          <div
            key={livro.id}
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <Link
              to={`/book/${livro.id}`}
              className="block focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
              aria-label={`Ver detalhes de ${livro.name}`}
            >
              <div className="relative w-full h-80 overflow-hidden">
                <img
                  src={livro.image}
                  alt={livro.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-book.jpg";
                  }}
                />
                <div className="absolute top-4 left-4 bg-black text-white text-xs font-light uppercase tracking-wide px-2 py-1 rounded">
                  {livro.publication_year}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-xs font-light text-white line-clamp-2">
                    {livro.description}
                  </p>
                </div>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-lg font-normal text-black mb-2 line-clamp-2 uppercase tracking-wide">
                  {livro.name}
                </h3>
                <p className="text-sm font-light text-gray-700 mb-1">
                  {livro.author}
                </p>
                <p className="text-sm font-light text-gray-600 mb-2">
                  {livro.genre}
                </p>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-light text-gray-600 ml-1">
                    {livro.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-base font-medium text-black">
                  R$ {livro.price.toFixed(2)}
                </p>
              </div>
            </Link>
            <div className="px-6 pb-6 flex gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addToCart(livro));
                }}
                className="w-2/3 bg-black text-white text-sm font-light py-3 px-6 uppercase tracking-wide rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                aria-label={`Adicionar ${livro.name} ao carrinho`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Comprar</span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert("Adicionado à lista de desejos!");
                }}
                className="w-1/3 bg-gray-200 text-black text-sm font-light py-3 px-6 uppercase tracking-wide rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                aria-label={`Adicionar ${livro.name} à lista de desejos`}
              >
                <Star className="w-4 h-4" />
                <span>Desejos</span>
              </button>
            </div>
          </div>
        ))}
      </div>
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
    </section>
  );
}
