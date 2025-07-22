import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Nav() {
  return (
    <header>
      <nav className="fixed top-0 left-0 w-full bg-black text-white py-4 px-4 sm:px-8 lg:px-12 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-light uppercase tracking-wider">
            Alma Literária
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-light uppercase hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-sm font-light uppercase hover:text-gray-300 transition-colors"
              aria-label="Ver Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              Carrinho
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
