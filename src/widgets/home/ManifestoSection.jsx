import { memo } from "react";
import Reveal from "../../shared/ui/Reveal";

function getManifestoTheme(darkMode) {
  return {
    panel: darkMode
      ? "border-zinc-800 bg-zinc-950"
      : "border-zinc-200 bg-zinc-50",
  };
}

function SectionContainer({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

function SectionEyebrow({ children, className }) {
  return (
    <p className={`mb-5 text-[10px] uppercase tracking-[0.36em] ${className}`}>
      {children}
    </p>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`text-4xl font-light leading-[1.08] tracking-[0.04em] sm:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

function SectionDescription({ children, className = "", maxWidth = "max-w-2xl" }) {
  return (
    <p className={`mt-8 ${maxWidth} text-sm leading-8 sm:text-base ${className}`}>
      {children}
    </p>
  );
}

const EditorialLetter = memo(function EditorialLetter({
  darkMode,
  eyebrowClass,
  descriptionClass,
}) {
  const theme = getManifestoTheme(darkMode);
/*
  return (
    <article className={`border p-8 sm:p-10 lg:p-14 ${theme.panel}`}>
      <SectionEyebrow className={eyebrowClass}>Carta da semana</SectionEyebrow>

      <SectionTitle className="max-w-3xl">
        Nesta semana, escolhemos leituras que pedem menos pressa e mais
        presença.
      </SectionTitle>

      <SectionDescription
        className={descriptionClass}
        maxWidth="max-w-3xl"
      >
        Em vez de acumular estímulos, a proposta desta seleção é oferecer
        pausa, profundidade e linguagem. Livros que não funcionam apenas como
        consumo, mas como permanência — obras que acompanham o leitor por mais
        tempo e ampliam a experiência de leitura para além da página.
      </SectionDescription>
    </article>
  );*/
});

const ExperienceItem = memo(function ExperienceItem({
  title,
  description,
  showDivider,
  descriptionClass,
  subtleLineClass,
}) {
  return (
    <article>
      <div className="space-y-3">
        <h3 className="text-xl font-light tracking-[0.03em]">{title}</h3>

        <p className={`max-w-sm text-sm leading-8 ${descriptionClass}`}>
          {description}
        </p>
      </div>

      {showDivider ? (
        <div className={`mt-10 h-px w-full ${subtleLineClass}`} />
      ) : null}
    </article>
  );
});

function ManifestoSection({
  darkMode,
  eyebrowClass,
  descriptionClass,
  subtleLineClass,
  experienceItems = [],
}) {
  return (
    <>
      <Reveal as="section">
        <SectionContainer className="pb-24 lg:pb-32">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
            <div>
              <SectionEyebrow className={eyebrowClass}>Manifesto</SectionEyebrow>

              <SectionTitle className="max-w-3xl">
                Livros escolhidos para permanecer.
              </SectionTitle>

              <SectionDescription className={descriptionClass}>
                A Alma Literária nasce da ideia de que uma boa livraria não
                precisa oferecer apenas variedade. Ela precisa oferecer direção,
                contexto e atmosfera. Nossa proposta é apresentar obras que
                atravessam o tempo, ampliam repertório e tornam a leitura uma
                experiência mais íntima, calma e memorável.
              </SectionDescription>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {experienceItems.map((item, index) => (
                <ExperienceItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  showDivider={index < experienceItems.length - 1}
                  descriptionClass={descriptionClass}
                  subtleLineClass={subtleLineClass}
                />
              ))}
            </div>
          </div>
        </SectionContainer>
      </Reveal>

      <Reveal as="section">
        <SectionContainer className="pb-10 lg:pb-16">
          <EditorialLetter
            darkMode={darkMode}
            eyebrowClass={eyebrowClass}
            descriptionClass={descriptionClass}
          />
        </SectionContainer>
      </Reveal>
    </>
  );
}

export default memo(ManifestoSection);