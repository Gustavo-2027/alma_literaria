import React from "react";
import { Link } from "react-router-dom";

function BookCardCompact({ book, darkMode, formatPrice }) {
  const titleClass = darkMode ? "text-white" : "text-black";
  const authorClass = darkMode ? "text-zinc-400" : "text-zinc-500";
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
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={book.image}
              alt={book.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
            />
          </div>
        </div>

        <div className="pt-5 text-left">
          <h3
            className={`line-clamp-2 text-[15px] font-medium leading-6 tracking-[0.02em] ${titleClass}`}
          >
            {book.name}
          </h3>

          <p className={`mt-2 text-sm ${authorClass}`}>{book.author}</p>

          <p className={`mt-4 text-[15px] font-medium tracking-[0.01em] ${priceClass}`}>
            {formatPrice(book.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default React.memo(BookCardCompact);