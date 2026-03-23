import { Link } from "react-router-dom";

export function getHomeTheme(darkMode) {
  return {
    page: darkMode ? "bg-black text-white" : "bg-white text-black",
    surface: darkMode ? "bg-zinc-950" : "bg-zinc-50",
    border: darkMode ? "border-zinc-800" : "border-zinc-200",
    divider: darkMode ? "bg-zinc-800" : "bg-zinc-200",
    eyebrow: darkMode ? "text-zinc-500" : "text-zinc-400",
    description: darkMode ? "text-zinc-400" : "text-zinc-500",
    muted: darkMode ? "text-zinc-600" : "text-zinc-400",
    emphasis: darkMode ? "text-zinc-300" : "text-zinc-700",
    panel: darkMode
      ? "border-zinc-800 bg-zinc-950"
      : "border-zinc-200 bg-zinc-50",
    primaryButton: darkMode
      ? "bg-white text-black hover:opacity-85"
      : "bg-black text-white hover:opacity-85",
    secondaryButton: darkMode
      ? "border-zinc-700 text-white hover:bg-white hover:text-black"
      : "border-zinc-300 text-black hover:bg-black hover:text-white",
  };
}

export function SectionContainer({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function SectionSpacing({ children, className = "" }) {
  return (
    <section className={`py-24 sm:py-28 lg:py-36 ${className}`}>{children}</section>
  );
}

export function SectionEyebrow({ children, className = "" }) {
  return (
    <p className={`text-[10px] uppercase tracking-[0.36em] ${className}`}>
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className = "",
  as: Component = "h2",
}) {
  return (
    <Component
      className={`text-4xl font-light leading-[1.04] tracking-[0.035em] sm:text-5xl lg:text-6xl ${className}`}
    >
      {children}
    </Component>
  );
}

export function SectionDescription({
  children,
  className = "",
  maxWidth = "max-w-2xl",
}) {
  return (
    <p className={`text-sm leading-8 sm:text-base ${maxWidth} ${className}`}>
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  darkMode,
  align = "left",
  titleAs = "h2",
  titleClassName = "",
  descriptionMaxWidth = "max-w-2xl",
}) {
  const theme = getHomeTheme(darkMode);
  const isCentered = align === "center";

  return (
    <div
      className={`${
        isCentered ? "mx-auto text-center" : "text-left"
      } max-w-3xl`}
    >
      {eyebrow ? (
        <SectionEyebrow className={`mb-6 ${theme.eyebrow}`}>
          {eyebrow}
        </SectionEyebrow>
      ) : null}

      <SectionTitle
        as={titleAs}
        className={`${titleClassName} ${isCentered ? "mx-auto" : ""}`}
      >
        {title}
      </SectionTitle>

      {description ? (
        <SectionDescription
          maxWidth={descriptionMaxWidth}
          className={`mt-8 ${theme.description} ${isCentered ? "mx-auto" : ""}`}
        >
          {description}
        </SectionDescription>
      ) : null}
    </div>
  );
}

export function PrimaryLink({
  to,
  children,
  darkMode,
  className = "",
  fullWidthOnMobile = false,
}) {
  const theme = getHomeTheme(darkMode);

  return (
    <Link
      to={to}
      className={`inline-flex min-h-[56px] items-center justify-center px-8 sm:px-10 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:tracking-[0.34em] ${theme.primaryButton} ${
        fullWidthOnMobile ? "w-full sm:w-auto" : ""
      } ${className}`}
    >
      {children}
    </Link>
  );
}

export function SecondaryAnchor({
  href,
  children,
  darkMode,
  className = "",
  fullWidthOnMobile = false,
}) {
  const theme = getHomeTheme(darkMode);

  return (
    <a
      href={href}
      className={`inline-flex min-h-[56px] items-center justify-center border px-8 sm:px-10 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 ${theme.secondaryButton} ${
        fullWidthOnMobile ? "w-full sm:w-auto" : ""
      } ${className}`}
    >
      {children}
    </a>
  );
}

export function Divider({ darkMode, className = "" }) {
  const theme = getHomeTheme(darkMode);

  return <div className={`h-px ${theme.divider} ${className}`} />;
}