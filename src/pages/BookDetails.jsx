import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { Livros } from "../components/Livros";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Nav from "../components/Nav";
import RelatedBooks from "../components/RelatedBooks";
import Reviews from "../components/Reviews";

export default function BookDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book = Livros.find((product) => product.id === parseInt(id));

  if (!book) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 sm:px-8 lg:px-12 flex justify-center items-center">
        <p className="text-xl font-light text-black uppercase tracking-wide">
          Livro não encontrado
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8 lg:px-12">
      <section className="pb-10">
        <Nav />
      </section>
      <Link
        to="/home"
        className="text-sm font-light text-gray-600 hover:text-black uppercase tracking-wide mb-8 inline-block transition-colors duration-300 hover:border-b"
      >
        ← Voltar à Biblioteca
      </Link>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden">
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-light text-black mb-4 uppercase tracking-wider">
            {book.name}
          </h1>
          <p className="text-lg font-light text-gray-700 mb-3">
            Autor: {book.author || "Autor Desconhecido"}
          </p>
          <p className="text-base font-light text-gray-600 mb-4">
            Gênero: {book.genre || "Não especificado"}
          </p>
          <p className="text-base font-light text-gray-600 mb-4">
            Editora: {book.publisher || "Não especificado"}
          </p>
          <p className="text-base font-light text-gray-600 mb-4">
            Ano de Publicação: {book.publication_year || "Não especificado"}
          </p>

          <p className="text-base font-light text-gray-600 mb-6 leading-relaxed">
            {book.description ||
              "Nenhuma descrição disponível para este livro."}
          </p>
          <p className="text-2xl font-normal text-black mb-6">
            R$ {book.price.toFixed(2)}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(addToCart(book))}
              className="w-2/3 bg-black cursor-pointer text-white text-sm font-light py-3 px-6 uppercase tracking-wide rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              <ShoppingCart size={18} /> Adicionar ao Carrinho
            </button>
            <button
              onClick={() => alert("Adicionado à lista de desejos!")}
              className="w-1/3 cursor-pointer bg-gray-200 text-black text-sm font-light py-3 px-6 uppercase tracking-wide rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Lista de Desejos
            </button>
          </div>
        </div>
      </div>

     <Reviews/>
      <RelatedBooks />
    </div>
  );
}
