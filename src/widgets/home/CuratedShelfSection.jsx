import { Link } from "react-router-dom";
import Reveal from "../../shared/ui/Reveal";

/* =========================
   HELPERS
========================= */
function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function sectionTextClasses(darkMode) {
  return {
    eyebrow: darkMode ? "text-zinc-500" : "text-zinc-400",
    description: darkMode ? "text-zinc-400" : "text-zinc-500",
    muted: darkMode ? "text-zinc-600" : "text-zinc-400",
    emphasis: darkMode ? "text-zinc-300" : "text-zinc-700",
    panel: darkMode ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-zinc-50",
    border: darkMode ? "border-zinc-800" : "border-zinc-200",
    surface: darkMode ? "bg-zinc-950" : "bg-zinc-50",
  };
}

function sectionWrapperClass(extraClass = "") {
  return `mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:px-12 lg:py-32 ${extraClass}`.trim();
}

/* =========================
   SHARED UI
========================= */
function SectionHeader({
  eyebrow,
  title,
  description,
  darkMode,
  align = "left",
}) {
  const text = sectionTextClasses(darkMode);

  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow ? (
        <p
          className={`mb-5 text-[10px] uppercase tracking-[0.36em] ${text.eyebrow}`}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl font-light leading-[1.08] tracking-[0.04em] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-6 max-w-2xl text-sm leading-8 sm:text-base ${text.description}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryLink({ to, children, darkMode, className = "" }) {
  const themeClass = darkMode
    ? "bg-white text-black hover:opacity-85"
    : "bg-black text-white hover:opacity-85";

  return (
    <Link
      to={to}
      className={`inline-flex min-h-[56px] items-center justify-center px-10 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:tracking-[0.34em] ${themeClass} ${className}`}
    >
      {children}
    </Link>
  );
}

/* =========================
   BOOK CARD
========================= */
function BookCard({
  book,
  darkMode,
  label = "Curadoria da semana",
  showDescription = false,
}) {
  const text = sectionTextClasses(darkMode);

  if (!book) return null;

  return (
    <Link
      to={`/book/${book.id}`}
      className="group block transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="overflow-hidden">
        <img
          src={book.image}
          alt={book.name}
          loading="lazy"
          className="h-[26rem] w-full scale-[1.01] object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>

      <div className="mt-6 space-y-2">
        <p className={`text-[10px] uppercase tracking-[0.32em] ${text.eyebrow}`}>
          {label}
        </p>

        <h3 className="text-2xl font-light leading-snug tracking-[0.03em] transition duration-500 group-hover:opacity-70">
          {book.name}
        </h3>

        <p className={`text-sm ${text.description}`}>{book.author}</p>

        {showDescription ? (
          <p className={`line-clamp-3 pt-2 text-sm leading-7 ${text.description}`}>
            {book.description}
          </p>
        ) : null}

        <p
          className={`pt-2 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 group-hover:tracking-[0.34em] ${text.emphasis}`}
        >
          Ver detalhes
        </p>
      </div>
    </Link>
  );
}

/* =========================
   READING OF THE WEEK
========================= */
function ReadingWeekCard({ book, darkMode }) {
  const text = sectionTextClasses(darkMode);

  if (!book) return null;

  return (
    <article
      className={`grid grid-cols-1 overflow-hidden border lg:grid-cols-[0.78fr_1.22fr] ${text.panel}`}
    >
      <div className="overflow-hidden">
        <img
          src={book.image}
          alt={book.name}
          loading="lazy"
          className="h-[30rem] w-full scale-[1.01] object-cover transition duration-700 ease-out hover:scale-[1.04] sm:h-[36rem] lg:h-full"
        />
      </div>

      <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-14">
        <div>
          <p className={`text-[10px] uppercase tracking-[0.34em] ${text.eyebrow}`}>
            Leitura da semana
          </p>

          <h3 className="mt-5 max-w-2xl text-3xl font-light leading-[1.04] tracking-[0.04em] sm:text-4xl lg:text-5xl">
            {book.name}
          </h3>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className={`text-[11px] uppercase tracking-[0.24em] ${text.eyebrow}`}>
              {book.author}
            </p>

            {book.moods?.[0] ? (
              <span className={`text-[10px] uppercase tracking-[0.28em] ${text.eyebrow}`}>
                Atmosfera: {book.moods[0]}
              </span>
            ) : null}
          </div>

          <p className={`mt-8 max-w-xl text-sm leading-8 sm:text-base ${text.description}`}>
            {book.description}
          </p>

          <blockquote
            className={`mt-10 border-l pl-5 text-base font-light italic leading-8 ${
              darkMode ? "border-zinc-700" : "border-zinc-300"
            } ${text.emphasis}`}
          >
            Uma leitura para desacelerar, permanecer mais tempo na linguagem e
            transformar a semana em um espaço de atenção.
          </blockquote>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <PrimaryLink to={`/book/${book.id}`} darkMode={darkMode}>
            Ler com calma
          </PrimaryLink>

          <span className={`text-[10px] uppercase tracking-[0.28em] ${text.eyebrow}`}>
            Recomendação editorial
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================
   COLLECTION CARD
========================= */
function EditorialCollectionCard({ item, index, darkMode }) {
  const text = sectionTextClasses(darkMode);

  return (
    <article className="group transition-all duration-500 hover:-translate-y-1 hover:opacity-75">
      <span className={`text-[10px] uppercase tracking-[0.3em] ${text.muted}`}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-5 text-2xl font-light leading-snug tracking-[0.04em]">
        {item.title}
      </h3>

      <p className={`mt-4 max-w-sm text-sm leading-8 ${text.description}`}>
        {item.description}
      </p>
    </article>
  );
}

/* =========================
   ATMOSPHERE CARD
========================= */
function AtmosphereCard({ item, darkMode }) {
  const hoverClass = darkMode
    ? "border-zinc-800 hover:bg-white hover:text-black"
    : "border-zinc-200 hover:bg-black hover:text-white";

  const descriptionClass = darkMode
    ? "text-zinc-500 group-hover:text-zinc-700"
    : "text-zinc-500 group-hover:text-zinc-300";

  return (
    <Link
      to={`/catalogo?atmosfera=${item.slug}`}
      className={`group border p-8 transition-all duration-500 hover:-translate-y-1 ${hoverClass}`}
    >
      <p className="text-sm uppercase tracking-[0.28em]">{item.title}</p>

      <p
        className={`mt-4 max-w-xs text-sm leading-7 transition-colors duration-500 ${descriptionClass}`}
      >
        {item.description}
      </p>

      <span className="mt-6 block text-[10px] uppercase tracking-[0.28em] opacity-70">
        Explorar leituras nesse ritmo
      </span>
    </Link>
  );
}

/* =========================
   MAIN SECTION
========================= */
export default function CuratedShelfSection({
  darkMode,
  featuredBooks = [],
  readingOfTheWeek = null,
  brazilianClassics = [],
  editorialCollections = [],
  atmosphereCards = [],
}) {
  const text = sectionTextClasses(darkMode);

  const featured = safeArray(featuredBooks);
  const classics = safeArray(brazilianClassics);
  const collections = safeArray(editorialCollections);
  const atmospheres = safeArray(atmosphereCards);

  return (
    <>
      <Reveal as="section" className={sectionWrapperClass()}>
        <div id="curadoria">
          <SectionHeader
            darkMode={darkMode}
            eyebrow="Curadoria da semana"
            title="Uma seleção enxuta para começar a descoberta."
            description="A Home não precisa mostrar tudo. Ela deve apresentar recortes mais claros, mais belos e mais intencionais."
          />

          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((book) => (
              <BookCard key={book.id} book={book} darkMode={darkMode} />
            ))}
          </div>

          <div className="mt-14">
            <PrimaryLink to="/catalogo" darkMode={darkMode}>
              Ver catálogo completo
            </PrimaryLink>
          </div>
        </div>
      </Reveal>

      {readingOfTheWeek ? (
        <Reveal className={sectionWrapperClass()}>
          <SectionHeader
            darkMode={darkMode}
            eyebrow="Leitura da semana"
            title="Uma escolha para desacelerar a leitura."
            description="Mais do que um destaque, esta é uma recomendação para acompanhar a semana com atenção, linguagem e permanência."
          />

          <div className="mt-16">
            <ReadingWeekCard book={readingOfTheWeek} darkMode={darkMode} />
          </div>
        </Reveal>
      ) : null}

      <Reveal className={sectionWrapperClass()}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <SectionHeader
            darkMode={darkMode}
            eyebrow="Literatura brasileira"
            title="Clássicos que ajudam a compreender o Brasil."
            description="Uma seleção de obras que atravessam gerações e revelam aspectos profundos da experiência brasileira."
          />

          <div className="lg:justify-self-end">
            <PrimaryLink to="/catalogo" darkMode={darkMode}>
              Explorar seleção
            </PrimaryLink>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-4">
          {classics.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              darkMode={darkMode}
              label="Clássico brasileiro"
              showDescription
            />
          ))}
        </div>
      </Reveal>

      <Reveal className={sectionWrapperClass(text.surface)}>
        <SectionHeader
          darkMode={darkMode}
          eyebrow="Coleções editoriais"
          title="Caminhos de leitura pensados por repertório e intenção."
          description="Essas entradas funcionam como convites mais sensíveis para explorar leituras com identidade própria."
        />

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3">
          {collections.map((item, index) => (
            <EditorialCollectionCard
              key={item.id}
              item={item}
              index={index}
              darkMode={darkMode}
            />
          ))}
        </div>
      </Reveal>

    </>
  );
}