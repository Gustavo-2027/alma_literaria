import Reveal from "../../shared/ui/Reveal";
import {
  Divider,
  PrimaryLink,
  SecondaryAnchor,
  SectionContainer,
  SectionDescription,
  SectionEyebrow,
  SectionSpacing,
  SectionTitle,
  getHomeTheme,
} from "./homePrimitives";

function getWelcomeMessage(currentUser) {
  if (currentUser?.name) {
    return `${currentUser.name}, bem-vindo à Alma Literária.`;
  }

  return "Bem-vindo à Alma Literária.";
}

export default function HeroIntro({ darkMode, currentUser }) {
  const theme = getHomeTheme(darkMode);
  const welcomeMessage = getWelcomeMessage(currentUser);

  return (
    <SectionSpacing className="pt-20 sm:pt-24 lg:pt-28">
      <SectionContainer>
        <section className="mx-auto max-w-5xl text-center">
          <Reveal
            as="div"
            preset="fade"
            duration={900}
            delay={0}
            threshold={0.08}
          >
            <SectionEyebrow className={`mb-6 ${theme.eyebrow}`}>
              Alma Literária
            </SectionEyebrow>
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={1000}
            delay={80}
            distance={20}
            blur
            threshold={0.08}
          >
            <SectionTitle
              as="h1"
              className="mx-auto max-w-5xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              Livros que pedem mais tempo, mais silêncio e mais atenção.
            </SectionTitle>
          </Reveal>

          <Reveal
            as="div"
            preset="fade"
            duration={900}
            delay={140}
            threshold={0.08}
          >
            <Divider
              darkMode={darkMode}
              className="mx-auto my-10 w-14 opacity-70"
            />
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={950}
            delay={180}
            distance={16}
            blur
            threshold={0.08}
          >
            <SectionDescription
              maxWidth="max-w-2xl"
              className={`mx-auto ${theme.description}`}
            >
              {welcomeMessage} Uma livraria digital com olhar editorial,
              curadoria sensível e uma experiência pensada para quem prefere
              descobrir leituras com mais intenção.
            </SectionDescription>
          </Reveal>

          <Reveal
            as="div"
            preset="soft-up"
            duration={900}
            delay={260}
            distance={14}
            threshold={0.08}
          >
            <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <PrimaryLink
                to="/catalogo"
                darkMode={darkMode}
                fullWidthOnMobile
              >
                Explorar catálogo
              </PrimaryLink>

              <SecondaryAnchor
                href="#curadoria"
                darkMode={darkMode}
                fullWidthOnMobile
              >
                Ver curadoria
              </SecondaryAnchor>
            </div>
          </Reveal>
        </section>
      </SectionContainer>
    </SectionSpacing>
  );
}