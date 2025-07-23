import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import ItemsCart from "../components/ItemsCart";
import ResumeCart from "../components/ResumeCart";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);

  return (
    <>
      <Nav />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-8 lg:px-12 pt-20">
        <h1 className="text-3xl font-light uppercase tracking-wider mb-8">
          Seu Carrinho
        </h1>
        {!items || items.length === 0 ? (
          <p className="text-center text-lg font-light ">
            Seu carrinho está vazio.{" "}
            <Link to="/home" className=" hover:underline font-semibold">
              Volte para a loja
            </Link>
            .
          </p>
        ) : (
          <>
            {/* Lista de Itens */}
            <ItemsCart />

            {/* Resumo do Carrinho */}
            <ResumeCart />
          </>
        )}
      </main>
    </>
  );
}
