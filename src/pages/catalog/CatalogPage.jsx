import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import useDarkModeContext from "../../features/theme/model/useTheme";
import useReveal from "../../shared/hooks/useReveal";
import { books } from "../../entities/book/model/booksData";
import BooksGridSkeleton from "../../entities/book/ui/BooksGridSkeleton";
import CatalogToolbar from "../../features/catalog/ui/CatalogToolbar";
import EmptyState from "../../features/catalog/ui/EmptyState";
import Pagination from "../../features/catalog/ui/Pagination";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Nav = lazy(() => import("../../widgets/layout/Nav"));
const BooksGrid = lazy(() => import("../../entities/book/ui/BooksGrid"));
const Footer = lazy(() => import("../../widgets/layout/Footer"));

const BOOKS_PER_PAGE = 8;

const SORT_OPTIONS = [
  { value: "featured", label: "Destaques" },
  { value: "price-asc", label: "Preço: menor para maior" },
  { value: "price-desc", label: "Preço: maior para menor" },
  { value: "rating-desc", label: "Melhor avaliados" },
  { value: "title-asc", label: "Ordem alfabética" },
];

function SectionSkeleton({ darkMode, height = "h-24", className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full animate-pulse ${height} ${className} ${
        darkMode ? "bg-zinc-900" : "bg-zinc-100"
      }`}
    />
  );
}

function Reveal({ children, className = "", as: Component = "section" }) {
  const { ref, visible } = useReveal({
    threshold: 0.12,
    rootMargin: "0px 0px -32px 0px",
    once: true,
  });

  return (
    <Component
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </Component>
  );
}

function getThemeClasses(darkMode) {
  return {
    page: darkMode ? "bg-black text-white" : "bg-white text-black",
    subtleText: darkMode ? "text-zinc-500" : "text-zinc-400",
    bodyText: darkMode ? "text-zinc-400" : "text-zinc-500",
    divider: darkMode ? "border-zinc-900" : "border-zinc-200",
    softSurface: darkMode
      ? "bg-zinc-950 border-zinc-800"
      : "bg-zinc-50 border-zinc-200",
    badge: darkMode
      ? "border-zinc-800 bg-zinc-950 text-zinc-300"
      : "border-zinc-200 bg-zinc-50 text-zinc-600",
  };
}

function CatalogIntro({
  darkMode,
  subtleTextClass,
  bodyTextClass,
  dividerClass,
  resultsCount,
  currentPage,
  totalPages,
  hasActiveSearch,
  activeSearchLabel,
  sortBy,
}) {
  const activeSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ??
    "Destaques";

  const infoPills = [
    `${resultsCount} ${resultsCount === 1 ? "obra" : "obras"}`,
    `Página ${currentPage} de ${totalPages}`,
    activeSortLabel,
  ];

  if (hasActiveSearch && activeSearchLabel) {
    infoPills.push(`Busca: ${activeSearchLabel}`);
  }

  return (
    <Reveal className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <div className={`border-b pb-14 lg:pb-16 ${dividerClass}`}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,420px)] lg:items-end lg:gap-20">
          <div className="max-w-3xl">
            <p
              className={`mb-5 text-[10px] uppercase tracking-[0.34em] ${subtleTextClass}`}
            >
              Alma Literária — Catálogo
            </p>

            <h1 className="max-w-4xl text-3xl font-light leading-[1.02] tracking-[0.04em] sm:text-4xl lg:text-[3.5rem]">
              Explore uma seleção pensada para leitores que escolhem com
              intenção.
            </h1>

            <p
              className={`mt-7 max-w-2xl text-sm leading-8 sm:text-[15px] ${bodyTextClass}`}
            >
              Descubra clássicos, novas vozes e obras que permanecem. Um
              catálogo desenhado com respiro, ritmo e curadoria — para uma
              navegação mais clara, silenciosa e atenta.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {infoPills.map((item) => (
                <span
                  key={item}
                  className={`inline-flex min-h-[36px] items-center rounded-full border px-4 text-[10px] uppercase tracking-[0.22em] ${
                    darkMode
                      ? "border-zinc-800 bg-zinc-950 text-zinc-300"
                      : "border-zinc-200 bg-zinc-50 text-zinc-600"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full lg:justify-self-end">
            <CatalogToolbar
              value={hasActiveSearch ? activeSearchLabel : ""}
              onChange={() => {}}
              onClear={() => {}}
              resultsCount={resultsCount}
              darkMode={darkMode}
              activeSearchLabel={activeSearchLabel}
              sortBy={sortBy}
              onSortChange={() => {}}
              sortOptions={SORT_OPTIONS}
              onReset={() => {}}
              showReset={false}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Catalog() {
  const { darkMode } = useDarkModeContext();
  const theme = getThemeClasses(darkMode);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const normalizedSearchTerm = useMemo(
    () => searchTerm.trim().toLowerCase(),
    [searchTerm],
  );

  const filteredBooks = useMemo(() => {
    if (!normalizedSearchTerm) return books;

    return books.filter((book) => {
      const searchableContent = [
        book.name,
        book.author,
        book.genre,
        book.publisher,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(normalizedSearchTerm);
    });
  }, [normalizedSearchTerm]);

  const sortedBooks = useMemo(() => {
    const clonedBooks = [...filteredBooks];

    switch (sortBy) {
      case "price-asc":
        return clonedBooks.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

      case "price-desc":
        return clonedBooks.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

      case "rating-desc":
        return clonedBooks.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

      case "title-asc":
        return clonedBooks.sort((a, b) =>
          (a.name ?? "").localeCompare(b.name ?? "", "pt-BR", {
            sensitivity: "base",
          }),
        );

      case "featured":
      default:
        return clonedBooks;
    }
  }, [filteredBooks, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedBooks.length / BOOKS_PER_PAGE),
  );

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    return sortedBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [sortedBooks, currentPage]);

  const hasActiveSearch = normalizedSearchTerm.length > 0;
  const hasResults = sortedBooks.length > 0;
  const hasActiveControls = hasActiveSearch || sortBy !== "featured";

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
  }, []);

  const handleResetControls = useCallback(() => {
    setSearchTerm("");
    setSortBy("featured");
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${theme.page}`}
    >
      <Suspense
        fallback={
          <div className="px-4 pt-4 sm:px-6 lg:px-8">
            <SectionSkeleton darkMode={darkMode} height="h-16" />
          </div>
        }
      >
        <Nav />
      </Suspense>

      <main className="pt-20">
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
          <div className={`border-b pb-14 lg:pb-16 ${theme.divider}`}>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,420px)] lg:items-end lg:gap-20">
              <div className="max-w-3xl">
                <Link
                  to="/home"
                  className={`mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition ${
                    darkMode
                      ? "text-zinc-400 hover:text-white"
                      : "text-zinc-500 hover:text-black"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Voltar à biblioteca
                </Link>
                <p
                  className={`mb-5 text-[10px] uppercase tracking-[0.34em] ${theme.subtleText}`}
                >
                  Alma Literária — Catálogo
                </p>

                <h1 className="max-w-4xl text-3xl font-light leading-[1.02] tracking-[0.04em] sm:text-4xl lg:text-[3.5rem]">
                  Explore uma seleção pensada para leitores que escolhem com
                  intenção.
                </h1>

                <p
                  className={`mt-7 max-w-2xl text-sm leading-8 sm:text-[15px] ${theme.bodyText}`}
                >
                  Descubra clássicos, novas vozes e obras que permanecem. Um
                  catálogo desenhado com respiro, ritmo e curadoria.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span
                    className={`inline-flex min-h-[36px] items-center rounded-full border px-4 text-[10px] uppercase tracking-[0.22em] ${theme.badge}`}
                  >
                    {sortedBooks.length}{" "}
                    {sortedBooks.length === 1 ? "obra" : "obras"}
                  </span>

                  <span
                    className={`inline-flex min-h-[36px] items-center rounded-full border px-4 text-[10px] uppercase tracking-[0.22em] ${theme.badge}`}
                  >
                    Página {currentPage} de {totalPages}
                  </span>

                  {hasActiveSearch ? (
                    <span
                      className={`inline-flex min-h-[36px] items-center rounded-full border px-4 text-[10px] uppercase tracking-[0.22em] ${theme.badge}`}
                    >
                      Busca: {searchTerm.trim()}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="w-full lg:justify-self-end">
                <CatalogToolbar
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClear={handleClearSearch}
                  resultsCount={sortedBooks.length}
                  darkMode={darkMode}
                  activeSearchLabel={
                    hasActiveSearch ? searchTerm.trim() : undefined
                  }
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                  sortOptions={SORT_OPTIONS}
                  onReset={handleResetControls}
                  showReset={hasActiveControls}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8 lg:pt-12">
          {!hasResults ? (
            <div
              className={`border px-6 py-12 sm:px-10 sm:py-16 ${theme.softSurface}`}
            >
              <EmptyState
                title="Nenhum livro encontrado"
                description={
                  hasActiveSearch
                    ? "Tente buscar por outro título, autor, gênero ou editora. Termos mais curtos costumam ampliar a seleção."
                    : "Ainda não há livros disponíveis nesta seleção."
                }
                actionLabel={
                  hasActiveControls ? "Limpar filtros e busca" : undefined
                }
                onAction={hasActiveControls ? handleResetControls : undefined}
                eyebrow="Seleção"
              />
            </div>
          ) : (
            <>
              <Suspense
                fallback={
                  <div className="space-y-8">
                    <SectionSkeleton
                      darkMode={darkMode}
                      height="h-6"
                      className="max-w-[180px]"
                    />
                    <BooksGridSkeleton />
                  </div>
                }
              >
                <BooksGrid
                  books={paginatedBooks}
                  resultsCount={sortedBooks.length}
                  title="Obras disponíveis"
                  subtitle="Seleção"
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </Suspense>

              {totalPages > 1 ? (
                <div className="mt-20 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    darkMode={darkMode}
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
