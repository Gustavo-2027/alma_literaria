import { Livros } from "./Livros";
import { Link } from "react-router-dom";
import Liv from "../assets/img/mg.jpeg";
export default function Banner() {
  const num = Math.floor(Math.random() * 29);
  return (
    <section
      className="relative h-[32rem] bg-cover bg-center mt-16"
      style={{ backgroundImage: `url(${Liv})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-light uppercase tracking-wider mb-4">
            Alma Literária
          </h1>
          <p className="text-lg font-light max-w-2xl mx-auto mb-6">
            Descubra clássicos atemporais que moldaram a literatura mundial.
          </p>
          <Link
            to={`/book/${Livros[num].id}`}
            className="bg-black text-white text-sm font-light py-3 px-6 uppercase tracking-wide rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Explorar Cem Anos de Solidão"
          >
            Explore Agora
          </Link>
        </div>
      </div>
    </section>
  );
}
