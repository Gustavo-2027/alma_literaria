import { memo } from "react";
import { Link } from "react-router-dom";
import Reveal from "../../shared/ui/Reveal";
import {
  Divider,
  PrimaryLink,
  SectionContainer,
  SectionDescription,
  SectionEyebrow,
  SectionSpacing,
  SectionTitle,
  getHomeTheme,
} from "./homePrimitives";

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

const BookCard = memo(function BookCard({
  book,
  darkMode,
  label = "Curadoria da semana",
  showDescription = false,
  imageClassName = "",
  delay = 0,
}) {
  const theme = getHomeTheme(darkMode);

  if (!book) return null;

  return (
    <Reveal
      as="div"
      preset="soft-up"
      duration={850}
      delay={delay}
      distance={14}
      blur
      threshold={0.12}
    >
      <Link
        to={`/book/${book.id}`}
        className="group block"
        aria-label={`Ver detalhes do livro ${book.name}`}
      >
        <div className="overflow-hidden">
          <img
            src={book.image}
            alt={book.name}
            loading="lazy"
            className={`h-[24rem] w-full scale-[1.01] object-cover transition duration-700 ease-out group-hover:scale-[1.04] sm:h-[27rem] ${imageClassName}`}
          />
        </div>

        <div className="mt-6">
          <p className={`text-[10px] uppercase tracking-[0.32em] ${theme.eyebrow}`}>
            {label}
          </p>

          <h3 className="mt-3 text-[1.65rem] font-light leading-[1.18] tracking-[0.03em] transition-opacity duration-500 group-hover:opacity-70">
            {book.name}
          </h3>

          <p className={`mt-2 text-sm ${theme.description}`}>{book.author}</p>

          {showDescription ? (
            <p
              className={`mt-4 line-clamp-3 max-w-md text-sm leading-8 ${theme.description}`}
            >
              {book.description}
            </p>
          ) : null}

          <span
            className={`mt-5 inline-block text-[10px] uppercase tracking-[0.3em] transition-all duration-500 group-hover:tracking-[0.34em] ${theme.emphasis}`}
          >
            Ver detalhes
          </span>
        </div>
      </Link>
    </Reveal>
  );
});

const ReadingWeekCard = memo(function ReadingWeekCard({ book, darkMode }) {
  const theme = getHomeTheme(darkMode);

  if (!book) return null;

  return (
    <article className={`border ${theme.panel}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[0.76fr_1.24fr]">
        <div className="overflow-hidden">
          <img
            src={book.image}
            alt={book.name}
            loading="lazy"
            className="h-[28rem] w-full scale-[1.01] object-cover transition duration-700 ease-out hover:scale-[1.03] sm:h-[34rem] lg:h-full"
          />
        </div>

        <div className="flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
          <div>
            <SectionEyebrow className={theme.eyebrow}>
              Leitura da semana
            </SectionEyebrow>

            <h3 className="mt-5 max-w-2xl text-3xl font-light leading-[1.04] tracking-[0.04em] sm:text-4xl lg:text-5xl">
              {book.name}
            </h3>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <p className={`text-[11px] uppercase tracking-[0.24em] ${theme.eyebrow}`}>
                {book.author}
              </p>

              {book.moods?.[0] ? (
                <span
                  className={`text-[10px] uppercase tracking-[0.28em] ${theme.eyebrow}`}
                >
                  Atmosfera: {book.moods[0]}
                </span>
              ) : null}
            </div>

            <SectionDescription
              maxWidth="max-w-xl"
              className={`mt-8 ${theme.description}`}
            >
              {book.description}
            </SectionDescription>

            <blockquote
              className={`mt-10 border-l pl-5 text-base font-light italic leading-8 ${
                darkMode ? "border-zinc-700" : "border-zinc-300"
              } ${theme.emphasis}`}
            >
              Uma leitura para desacelerar, permanecer mais tempo na linguagem e
              transformar a semana em um espaço de atenção.
            </blockquote>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <PrimaryLink to={`/book/${book.id}`} darkMode={darkMode}>
              Ler com calma
            </PrimaryLink>

            <span className={`text-[10px] uppercase tracking-[0.28em] ${theme.eyebrow}`}>
              Recomendação editorial
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});

const EditorialCollectionCard = memo(function EditorialCollectionCard({
  item,
  index,
  darkMode,
}) {
  const theme = getHomeTheme(darkMode);

  return (
    <article className="group">
      <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.muted}`}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-5 text-2xl font-light leading-[1.18] tracking-[0.03em] transition-opacity duration-500 group-hover:opacity-70">
        {item.title}
      </h3>

      <p className={`mt-4 max-w-sm text-sm leading-8 ${theme.description}`}>
        {item.description}
      </p>
    </article>
  );
});

