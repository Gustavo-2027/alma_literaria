import { Trash2, Plus, Minus, Link } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { adjustQuantity, removeFromCart } from "../redux/slices/cartSlice";
import useDarkModeContext from "../hooks/useDarkModeContext";
import { useNavigate } from "react-router-dom";

export default function ItemsCart() {
  const { darkMode } = useDarkModeContext();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleAdjustQuantity = (id, quantity) => {
    if (quantity >= 0) {
      dispatch(adjustQuantity({ id, quantity }));
    }
  };
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center justify-between p-4 rounded-lg shadow-md  cursor-pointer  ${
            darkMode
              ? "bg-gradient-to-b from-gray-100 to-white text-gray-800"
              : "bg-gradient-to-b from-black/90 to-black/95 text-white"
          }`}
        >
          <div
            className="flex items-center gap-4"
            onClick={() => navigate(`/book/${item.id}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-23 h-30 object-cover rounded"
            />
            <div>
              <h3 className="text-lg font-light uppercase tracking-wide ">
                {item.name}
              </h3>
              <p className="text-sm font-light ">{item.author}</p>
              <p className="text-sm font-light ">
                R$ {item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAdjustQuantity(item.id, item.quantity - 1)}
                className={`p-1 rounded-full focus:outline-none hover:scale-110 cursor-pointer ${
                  darkMode ? "bg-black text-white" : "bg-gray-200 text-black"
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span
                className={`text-md  ${darkMode ? "text-black" : "text-white"}`}
              >
                {item.quantity}
              </span>
              <button
                onClick={() => handleAdjustQuantity(item.id, item.quantity + 1)}
                className={`p-1 rounded-full focus:outline-none cursor-pointer hover:scale-110 ${
                  darkMode ? "bg-black text-white" : "bg-gray-200 text-black"
                }`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="p-2 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 transition-colors hover:scale-110"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <p className="text-sm font-light ">
              R$ {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
