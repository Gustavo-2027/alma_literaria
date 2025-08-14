import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/cartSlice";
import useDarkModeContext from "../hooks/useDarkModeContext";
import { userInformations } from "../components/Users";

// * Carregamento via lazzy (foco em aumentar o tempo de respota dos componentes)
const Nav = lazy(() => import("../components/Nav"));
const Banner = lazy(() => import("../components/Banner"));
const BooksGrid = lazy(() => import("../components/BooksGrid"));

export default function Home() {
  const { darkMode } = useDarkModeContext();
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const currentUser = userInformations.find(
    (user) => user.email === authUser?.email
  );

  useEffect(() => {
    if (authUser) {
      dispatch(setUser({ email: authUser.email }));
    }
  }, [authUser, dispatch]);
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
          Bem-vindo à Alma Literária, {currentUser?.name || "Visitante"}
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
            ? "bg-gradient-to-b from-gray-100 to-white text-gray-800"
            : "bg-gradient-to-b from-black/95 to-black text-white"
        }`}
      >
        <p className="text-sm font-light">
          © 2025 Alma Literária. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
