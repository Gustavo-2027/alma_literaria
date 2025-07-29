import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/cartSlice";
import BooksGrid from "../components/BooksGrid";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import useDarkModeContext from "../hooks/useDarkModeContext";

export default function Home() {
  const { darkMode } = useDarkModeContext();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser({ email: user.email }));
    }
  }, [user, dispatch]);

  return (
    <div>
      <Nav />

      <Banner />

      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-8 lg:px-12 text-center">
        <h2
          className={`text-3xl font-light uppercase tracking-wider mb-4 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Bem-vindo à Alma Literária
        </h2>
        <p
          className={`text-lg font-light max-w-3xl mx-auto ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Nossa curadoria reúne as obras mais marcantes da literatura,
          convidando você a mergulhar em histórias que transcendem o tempo.
        </p>
      </section>

      <main>
        <BooksGrid />
      </main>

      <footer
        className={`text-center py-6 border-t mt-12 ${
          darkMode
            ? "bg-gradient-to-b from-gray-800 to-black text-white border-gray-700"
            : "bg-gradient-to-b from-gray-100 to-white text-gray-800 border-gray-200"
        }`}
      >
        <p className="text-sm font-light">
          © 2025 Alma Literária. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}