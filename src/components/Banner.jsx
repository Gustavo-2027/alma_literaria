import React, { useMemo } from "react";
import { Livros } from "./Livros";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";
import Liv from "../assets/img/mg.jpeg";
function Banner() {
  const num = useMemo(
    () => Math.floor(Math.random() * (Livros.length - 3)),
    []
  );
  return (
    <section
      className="relative h-[32rem] bg-cover bg-center mt-16"
      style={{ backgroundImage: `url(${Liv})` }}
      id="ibanner"
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
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-light py-3 px-6 uppercase tracking-wide rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label={`Explorar ${Livros[num].title || "livro"}`}
          >
            <Book className="w-4 h-4" />
            Explore Agora
          </Link>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Banner); // * React.memo => usado para evitar renderizações desnecessárias quando os props ou o estado do componente pai (Home) mudam, mas o conteúdo do Banner permanece o mesmo.
