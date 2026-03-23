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
    title: "Uma base pensada para evoluir",
    description:
      "Um produto preparado para crescer com mais profundidade, sem perder clareza.",
  },
];

const ExperienceCard = memo(function ExperienceCard({
  item,
  darkMode,
  delay = 0,
}) {
  const theme = getHomeTheme(darkMode);

  return (
    <Reveal
      as="article"
      preset="soft-up"
      duration={850}
      delay={delay}
      distance={14}
      blur
      threshold={0.12}
      className="space-y-4"
    >
      <h3 className="text-xl font-light tracking-[0.03em] sm:text-2xl">
        {item.title}
      </h3>

      <p className={`max-w-sm text-sm leading-8 ${theme.description}`}>
        {item.description}
      </p>
    </Reveal>
  );
});

const EditorialHighlight = memo(function EditorialHighlight({
  book,
  darkMode,
}) {
  const theme = getHomeTheme(darkMode);

  if (!book) return null;

  return (
    <section>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <Reveal
          as="div"
          preset="soft-up"
          duration={1000}
          distance={24}
          blur
          threshold={0.1}
          className="overflow-hidden"
        >
          <img
            src={book.image}
            alt={book.name}
            loading="lazy"
            className="h-[30rem] w-full scale-[1.01] object-cover transition duration-700 ease-out hover:scale-[1.04] sm:h-[36rem] lg:h-[42rem]"
          />
        </Reveal>

        <Reveal
          as="div"
          preset="soft-up"
          duration={1000}
          delay={80}
          distance={20}
          blur
          threshold={0.1}
        >
          <Reveal
            as="div"
            preset="fade"
            duration={800}
            threshold={0.1}
          >
            <SectionEyebrow className={`mb-6 ${theme.eyebrow}`}>
              Destaque editorial
            </SectionEyebrow>
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={950}
            delay={60}
            distance={16}
            blur
            threshold={0.1}
          >
            <SectionTitle className="max-w-2xl text-4xl sm:text-5xl">
              {book.name}
            </SectionTitle>
          </Reveal>

          <Reveal
            as="div"
            preset="fade"
            duration={850}
            delay={110}
            threshold={0.1}
          >
            <p
              className={`mt-5 text-[11px] uppercase tracking-[0.28em] ${theme.eyebrow}`}
            >
              {book.author}
            </p>
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={900}
            delay={160}
            distance={14}
            blur
            threshold={0.1}
          >
            <SectionDescription
              maxWidth="max-w-2xl"
              className={`mt-8 ${theme.description}`}
            >
              {book.description}
            </SectionDescription>
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={900}
            delay={220}
            distance={12}
            threshold={0.1}
          >
            <blockquote
              className={`mt-10 border-l pl-6 text-base font-light italic leading-8 ${
                darkMode
                  ? "border-zinc-700 text-zinc-300"
                  : "border-zinc-300 text-zinc-600"
              }`}
            >
              Uma leitura que amplia repertório, convida à permanência e reforça
              uma experiência mais contemplativa.
            </blockquote>
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={850}
            delay={280}
            distance={12}
            threshold={0.1}
            className="mt-12"
          >
            <PrimaryLink to={`/book/${book.id}`} darkMode={darkMode}>
              Ver detalhes
            </PrimaryLink>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
});

export default function ClosingSection({ darkMode, editorialHighlight }) {
  const theme = getHomeTheme(darkMode);

  if (!editorialHighlight) return null;

  return (
    <>
      <SectionSpacing>
        <SectionContainer>
          <EditorialHighlight
            book={editorialHighlight}
            darkMode={darkMode}
          />
        </SectionContainer>
      </SectionSpacing>

      <SectionSpacing className="pt-0">
        <SectionContainer>
          <section className="text-center">
            <Reveal
              as="div"
              preset="soft-up"
              duration={950}
              distance={20}
              blur
              threshold={0.08}
            >
              <SectionEyebrow className={`mb-6 ${theme.eyebrow}`}>
                Experiência Alma Literária
              </SectionEyebrow>

              <SectionTitle className="mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
                Uma interface pensada para valorizar leitura, contexto e
                descoberta.
              </SectionTitle>

              <SectionDescription
                maxWidth="max-w-2xl"
                className={`mx-auto mt-8 ${theme.description}`}
              >
                Menos estímulo comercial, mais direção visual. Menos ruído, mais
                permanência.
              </SectionDescription>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
              {EXPERIENCE_ITEMS.map((item, index) => (
                <ExperienceCard
                  key={item.title}
                  item={item}
                  darkMode={darkMode}
                  delay={index * 90}
                />
              ))}
            </div>
          </section>
        </SectionContainer>
      </SectionSpacing>

      <SectionSpacing className="pt-0">
        <SectionContainer>
          <section className="text-center">
            <Reveal
              as="div"
              preset="fade"
              duration={1000}
              threshold={0.08}
            >
              <blockquote
                className={`mx-auto max-w-3xl text-2xl font-light leading-relaxed italic sm:text-3xl ${
                  darkMode ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                “A leitura do mundo precede a leitura da palavra.”
              </blockquote>
            </Reveal>

            <Reveal
              as="div"
              preset="fade"
              duration={900}
              delay={100}
              threshold={0.08}
            >
              <p
                className={`mt-6 text-[10px] uppercase tracking-[0.3em] ${theme.eyebrow}`}
              >
                Paulo Freire
              </p>
            </Reveal>
          </section>
        </SectionContainer>
      </SectionSpacing>

      <SectionSpacing className="pt-0 pb-32">
        <SectionContainer>
          <section className="text-center">
            <Reveal
              as="div"
              preset="fade"
              duration={900}
              threshold={0.08}
            >
              <Divider darkMode={darkMode} className="mb-14 w-full opacity-80" />
            </Reveal>

            <Reveal
              as="div"
              preset="soft-up"
              duration={950}
              delay={60}
              distance={18}
              blur
              threshold={0.08}
            >
              <SectionTitle className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
                Continue a descoberta no catálogo completo.
              </SectionTitle>

              <SectionDescription
                maxWidth="max-w-2xl"
                className={`mx-auto mt-8 ${theme.description}`}
              >
                A Home apresenta a atmosfera. O catálogo aprofunda a
                experiência.
              </SectionDescription>
            </Reveal>

            <Reveal
              as="div"
              preset="soft-up"
              duration={850}
              delay={160}
              distance={12}
              threshold={0.08}
              className="mt-12"
            >
              <PrimaryLink to="/catalogo" darkMode={darkMode}>
                Explorar catálogo
              </PrimaryLink>
            </Reveal>
          </section>
        </SectionContainer>
      </SectionSpacing>
    </>
  );
}