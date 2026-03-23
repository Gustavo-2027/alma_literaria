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

function selectBooksByMood(mood, limit = 8) {
  return selectBooksByPredicate(
    (book) => Array.isArray(book.moods) && book.moods.includes(mood),
    limit
  );
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

function selectFeaturedBooks(limit = 8) {
  return selectBooksByPredicate((book) => Boolean(book.featured), limit);
}

function composeBookSelection(selectors = [], limit = 8) {
  const mergedBooks = selectors.flatMap((selector) => selector());
  return limitBooks(uniqueBooks(mergedBooks), limit);
}

function createAtmosphere({
  id,
  slug,
  title,
  description,
  moodKeys = [],
  books = [],
}) {
  return {
    id,
    slug,
    title,
    description,
    moodKeys,
    books: limitBooks(uniqueBooks(books), 8),
  };
}

/* =========================
   ATMOSPHERES
========================= */
export const bookAtmospheres = [
  createAtmosphere({
    id: "silencio",
    slug: "para-ler-em-silencio",
    title: "Para ler em silêncio",
    description:
      "Livros que pedem pausa, atenção e uma leitura mais interior.",
    moodKeys: ["contemplativo", "introspectivo"],
    books: composeBookSelection([
      () => selectBooksByMood("contemplativo", 4),
      () => selectBooksByMood("introspectivo", 4),
    ]),
  }),

  createAtmosphere({
    id: "fim-da-noite",
    slug: "no-fim-da-noite",
    title: "No fim da noite",
    description:
      "Narrativas que ganham mais força quando tudo desacelera ao redor.",
    moodKeys: ["introspectivo", "sombrio"],
    books: composeBookSelection([
      () => selectBooksByMood("introspectivo", 4),
      () => selectBooksByMood("sombrio", 4),
    ]),
  }),

  createAtmosphere({
    id: "desacelerar",
    slug: "quando-voce-quer-desacelerar",
    title: "Quando você quer desacelerar",
    description:
      "Leituras que afastam o excesso de ruído e devolvem ritmo à atenção.",
    moodKeys: ["contemplativo", "reflexivo"],
    books: composeBookSelection([
      () => selectBooksByMood("contemplativo", 4),
      () => selectBooksByMood("reflexivo", 4),
    ]),
  }),

  createAtmosphere({
    id: "densas",
    slug: "leituras-densas-e-profundas",
    title: "Leituras densas e profundas",
    description:
      "Obras que exigem presença, permanência e pensamento mais demorado.",
    moodKeys: ["denso", "filosofico"],
    books: composeBookSelection([
      () => selectBooksByMood("denso", 4),
      () => selectBooksByMood("filosofico", 4),
    ]),
  }),

  createAtmosphere({
    id: "reverberam",
    slug: "para-pensar-por-dias",
    title: "Para pensar por dias",
    description:
      "Livros que não terminam na última página e continuam ecoando.",
    moodKeys: ["reflexivo", "filosofico"],
    books: composeBookSelection([
      () => selectBooksByMood("reflexivo", 4),
      () => selectBooksByMood("filosofico", 4),
    ]),
  }),

  createAtmosphere({
    id: "imersao",
    slug: "quando-o-mundo-pede-pausa",
    title: "Quando o mundo pede pausa",
    description:
      "Uma seleção para trocar velocidade por profundidade e presença.",
    moodKeys: ["imersivo", "contemplativo"],
    books: composeBookSelection([
      () => selectBooksByMood("imersivo", 4),
      () => selectBooksByMood("contemplativo", 4),
    ]),
  }),
];

/* =========================
   HIGHLIGHTS
========================= */
export const atmosphereHighlights = {
  featured: uniqueBooks(selectFeaturedBooks(6)),
  brazilian: uniqueBooks(selectBooksByCountry("Brasil", 6)),
  slowReading: uniqueBooks(selectBooksByCollection("ficcao-para-ler-devagar", 6)),
};