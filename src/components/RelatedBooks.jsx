import { useParams, Link } from "react-router-dom";
import { Livros } from "./Livros";

export default function RelatedBooks() {
  const { id } = useParams();
  const num = Math.floor(Math.random() * 29);
  const relatedBooks = Livros.filter((b) => b.id !== parseInt(id)).slice(
    // separamos e depois pegamos apenas 3 livros da lista
    num,
    num + 3
  );
  return (
    <div>
      {relatedBooks.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-light text-black mb-6 uppercase tracking-wider">
            Livros Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedBooks.map((Book) => (
              <Link
                to={`/book/${Book.id}`}
                key={Book.id}
                className="group relative bg-white overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <div className="relative w-full h-64">
                  <img
                    src={Book.image}
                    alt={Book.name}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <h3 className="text-base font-normal text-black mb-1 line-clamp-2 uppercase">
                    {Book.name}
                  </h3>
                  <p className="text-sm font-light text-gray-700 mb-3">
                    R$ {Book.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
