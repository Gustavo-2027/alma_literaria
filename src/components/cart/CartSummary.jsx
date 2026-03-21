import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { clearCart } from "../../redux/slices/cartSlice";
import useDarkModeContext from "../../hooks/useDarkModeContext";

export default function CartSumary() {
  const { darkMode } = useDarkModeContext();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal =
    items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const orderNumber = useMemo(() => {
    return `AL-${Math.floor(100000 + Math.random() * 900000)}`;
  }, [showSuccess]);

  const formatPrice = (value) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const handleCheckout = () => {
    if (!items?.length) return;
    setShowSuccess(true);
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    dispatch(clearCart());
  };

  const handleContinue = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <aside
        className={`mt-10 border p-8 ${
          darkMode
            ? "border-zinc-800 bg-black text-white"
            : "border-zinc-200 bg-white text-black"
        }`}
      >
        <h2 className="mb-8 text-lg font-light uppercase tracking-[0.28em]">
          Resumo do Pedido
        </h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span
              className={`uppercase tracking-[0.14em] ${
                darkMode ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Subtotal
            </span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span
              className={`uppercase tracking-[0.14em] ${
                darkMode ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Frete
            </span>
            <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
          </div>
        </div>

        <div
          className={`my-6 border-t ${
            darkMode ? "border-zinc-800" : "border-zinc-200"
          }`}
        />

        <div className="mb-8 flex items-end justify-between">
          <span className="text-xs uppercase tracking-[0.18em] opacity-70">
            Total
          </span>
          <span className="text-2xl font-light tracking-wide">
            {formatPrice(total)}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={!items?.length}
          className={`w-full min-h-[54px] text-xs uppercase tracking-[0.22em] transition ${
            !items?.length
              ? darkMode
                ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
                : "cursor-not-allowed bg-zinc-200 text-zinc-400"
              : darkMode
              ? "bg-white text-black hover:opacity-85"
              : "bg-black text-white hover:opacity-85"
          }`}
        >
          Finalizar Compra
        </button>

        {subtotal > 0 && subtotal < 150 && (
          <p
            className={`mt-6 text-center text-xs ${
              darkMode ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            Frete grátis acima de {formatPrice(150)}
          </p>
        )}
      </aside>

      <div
        className={`fixed inset-0 z-[999] flex items-center justify-center px-4 transition-all duration-300 ${
          showSuccess
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!showSuccess}
      >
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

        <div
          className={`relative w-full max-w-lg border p-8 text-center transition-all duration-300 sm:p-10 ${
            showSuccess ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
          } ${
            darkMode
              ? "border-zinc-800 bg-black text-white"
              : "border-zinc-200 bg-white text-black"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-current/15">
            <Check className="h-6 w-6" />
          </div>

          <p
            className={`mb-3 text-[11px] uppercase tracking-[0.3em] ${
              darkMode ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            Pedido confirmado
          </p>

          <h3
            id="success-title"
            className="text-2xl font-light uppercase tracking-[0.16em] sm:text-3xl"
          >
            Compra finalizada
          </h3>

          <p
            className={`mx-auto mt-5 max-w-md text-sm leading-7 sm:text-base ${
              darkMode ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Sua seleção foi confirmada com sucesso. Em breve, seus novos
            clássicos farão parte da sua coleção.
          </p>

          <div
            className={`mx-auto mt-8 max-w-sm border-y px-4 py-5 ${
              darkMode ? "border-zinc-800" : "border-zinc-200"
            }`}
          >
            <div className="flex items-center justify-between text-sm">
              <span
                className={`uppercase tracking-[0.18em] ${
                  darkMode ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                Pedido
              </span>
              <span>{orderNumber}</span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span
                className={`uppercase tracking-[0.18em] ${
                  darkMode ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                Total
              </span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/home"
              onClick={handleContinue}
              className={`inline-flex min-h-[50px] items-center justify-center px-8 text-xs uppercase tracking-[0.22em] transition ${
                darkMode
                  ? "bg-white text-black hover:opacity-85"
                  : "bg-black text-white hover:opacity-85"
              }`}
            >
              Continuar explorando
            </Link>

            <button
              onClick={handleCloseModal}
              className={`inline-flex min-h-[50px] items-center justify-center border px-8 text-xs uppercase tracking-[0.22em] transition ${
                darkMode
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}