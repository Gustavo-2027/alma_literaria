import BooksGrid from "../components/BooksGrid";
import Nav from "../components/Nav";
import Banner from "../components/Banner";

export default function Home() {
  return (
    <div>
      <Nav />

      <Banner />
      
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-8 lg:px-12 text-center">
        <h2 className="text-3xl font-light uppercase tracking-wider mb-4">
          Bem-vindo à Alma Literária
        </h2>
        <p className="text-lg font-light text-gray-600 max-w-3xl mx-auto">
          Nossa curadoria reúne as obras mais marcantes da literatura,
          convidando você a mergulhar em histórias que transcendem o tempo.
        </p>
      </section>

      <main>
        <BooksGrid />
      </main>

      <footer className="text-center py-6 border-t border-gray-200 bg-black mt-12">
        <p className="text-sm font-light text-gray-100">
          © 2025 Alma Literária. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
