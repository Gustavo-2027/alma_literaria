import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

function BookCard({
  book,
  darkMode,
  onAddToCart,
  onAddToWishlist,
  formatPrice,
}) {
  const titleClass = darkMode ? "text-white" : "text-black";
  const subtitleClass = darkMode ? "text-zinc-400" : "text-zinc-500";
  const genreClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const priceClass = darkMode ? "text-zinc-200" : "text-zinc-800";
  const imageWrapperClass = darkMode ? "bg-zinc-950" : "bg-zinc-100";

  return (
    <article className="group">
      <Link
        to={`/book/${book.id}`}
        className="block focus:outline-none"
        aria-label={`Ver detalhes de ${book.name}`}
      >
        <div className={`overflow-hidden ${imageWrapperClass}`}>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={book.image}
              alt={book.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            <span className="absolute left-3 top-3 bg-black/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
              {book.publication_year}
            </span>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="line-clamp-3 text-xs leading-6 text-white/90">
                {book.description}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 text-left">
          <h3
            className={`line-clamp-2 text-sm font-normal uppercase tracking-[0.18em] ${titleClass}`}
          >
            {book.name}
          </h3>

          <p className={`mt-2 text-sm ${subtitleClass}`}>{book.author}</p>

          <p className={`mt-1 text-sm ${genreClass}`}>{book.genre}</p>

          <div className="mt-3 flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className={`text-sm ${subtitleClass}`}>
              {book.rating.toFixed(1)}
            </span>
          </div>

          <p className={`mt-4 text-sm ${priceClass}`}>
            {formatPrice(book.price)}
          </p>
        </div>
      </Link>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => onAddToCart(book)}
          className={`inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 border border-black px-4 text-[11px] uppercase tracking-[0.22em] text-black transition duration-300 hover:bg-black hover:text-white ${
            darkMode
              ? "bg-white text-black hover:opacity-85 focus-visible:ring-white focus-visible:ring-offset-zinc-950"
              : "bg-black text-white hover:opacity-85 focus-visible:ring-black focus-visible:ring-offset-white"
          }`}
          aria-label={`Adicionar ${book.name} ao carrinho`}
        >
          <ShoppingCart className="h-4 w-4" />
          Comprar
        </button>

        <button
          type="button"
          onClick={() => onAddToWishlist(book)}
          className={`inline-flex min-h-[50px] min-w-[50px] items-center justify-center border transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            darkMode
              ? "border-zinc-700 text-white hover:bg-white hover:text-black focus-visible:ring-white focus-visible:ring-offset-zinc-950"
              : "border-zinc-300 text-black hover:bg-black hover:text-white focus-visible:ring-black focus-visible:ring-offset-white"
          }`}
          aria-label={`Adicionar ${book.name} à lista de desejos`}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default React.memo(BookCard);