import { SearchX } from "lucide-react";

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  eyebrow = "Catálogo",
}) {
  return (
    <section
      className="w-full py-24"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto max-w-2xl border-t border-zinc-200 px-6 pt-16 text-center dark:border-zinc-800">
        <div
          className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-500"
          aria-hidden="true"
        >
          <SearchX size={20} strokeWidth={1.6} />
        </div>

        <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-zinc-400 dark:text-zinc-500">
          {eyebrow}
        </p>

        <h2 className="text-2xl font-light tracking-[0.05em] text-zinc-900 dark:text-zinc-100 sm:text-3xl">
          {title}
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-zinc-500 dark:text-zinc-400">
          {description}
        </p>

        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-10 text-[10px] uppercase tracking-[0.28em] text-zinc-900 transition-opacity duration-300 hover:opacity-60 dark:text-zinc-100"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </section>
  );
}