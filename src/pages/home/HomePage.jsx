import { lazy, Suspense, useEffect, useMemo } from "react";

import useTheme from "../../features/theme/model/useTheme";
import { books } from "../../entities/book/model/booksData";
import { userInformations } from "../../entities/user/model/userData";
import {
  bookAtmospheres,
  atmosphereHighlights,
} from "../../entities/book/model/bookAtmospheres";
import { bookCollections } from "../../entities/book/model/bookCollections";

import HeroIntro from "../../widgets/home/HeroIntro";
import ManifestoSection from "../../widgets/home/ManifestoSection";
import CuratedShelfSection from "../../widgets/home/CuratedShelfSection";
import ClosingSection from "../../widgets/home/ClosingSection";
import Nav from "../../widgets/layout/Nav";
import Banner from "../../widgets/books/ui/Banner";

const Footer = lazy(() => import("../../widgets/layout/Footer"));

const EXPERIENCE_ITEMS = [
  {
    title: "Curadoria cuidadosa",
    description:
      "Seleções refinadas que priorizam relevância cultural, profundidade e permanência literária.",
  },
  {
    title: "Descoberta intencional",
    description:
      "Uma experiência limpa e silenciosa, reduzindo ruído e ampliando o foco na leitura.",
  },
  {
    title: "Evolução contínua",
    description:
      "Estrutura preparada para crescimento com coleções, filtros inteligentes e jornadas editoriais.",
  },
];

const ALLOWED_COLLECTION_SLUGS = new Set([
  "classicos-brasileiros",
  "classicos-internacionais",
  "ficcao-para-ler-devagar",
]);


const usersByEmail = new Map(
  (userInformations ?? []).map((user) => [user.email, user]),
);

const collectionsBySlug = new Map(
  (bookCollections ?? []).map((collection) => [collection?.slug, collection]),
);

function FooterSkeleton() {
  return <div className="h-24 w-full" />;
}

function getSafeBooks(collection, fallback = []) {
  return Array.isArray(collection?.books) && collection.books.length > 0
    ? collection.books
    : fallback;
}

function getReadingOfTheWeek() {
  const slowCollection = collectionsBySlug.get("ficcao-para-ler-devagar");
  const slowBooks = getSafeBooks(slowCollection, []);

  if (!slowBooks.length) {
    return atmosphereHighlights?.slowReading?.[0] ?? books?.[0] ?? null;
  }

  let bestBooks = [...slowBooks].sort((a, b) => {
    const scoreA = (a.featured ? 2 : 0) + (a.rating ?? 0);
    const scoreB = (b.featured ? 2 : 0) + (b.rating ?? 0);
    return scoreB - scoreA;
  });

  const index = new Date().getDate() % bestBooks.length;
  return bestBooks[index] ?? null;
}

function getEditorialHighlight() {
  const editorialCollection = collectionsBySlug.get("destaques-editoriais");

  return (
    atmosphereHighlights?.featured?.[1] ??
    getSafeBooks(editorialCollection)[0] ??
    books?.[3] ??
    books?.[0] ??
    null
  );
}

function getBrazilianClassics() {
  const collection = collectionsBySlug.get("classicos-brasileiros");

  return getSafeBooks(collection, atmosphereHighlights?.brazilian ?? []).slice(
    0,
    4,
  );
}

function getEditorialCollections() {
  if (!Array.isArray(bookCollections)) return [];

  return bookCollections
    .filter((item) => ALLOWED_COLLECTION_SLUGS.has(item?.slug))
    .slice(0, 3);
}

export default function HomePage() {
  const { darkMode } = useTheme();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const authUserEmail = null; // substitua pelo seletor correto do auth, se necessário

  const currentUser = useMemo(() => {
    if (!authUserEmail) return null;
    return usersByEmail.get(authUserEmail) ?? null;
  }, [authUserEmail]);

  const featuredBooks = useMemo(
    () => atmosphereHighlights?.featured?.slice(0, 3) ?? books.slice(0, 3),
    [],
  );

  const readingOfTheWeek = useMemo(() => getReadingOfTheWeek(), []);
  const editorialHighlight = useMemo(() => getEditorialHighlight(), []);
  const brazilianClassics = useMemo(() => getBrazilianClassics(), []);
  const editorialCollections = useMemo(() => getEditorialCollections(), []);
  const atmosphereCards = useMemo(
    () => (Array.isArray(bookAtmospheres) ? bookAtmospheres.slice(0, 6) : []),
    [],
  );

  const ui = useMemo(
    () => ({
      wrapper: darkMode ? "bg-black text-white" : "bg-white text-black",
      eyebrow: darkMode ? "text-zinc-500" : "text-zinc-400",
      divider: darkMode ? "bg-zinc-800" : "bg-zinc-200",
      description: darkMode ? "text-zinc-400" : "text-zinc-500",
      subtleLine: darkMode ? "bg-zinc-900" : "bg-zinc-200",
    }),
    [darkMode],
  );

  return (
    <div className={`min-h-screen ${ui.wrapper}`}>
      <Nav />
      <Banner />

      <main>
        <HeroIntro darkMode={darkMode} currentUser={currentUser} />

        <ManifestoSection
          darkMode={darkMode}
          experienceItems={EXPERIENCE_ITEMS}
        />

        <CuratedShelfSection
          darkMode={darkMode}
          featuredBooks={featuredBooks}
          readingOfTheWeek={readingOfTheWeek}
          brazilianClassics={brazilianClassics}
          editorialCollections={editorialCollections}
          atmosphereCards={atmosphereCards}
        />

        <ClosingSection
          darkMode={darkMode}
          editorialHighlight={editorialHighlight}
          eyebrowClass={ui.eyebrow}
          descriptionClass={ui.description}
        />
      </main>

      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}
