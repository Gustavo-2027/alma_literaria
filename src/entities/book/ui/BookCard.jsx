import React, { useMemo } from "react";
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

  const bookId = book?.id;
  const bookName = book?.name?.trim() || "Livro";
  const bookAuthor = book?.author?.trim() || "Autor não informado";
  const bookGenre = book?.genre?.trim() || "Categoria";
  const bookDescription = book?.description?.trim() || "";
  const bookImage = book?.image || "";
  const publicationYear = book?.publication_year || "Edição";

  const rating =
    typeof book?.rating === "number" ? book.rating.toFixed(1) : null;

  const formattedPrice = useMemo(() => {
    if (typeof formatPrice === "function") {
      return formatPrice(book?.price ?? 0);
    }

    return `R$ ${Number(book?.price ?? 0).toFixed(2)}`;
  }, [book?.price, formatPrice]);

  const handleAddToCartClick = () => {
    onAddToCart?.(book);
  };

  const handleAddToWishlistClick = () => {
    onAddToWishlist?.(book);
  };

  return (
    <article className="group">
      <Link
        to={`/book/${bookId}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white dark:focus-visible:ring-offset-zinc-950"
        aria-label={`Ver detalhes de ${bookName}`}
      >
        <div className={`overflow-hidden ${imageWrapperClass}`}>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={bookImage}
              alt={bookName}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />

            <span className="absolute left-3 top-3 bg-black/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
              {publicationYear}
            </span>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {bookDescription && (
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="line-clamp-3 text-xs leading-6 text-white/90">
                  {bookDescription}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 text-left">
          <h3
            className={`line-clamp-2 text-sm font-normal uppercase tracking-[0.18em] ${titleClass}`}
          >
            {bookName}
          </h3>

          <p className={`mt-2 text-sm ${subtitleClass}`}>{bookAuthor}</p>

          <p className={`mt-1 text-sm ${genreClass}`}>{bookGenre}</p>

          <div className="mt-3 flex items-center gap-2">
            <Star
              className="h-4 w-4 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />

            <span className={`text-sm ${subtitleClass}`}>
              {rating ?? "—"}
            </span>
          </div>

          <p className={`mt-4 text-sm ${priceClass}`}>{formattedPrice}</p>
        </div>
      </Link>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handleAddToCartClick}
          className={`inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 border border-black px-4 text-[11px] uppercase tracking-[0.22em] text-black transition duration-300 hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            darkMode
              ? "bg-white text-black hover:opacity-85 focus-visible:ring-white focus-visible:ring-offset-zinc-950"
              : "bg-black text-white hover:opacity-85 focus-visible:ring-black focus-visible:ring-offset-white"
          }`}
          aria-label={`Adicionar ${bookName} ao carrinho`}
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          Adicionar
        </button>

        <button
          type="button"
          onClick={handleAddToWishlistClick}
          className={`inline-flex min-h-[50px] min-w-[50px] items-center justify-center border transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            darkMode
              ? "border-zinc-700 text-white hover:bg-white hover:text-black focus-visible:ring-white focus-visible:ring-offset-zinc-950"
              : "border-zinc-300 text-black hover:bg-black hover:text-white focus-visible:ring-black focus-visible:ring-offset-white"
          }`}
          aria-label={`Adicionar ${bookName} à lista de desejos`}
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default React.memo(BookCard);