const AtmosphereCard = memo(function AtmosphereCard({ item, darkMode }) {
  const theme = getHomeTheme(darkMode);

  const hoverClass = darkMode
    ? "border-zinc-800 hover:bg-white hover:text-black"
    : "border-zinc-200 hover:bg-black hover:text-white";

  const descriptionClass = darkMode
    ? "text-zinc-500 group-hover:text-zinc-700"
    : "text-zinc-500 group-hover:text-zinc-300";

  return (
    <Link
      to={`/catalogo?atmosfera=${item.slug}`}
      className={`group block border p-8 transition-all duration-500 hover:-translate-y-[2px] ${hoverClass}`}
    >
      <p className="text-[11px] uppercase tracking-[0.3em]">{item.title}</p>

      <p
        className={`mt-4 max-w-xs text-sm leading-7 transition-colors duration-500 ${descriptionClass}`}
      >
        {item.description}
      </p>

      <span className="mt-6 inline-block text-[10px] uppercase tracking-[0.28em] opacity-70">
        Explorar leituras nesse ritmo
      </span>
    </Link>
  );
});

function SectionIntro({
  darkMode,
  eyebrow,
  title,
  description,
  align = "left",
  action,
}) {
  const theme = getHomeTheme(darkMode);
  const centered = align === "center";

  return (
    <Reveal
      as="div"
      preset="soft-up"
      duration={950}
      distance={20}
      blur
      threshold={0.08}
      className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${
        centered ? "text-center" : "text-left"
      }`}
    >
      <div className={`${centered ? "mx-auto" : ""} max-w-3xl`}>
        <SectionEyebrow className={`mb-6 ${theme.eyebrow}`}>
          {eyebrow}
        </SectionEyebrow>

        <SectionTitle className={centered ? "mx-auto" : ""}>
          {title}
        </SectionTitle>

        <SectionDescription
          maxWidth="max-w-2xl"
          className={`mt-8 ${theme.description} ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </SectionDescription>
      </div>

      {action ? <div className="lg:shrink-0">{action}</div> : null}
    </Reveal>
  );
}

