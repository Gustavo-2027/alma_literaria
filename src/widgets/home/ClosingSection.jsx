import { Link } from "react-router-dom";

const EXPERIENCE_ITEMS = [
  {
    title: "Menos ruído visual",
    description:
      "Uma interface mais silenciosa, elegante e respirável, com mais ritmo e clareza.",
  },
  {
    title: "Mais contexto para escolher",
    description:
      "A leitura começa antes da compra, com curadoria, recortes e uma apresentação mais cuidadosa.",
  },
  {
    title: "Base pronta para evoluir",
    description:
      "Uma estrutura preparada para receber filtros, pesquisa, coleções e experiências mais premium.",
  },
];

function SectionHeader({
  eyebrow,
  title,
  description,
  darkMode,
  align = "left",
}) {
  const eyebrowTextClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const titleTextClass = darkMode ? "text-white" : "text-black";
  const descriptionTextClass = darkMode ? "text-zinc-400" : "text-zinc-500";

  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow ? (
        <p
          className={`mb-5 text-[10px] uppercase tracking-[0.36em] ${eyebrowTextClass}`}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`text-3xl font-light leading-[1.08] tracking-[0.04em] sm:text-4xl lg:text-5xl ${titleTextClass}`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-6 max-w-2xl text-sm leading-8 sm:text-base ${descriptionTextClass} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryLink({ to, children, darkMode }) {
  const buttonClass = darkMode
    ? "bg-white text-black hover:opacity-85"
    : "bg-black text-white hover:opacity-85";

  return (
    <Link
      to={to}
      className={`inline-flex min-h-[56px] items-center justify-center px-10 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:tracking-[0.34em] ${buttonClass}`}
    >
      {children}
    </Link>
  );
}

function SecondaryLink({ to, children, darkMode }) {
  const buttonClass = darkMode
    ? "border-zinc-700 text-white hover:bg-white hover:text-black"
    : "border-zinc-300 text-black hover:bg-black hover:text-white";

  return (
    <Link
      to={to}
      className={`inline-flex min-h-[56px] items-center justify-center border px-10 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 ${buttonClass}`}
    >
      {children}
    </Link>
  );
}

function ExperienceCard({ item, darkMode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-light leading-snug tracking-[0.03em]">
        {item.title}
      </h3>

      <p
        className={`mx-auto max-w-sm text-sm leading-8 ${
          darkMode ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        {item.description}
      </p>
    </div>
  );
}

export default function ClosingSection({
  darkMode,
  editorialHighlight,
  eyebrowClass,
  descriptionClass,
}) {
  if (!editorialHighlight) return null;

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-8 lg:px-12 lg:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          <div className="overflow-hidden">
            <img
              src={editorialHighlight.image}
              alt={editorialHighlight.name}
              loading="lazy"
              className="h-[32rem] w-full scale-[1.01] object-cover transition duration-700 ease-out hover:scale-[1.04] sm:h-[38rem] lg:h-[44rem]"
            />
          </div>

          <div>
            <p
              className={`mb-5 text-[10px] uppercase tracking-[0.36em] ${eyebrowClass}`}
            >
              Destaque editorial
            </p>

            <h2 className="max-w-2xl text-4xl font-light leading-[1.08] tracking-[0.04em] sm:text-5xl">
              {editorialHighlight.name}
            </h2>

            <p
              className={`mt-5 text-[11px] uppercase tracking-[0.28em] ${eyebrowClass}`}
            >
              {editorialHighlight.author}
            </p>

            <p
              className={`mt-8 max-w-2xl text-sm leading-8 sm:text-base ${descriptionClass}`}
            >
              {editorialHighlight.description}
            </p>

            <blockquote
              className={`mt-10 border-l pl-6 text-base font-light italic leading-8 ${
                darkMode
                  ? "border-zinc-800 text-zinc-300"
                  : "border-zinc-300 text-zinc-600"
              }`}
            >
              Uma leitura que amplia repertório, convida à permanência e reforça
              a ideia de uma experiência mais contemplativa.
            </blockquote>

            <div className="mt-12">
              <PrimaryLink
                to={`/book/${editorialHighlight.id}`}
                darkMode={darkMode}
              >
                Ver detalhes do livro
              </PrimaryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:px-12 lg:py-32">
        <SectionHeader
          darkMode={darkMode}
          eyebrow="Experiência Alma Literária"
          title="Uma interface pensada para valorizar leitura, contexto e descoberta."
          description="Menos estímulo comercial, mais direção visual. Menos ruído, mais permanência."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          {EXPERIENCE_ITEMS.map((item) => (
            <ExperienceCard
              key={item.title}
              item={item}
              darkMode={darkMode}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-8 lg:px-12">
        <blockquote
          className={`text-2xl font-light leading-relaxed italic sm:text-3xl ${
            darkMode ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          “A leitura do mundo precede a leitura da palavra.”
        </blockquote>

        <p
          className={`mt-6 text-[10px] uppercase tracking-[0.3em] ${eyebrowClass}`}
        >
          Paulo Freire
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <div
          className={`mb-12 h-px w-full ${darkMode ? "bg-zinc-900" : "bg-zinc-200"}`}
        />

        <div className="py-8 text-center sm:py-16">
          <p
            className={`mb-5 text-[10px] uppercase tracking-[0.36em] ${eyebrowClass}`}
          >
            Explorar catálogo
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-light leading-[1.08] tracking-[0.04em] sm:text-5xl lg:text-6xl">
            Continue a descoberta no catálogo completo da Alma Literária.
          </h2>

          <p
            className={`mx-auto mt-8 max-w-2xl text-sm leading-8 sm:text-base ${descriptionClass}`}
          >
            A Home apresenta a atmosfera da marca. O catálogo aprofunda essa
            experiência com toda a seleção disponível e abre espaço para uma
            navegação mais ampla, refinada e intencional.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <PrimaryLink to="/catalogo" darkMode={darkMode}>
              Acessar catálogo
            </PrimaryLink>

            <SecondaryLink to="/catalogo" darkMode={darkMode}>
              Descobrir livros
            </SecondaryLink>
          </div>
        </div>
      </section>
    </>
  );
}