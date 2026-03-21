import { Trash2, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { adjustQuantity, removeFromCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import useDarkModeContext from "../../hooks/useDarkModeContext";

export default function CartItems() {
  const { darkMode } = useDarkModeContext();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleAdjustQuantity = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(adjustQuantity({ id, quantity }));
    }
  };

  const formatPrice = (price) =>
    price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  if (!items.length) {
    return (
      <section className="mx-auto max-w-6xl">
        <div
          className={`border px-6 py-16 text-center ${
            darkMode
              ? "border-zinc-800 bg-black text-white"
              : "border-zinc-200 bg-white text-black"
          }`}
        >
          <h2 className="text-lg font-light uppercase tracking-[0.28em]">
            Seu carrinho está vazio
          </h2>
          <p
            className={`mx-auto mt-4 max-w-xl text-sm leading-7 ${
              darkMode ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Adicione alguns livros para continuar sua experiência na Alma
            Literária.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      <div className="space-y-0">
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`grid grid-cols-1 gap-6 border-b py-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center ${
              darkMode ? "border-zinc-800 text-white" : "border-zinc-200 text-black"
            } ${index === 0 ? "border-t" : ""}`}
          >
            <button
              type="button"
              onClick={() => navigate(`/book/${item.id}`)}
              className="flex items-start gap-5 text-left"
            >
              <div
                className={`flex h-36 w-28 shrink-0 items-center justify-center overflow-hidden ${
                  darkMode ? "bg-zinc-950" : "bg-zinc-100"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                />
              </div>

              <div className="min-w-0 pt-1">
                <h3 className="line-clamp-2 text-sm font-normal uppercase tracking-[0.2em] sm:text-base">
                  {item.name}
                </h3>

                <p
                  className={`mt-3 text-sm ${
                    darkMode ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {item.author}
                </p>

                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {formatPrice(item.price)} cada
                </p>
              </div>
            </button>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:justify-end lg:gap-8">
              <div className="flex items-center gap-3">
                <span
                  className={`text-[11px] uppercase tracking-[0.18em] ${
                    darkMode ? "text-zinc-500" : "text-zinc-400"
                  }`}
                >
                  Quantidade
                </span>

                <div
                  className={`inline-flex items-center border ${
                    darkMode
                      ? "border-zinc-700 bg-black"
                      : "border-zinc-300 bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleAdjustQuantity(item.id, item.quantity - 1)
                    }
                    className={`flex h-11 w-11 items-center justify-center transition ${
                      darkMode
                        ? "hover:bg-zinc-900"
                        : "hover:bg-zinc-100"
                    }`}
                    aria-label={`Diminuir quantidade de ${item.name}`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="flex min-w-12 items-center justify-center text-sm">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleAdjustQuantity(item.id, item.quantity + 1)
                    }
                    className={`flex h-11 w-11 items-center justify-center transition ${
                      darkMode
                        ? "hover:bg-zinc-900"
                        : "hover:bg-zinc-100"
                    }`}
                    aria-label={`Aumentar quantidade de ${item.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 sm:justify-end">
                <div className="text-right">
                  <p
                    className={`text-[11px] uppercase tracking-[0.18em] ${
                      darkMode ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    Subtotal
                  </p>
                  <p className="mt-1 text-lg font-light tracking-[0.04em]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className={`flex h-11 w-11 items-center justify-center border transition ${
                    darkMode
                      ? "border-zinc-700 text-white hover:bg-white hover:text-black"
                      : "border-zinc-300 text-black hover:bg-black hover:text-white"
                  }`}
                  aria-label={`Remover ${item.name} do carrinho`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}