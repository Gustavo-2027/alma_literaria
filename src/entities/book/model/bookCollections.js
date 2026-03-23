import { books } from "./booksData";
/* =========================
   HELPERS
========================= */
function safeBooks(list) {
  return Array.isArray(list) ? list : [];
}

function limitBooks(list, limit = 8) {
  return safeBooks(list).slice(0, limit);
}

function uniqueBooks(list) {
  const seen = new Set();

  return safeBooks(list).filter((book) => {
    if (!book?.id || seen.has(book.id)) return false;
    seen.add(book.id);
    return true;
  });
}

function selectBooksByPredicate(predicate, limit = 8) {
  return limitBooks(safeBooks(books).filter(predicate), limit);
}

function selectBooksByCollection(collection, limit = 8) {
  return selectBooksByPredicate(
    (book) => book.collection === collection,
    limit
  );
}

function selectBooksByCountry(country, limit = 8) {
  return selectBooksByPredicate((book) => book.country === country, limit);
}

function selectBooksByEra(era, limit = 8) {
  return selectBooksByPredicate((book) => book.era === era, limit);
}

function selectFeaturedBooks(limit = 8) {
  return selectBooksByPredicate((book) => Boolean(book.featured), limit);
}

function selectTopRatedBooks(limit = 8) {
  return limitBooks(
    [...safeBooks(books)].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
    limit
  );
}

function createCollection({ id, slug, title, description, books = [] }) {
  return {
    id,
    slug,
    title,
    description,
    books: limitBooks(uniqueBooks(books), 8),
  };
}

/* =========================
   COLLECTION DEFINITIONS
========================= */
const collectionDefinitions = [
  {
    id: "classicos-brasileiros",
    slug: "classicos-brasileiros",
    title: "Clássicos brasileiros",
    description:
      "Obras que ajudam a compreender linguagem, memória, identidade e país.",
    books: selectBooksByCountry("Brasil", 8),
  },
  {
    id: "classicos-internacionais",
    slug: "classicos-internacionais",
    title: "Clássicos internacionais",
    description:
      "Livros que atravessaram o tempo e continuam formando leitores.",
    books: selectBooksByCollection("classicos-internacionais", 8),
  },
  {
    id: "ficcao-para-ler-devagar",
    slug: "ficcao-para-ler-devagar",
    title: "Ficção para ler devagar",
    description:
      "Narrativas que pedem menos pressa e mais permanência na linguagem.",
    books: selectBooksByCollection("ficcao-para-ler-devagar", 8),
  },
  {
    id: "grandes-jornadas",
    slug: "grandes-jornadas",
    title: "Grandes jornadas",
    description:
      "Livros de travessia, imaginação e mundo expandido.",
    books: selectBooksByCollection("grandes-jornadas", 8),
  },
  {
    id: "modernos-essenciais",
    slug: "modernos-essenciais",
    title: "Modernos essenciais",
    description:
      "Uma seleção de obras modernas que seguem vivas, fortes e atuais.",
    books: selectBooksByEra("moderno", 8),
  },
  {
    id: "contemporaneos-curados",
    slug: "contemporaneos-curados",
    title: "Contemporâneos curados",
    description:
      "Leituras recentes ou modernas tardias escolhidas com direção editorial.",
    books: selectBooksByEra("contemporaneo", 8),
  },
  {
    id: "destaques-editoriais",
    slug: "destaques-editoriais",
    title: "Destaques editoriais",
    description:
      "Livros que definem o tom da curadoria da Alma Literária.",
    books: selectFeaturedBooks(8),
  },
  {
    id: "mais-bem-avaliados",
    slug: "mais-bem-avaliados",
    title: "Mais bem avaliados",
    description:
      "Uma seleção de obras com alta recepção e forte permanência crítica.",
    books: selectTopRatedBooks(8),
  },
];

/* =========================
   EXPORT
========================= */
export const bookCollections = collectionDefinitions.map(createCollection);