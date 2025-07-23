import { useSelector } from "react-redux";
import useDarkModeContext from "../hooks/useDarkModeContext";

export default function ResumeCart() {
  const { darkMode } = useDarkModeContext();
  const items = useSelector((state) => state.cart.items);
  const handleCheckout = () => {
    alert("parabéns pela compra 🥳");
  };

  const subtotal = items
    ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const shipping = 15.0; // Frete fixo de R$ 10,00
  const total = subtotal + shipping;

  return (
    <div
      className={`mt-8 p-6 rounded-lg shadow-md ${
        darkMode
          ? "bg-gradient-to-b from-gray-100 to-white text-gray-800"
          : "bg-gradient-to-b from-black/90 to-black/95 text-white"
      }`}
    >
      <h2 className="text-xl font-light uppercase tracking-wide  mb-4">
        Resumo do Pedido
      </h2>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-light ">Subtotal</span>
        <span className="text-sm font-light ">R$ {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-light ">Frete</span>
        <span className="text-sm font-light ">R$ {shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-medium text-lg mt-4">
        <span>Total</span>
        <span className="font-bold">R$ {total.toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}
        className={`w-full mt-6 text-sm font-light py-3 px-6 uppercase tracking-wide rounded-lg cursor-pointer hover:opacity-80 duration-500 ${
          darkMode
            ? "bg-gradient-to-b from-black/90 to-black/95 text-white"
            : "bg-gradient-to-b from-gray-100 to-white text-black"
        }`}
        aria-label="Finalizar compra"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
