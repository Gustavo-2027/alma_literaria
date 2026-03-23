import { memo } from "react";
import Reveal from "../../shared/ui/Reveal";
import {
  SectionContainer,
  SectionDescription,
  SectionEyebrow,
  SectionSpacing,
  SectionTitle,
  Divider,
  getHomeTheme,
} from "./homePrimitives";

const EditorialLetter = memo(function EditorialLetter({
  darkMode,
  title,
  description,
}) {
  const theme = getHomeTheme(darkMode);

  return (
    <Reveal
      as="article"
      preset="soft-up"
      duration={950}
      distance={20}
      blur
      threshold={0.1}
      className={`border ${theme.panel}`}
    >
      <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
        <Reveal
          as="div"
          preset="fade"
          duration={800}
          delay={0}
          threshold={0.1}
        >
          <SectionEyebrow className={`mb-6 ${theme.eyebrow}`}>
            Carta da semana
          </SectionEyebrow>
        </Reveal>

        <Reveal
          as="div"
          preset="soft-up"
          duration={950}
          delay={70}
          distance={16}
          blur
          threshold={0.1}
        >
          <SectionTitle className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
            {title}
          </SectionTitle>
        </Reveal>

        <Reveal
          as="div"
          preset="soft-up"
          duration={900}
          delay={140}
          distance={14}
          blur
          threshold={0.1}
        >
          <SectionDescription
            maxWidth="max-w-3xl"
            className={`mt-8 ${theme.description}`}
          >
            {description}
          </SectionDescription>
        </Reveal>
      </div>
    </Reveal>
  );
});

const ExperienceItem = memo(function ExperienceItem({
  title,
  description,
  showDivider,
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
      className="pt-1"
    >
      <div className="space-y-4">
        <h3 className="text-xl font-light leading-snug tracking-[0.03em] sm:text-2xl">
          {title}
        </h3>

        <p className={`max-w-sm text-sm leading-8 ${theme.description}`}>
          {description}
        </p>
      </div>

      {showDivider ? (
        <Divider darkMode={darkMode} className="mt-10 w-full opacity-80" />
      ) : null}
    </Reveal>
  );
});

function ManifestoSection({ darkMode, experienceItems = [] }) {
  const theme = getHomeTheme(darkMode);

  return (
    <>
      <SectionSpacing className="pt-8 sm:pt-10 lg:pt-12">
        <SectionContainer>
          <section className="grid grid-cols-1 gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
            <Reveal
              as="div"
              preset="soft-up"
              duration={1000}
              distance={22}
              blur
              threshold={0.08}
            >
              <SectionEyebrow className={`mb-6 ${theme.eyebrow}`}>
                Manifesto
              </SectionEyebrow>

              <SectionTitle className="max-w-3xl text-4xl sm:text-5xl">
                Livros escolhidos para permanecer.
              </SectionTitle>

              <SectionDescription className={`mt-8 ${theme.description}`}>
                A Alma Literária nasce da ideia de que uma boa livraria não
                precisa oferecer apenas variedade. Ela precisa oferecer direção,
                contexto e atmosfera. Nossa proposta é apresentar obras que
                atravessam o tempo, ampliam repertório e tornam a leitura uma
                experiência mais íntima, calma e memorável.
              </SectionDescription>
            </Reveal>

            <div className="grid grid-cols-1 gap-10 lg:pt-2">
              {experienceItems.map((item, index) => (
                <ExperienceItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  showDivider={index < experienceItems.length - 1}
                  darkMode={darkMode}
                  delay={index * 90}
                />
              ))}
            </div>
          </section>
        </SectionContainer>
      </SectionSpacing>

      <SectionSpacing className="pt-0 lg:pt-0">
        <SectionContainer>
          <section>
            <EditorialLetter
              darkMode={darkMode}
              title="Nesta semana, escolhemos leituras que pedem menos pressa e mais presença."
              description="Em vez de acumular estímulos, a proposta desta seleção é oferecer pausa, profundidade e linguagem. Livros que não funcionam apenas como consumo, mas como permanência — obras que acompanham o leitor por mais tempo e ampliam a experiência de leitura para além da página."
            />
          </section>
        </SectionContainer>
      </SectionSpacing>
    </>
  );
}

export default memo(ManifestoSection);