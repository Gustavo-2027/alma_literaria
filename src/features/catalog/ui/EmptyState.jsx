import { SearchX } from "lucide-react";
import Reveal from "../../../shared/ui/Reveal";

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  eyebrow = "Catálogo",
  darkMode = false,
}) {
  const theme = {
    divider: darkMode ? "border-zinc-800" : "border-zinc-200",
    iconWrap: darkMode
      ? "border-zinc-800 text-zinc-500"
      : "border-zinc-200 text-zinc-400",
    eyebrow: darkMode ? "text-zinc-500" : "text-zinc-400",
    title: darkMode ? "text-zinc-100" : "text-zinc-900",
    description: darkMode ? "text-zinc-400" : "text-zinc-500",
    action: darkMode
      ? "text-zinc-100 hover:text-white"
      : "text-zinc-900 hover:text-black",
  };

  return (
    <section className="w-full py-24 sm:py-28" role="status" aria-live="polite">
      <Reveal
        as="div"
        preset="soft-up"
        duration={900}
        distance={18}
        blur
        threshold={0.08}
        className={`mx-auto max-w-2xl border-t px-6 pt-16 text-center sm:px-8 sm:pt-20 ${theme.divider}`}
      >
        <Reveal
          as="div"
          preset="fade"
          duration={750}
          threshold={0.08}
        >
          <div
            className={`mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border ${theme.iconWrap}`}
            aria-hidden="true"
          >
            <SearchX size={20} strokeWidth={1.6} />
          </div>
        </Reveal>

        <Reveal
          as="div"
          preset="fade"
          duration={800}
          delay={40}
          threshold={0.08}
        >
          <p
            className={`mb-5 text-[10px] uppercase tracking-[0.34em] ${theme.eyebrow}`}
          >
            {eyebrow}
          </p>
        </Reveal>

        <Reveal
          as="div"
          preset="soft-up"
          duration={950}
          delay={90}
          distance={14}
          blur
          threshold={0.08}
        >
          <h2
            className={`mx-auto max-w-xl text-2xl font-light leading-[1.12] tracking-[0.04em] sm:text-3xl ${theme.title}`}
          >
            {title}
          </h2>
        </Reveal>

        <Reveal
          as="div"
          preset="soft-up"
          duration={900}
          delay={150}
          distance={12}
          blur
          threshold={0.08}
        >
          <p
            className={`mx-auto mt-6 max-w-lg text-sm leading-8 ${theme.description}`}
          >
            {description}
          </p>
        </Reveal>

        {actionLabel && onAction ? (
          <Reveal
            as="div"
            preset="soft-up"
            duration={850}
            delay={220}
            distance={10}
            threshold={0.08}
          >
            <button
              type="button"
              onClick={onAction}
              className={`mt-10 inline-flex min-h-[44px] items-center justify-center text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-65 ${theme.action}`}
            >
              {actionLabel}
            </button>
          </Reveal>
        ) : null}
      </Reveal>
    </section>
  );
}