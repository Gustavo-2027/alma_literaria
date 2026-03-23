import { Link } from "react-router-dom";
import Reveal from "../../shared/ui/Reveal";

function getHeroTheme(darkMode) {
  return {
    primaryButton: darkMode
      ? "bg-white text-black hover:opacity-85"
      : "bg-black text-white hover:opacity-85",
    secondaryButton: darkMode
      ? "border-zinc-700 text-white hover:bg-white hover:text-black"
      : "border-zinc-300 text-black hover:bg-black hover:text-white",
  };
}

function getWelcomeMessage(currentUser) {
  if (currentUser?.name) {
    return `${currentUser.name}, bem-vindo à Alma Literária.`;
  }

  return "Bem-vindo à Alma Literária.";
}

function HeroButton({ to, children, className = "", darkMode }) {
  const theme = getHeroTheme(darkMode);

  return (
    <Link
      to={to}
      className={`inline-flex min-h-[56px] items-center justify-center px-10 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:tracking-[0.34em] ${theme.primaryButton} ${className}`}
    >
      {children}
    </Link>
  );
}

function HeroAnchor({ href, children, darkMode, className = "" }) {
  const theme = getHeroTheme(darkMode);

  return (
    <a
      href={href}
      className={`inline-flex min-h-[56px] items-center justify-center border px-10 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 ${theme.secondaryButton} ${className}`}
    >
      {children}
    </a>
  );
}

function HeroEyebrow({ children, className }) {
  return (
    <p className={`mb-6 text-[10px] uppercase tracking-[0.42em] ${className}`}>
      {children}
    </p>
  );
}

function HeroDivider({ className }) {
  return <div className={`mx-auto my-10 h-px w-12 opacity-60 ${className}`} />;
}

export default function HeroIntro({
  darkMode,
  currentUser,
  eyebrowClass,
  dividerClass,
  descriptionClass,
}) {
  const welcomeMessage = getWelcomeMessage(currentUser);

  return (
    <Reveal
      as="section"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-5xl text-center">
        <HeroEyebrow className={eyebrowClass}>Alma Literária</HeroEyebrow>

        <h1 className="text-5xl font-light leading-[1.06] tracking-[0.04em] sm:text-6xl lg:text-7xl">
          Livros que pedem mais tempo, mais silêncio e mais atenção.
        </h1>

        <HeroDivider className={dividerClass} />

        <p
          className={`mx-auto max-w-2xl text-sm leading-8 sm:text-base lg:text-lg ${descriptionClass}`}
        >
          {welcomeMessage} Uma livraria digital com olhar editorial, curadoria
          sensível e uma experiência pensada para quem prefere descobrir
          leituras com mais intenção.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <HeroButton to="/catalogo" darkMode={darkMode}>
            Explorar catálogo
          </HeroButton>

          <HeroAnchor href="#curadoria" darkMode={darkMode}>
            Ver curadoria
          </HeroAnchor>
        </div>
      </div>
    </Reveal>
  );
}