function CuratedShelfSection({
  darkMode,
  featuredBooks = [],
  readingOfTheWeek = null,
  brazilianClassics = [],
  editorialCollections = [],
  atmosphereCards = [],
}) {
  const theme = getHomeTheme(darkMode);

  const featured = safeArray(featuredBooks);
  const classics = safeArray(brazilianClassics);
  const collections = safeArray(editorialCollections);
  const atmospheres = safeArray(atmosphereCards);

  return (
    <>
      <SectionSpacing className="pt-10 sm:pt-12 lg:pt-14">
        <SectionContainer>
          <section id="curadoria" className="scroll-mt-24">
            <SectionIntro
              darkMode={darkMode}
              eyebrow="Curadoria da semana"
              title="Uma seleção enxuta para começar a descoberta."
              description="A Home não precisa mostrar tudo. Ela deve apresentar recortes mais claros, mais belos e mais intencionais."
            />

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((book, index) => (
                <BookCard
                  key={book.id}
                  book={book}
                  darkMode={darkMode}
                  delay={index * 80}
                />
              ))}
            </div>

            <Reveal
              as="div"
              preset="soft-up"
              duration={850}
              delay={120}
              distance={12}
              threshold={0.08}
              className="mt-14"
            >
              <PrimaryLink to="/catalogo" darkMode={darkMode}>
                Ver catálogo completo
              </PrimaryLink>
            </Reveal>
          </section>
        </SectionContainer>
      </SectionSpacing>

      {readingOfTheWeek ? (
        <SectionSpacing className="pt-0">
          <SectionContainer>
            <section>
              <SectionIntro
                darkMode={darkMode}
                eyebrow="Leitura da semana"
                title="Uma escolha para desacelerar a leitura."
                description="Mais do que um destaque, esta é uma recomendação para acompanhar a semana com atenção, linguagem e permanência."
              />

              <Reveal
                as="div"
                preset="soft-up"
                duration={1000}
                distance={24}
                blur
                threshold={0.1}
                className="mt-16"
              >
                <ReadingWeekCard
                  book={readingOfTheWeek}
                  darkMode={darkMode}
                />
              </Reveal>
            </section>
          </SectionContainer>
        </SectionSpacing>
      ) : null}

      <SectionSpacing className="pt-0">
        <SectionContainer>
          <section>
            <SectionIntro
              darkMode={darkMode}
              eyebrow="Literatura brasileira"
              title="Clássicos que ajudam a compreender o Brasil."
              description="Uma seleção de obras que atravessam gerações e revelam aspectos profundos da experiência brasileira."
              action={
                <PrimaryLink to="/catalogo" darkMode={darkMode}>
                  Explorar seleção
                </PrimaryLink>
              }
            />

            <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
              {classics.map((book, index) => (
                <BookCard
                  key={book.id}
                  book={book}
                  darkMode={darkMode}
                  label="Clássico brasileiro"
                  showDescription
                  imageClassName="h-[22rem] sm:h-[24rem]"
                  delay={index * 70}
                />
              ))}
            </div>
          </section>
        </SectionContainer>
      </SectionSpacing>

      {collections.length > 0 ? (
        <SectionSpacing className="pt-0">
          <SectionContainer>
            <section
              className={`border px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14 ${theme.panel}`}
            >
              <SectionIntro
                darkMode={darkMode}
                eyebrow="Coleções editoriais"
                title="Caminhos de leitura pensados por repertório e intenção."
                description="Essas entradas funcionam como convites mais sensíveis para explorar leituras com identidade própria."
              />

              <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3">
                {collections.map((item, index) => (
                  <Reveal
                    key={item.id ?? item.slug ?? item.title}
                    as="div"
                    preset="soft-up"
                    duration={900}
                    delay={index * 90}
                    distance={16}
                    blur
                    threshold={0.1}
                  >
                    <EditorialCollectionCard
                      item={item}
                      index={index}
                      darkMode={darkMode}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          </SectionContainer>
        </SectionSpacing>
      ) : null}

      {atmospheres.length > 0 ? (
        <SectionSpacing className="pt-0">
          <SectionContainer>
            <section>
              <SectionIntro
                darkMode={darkMode}
                eyebrow="Atmosferas de leitura"
                title="Descubra livros pelo ritmo, pelo clima e pela intenção."
                description="Nem toda escolha começa pelo gênero. Às vezes, ela começa pela atmosfera certa para o momento."
                align="center"
              />

              <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {atmospheres.map((item, index) => (
                  <Reveal
                    key={item.slug ?? item.title}
                    as="div"
                    preset="soft-up"
                    duration={800}
                    delay={index * 70}
                    distance={12}
                    threshold={0.1}
                  >
                    <AtmosphereCard item={item} darkMode={darkMode} />
                  </Reveal>
                ))}
              </div>
            </section>
          </SectionContainer>
        </SectionSpacing>
      ) : null}

      <SectionSpacing className="pt-0">
        <SectionContainer>
          <section>
            <Reveal
              as="div"
              preset="fade"
              duration={950}
              threshold={0.08}
            >
              <Divider
                darkMode={darkMode}
                className="mb-12 w-full opacity-80"
              />
            </Reveal>

            <Reveal
              as="div"
              preset="fade"
              duration={1000}
              delay={60}
              threshold={0.08}
              className="max-w-4xl"
            >
              <SectionEyebrow className={`mb-6 ${theme.eyebrow}`}>
                Descoberta editorial
              </SectionEyebrow>

              <SectionTitle className="max-w-4xl">
                A navegação da Alma Literária deve parecer menos busca e mais
                encontro.
              </SectionTitle>

              <SectionDescription
                maxWidth="max-w-3xl"
                className={`mt-8 ${theme.description}`}
              >
                Cada bloco desta Home deve conduzir o leitor com mais calma:
                primeiro por seleções enxutas, depois por destaques mais
                profundos, e por fim por caminhos editoriais que ampliam a
                descoberta sem transformar a experiência em excesso.
              </SectionDescription>
            </Reveal>
          </section>
        </SectionContainer>
      </SectionSpacing>
    </>
  );
}

export default memo(CuratedShelfSection);