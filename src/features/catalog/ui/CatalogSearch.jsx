import { Search, X } from "lucide-react";

export default function CatalogSearch({
  value,
  onChange,
  onClear,
  darkMode,
  resultsCount,
  activeTermLabel,
}) {
  const trimmedValue = value.trim();
  const hasValue = trimmedValue.length > 0;

  const theme = {
    label: darkMode ? "text-zinc-500" : "text-zinc-400",
    border: darkMode
      ? "border-zinc-800 focus-within:border-zinc-500"
      : "border-zinc-300 focus-within:border-zinc-500",
    text: darkMode
      ? "text-white placeholder:text-zinc-600"
      : "text-black placeholder:text-zinc-400",
    icon: darkMode
      ? "text-zinc-600 group-focus-within:text-zinc-300"
      : "text-zinc-400 group-focus-within:text-zinc-600",
    action: darkMode
      ? "text-zinc-500 hover:text-white hover:bg-white/6"
      : "text-zinc-500 hover:text-black hover:bg-black/5",
    helper: darkMode ? "text-zinc-500" : "text-zinc-500",
    emphasis: darkMode ? "text-zinc-300" : "text-zinc-700",
  };

  function handleInputChange(event) {
    onChange(event.target.value);
  }

  return (
    <section className="w-full" aria-labelledby="catalog-search-label">
      <div className="space-y-5">
        <div>
          <label
            id="catalog-search-label"
            htmlFor="catalog-search"
            className={`mb-4 block text-[10px] uppercase tracking-[0.32em] ${theme.label}`}
          >
            Buscar
          </label>

          <div
            className={`group relative border-b transition-[border-color] duration-500 ${theme.border}`}
          >
            <Search
              size={16}
              strokeWidth={1.7}
              className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 transition-colors duration-500 ${theme.icon}`}
              aria-hidden="true"
            />

            <input
              id="catalog-search"
              type="text"
              value={value}
              onChange={handleInputChange}
              placeholder="Título, autor, gênero ou editora"
              className={`h-14 w-full bg-transparent pl-7 pr-12 text-[14px] leading-none tracking-[0.02em] outline-none transition-[color,opacity] duration-300 ${theme.text}`}
              autoComplete="off"
              spellCheck={false}
              aria-describedby="catalog-search-meta"
            />

            {hasValue ? (
              <button
                type="button"
                onClick={onClear}
                aria-label="Limpar busca"
                className={`absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 hover:scale-[1.04] ${theme.action}`}
              >
                <X size={14} strokeWidth={1.75} />
              </button>
            ) : null}
          </div>
        </div>

        <div
          id="catalog-search-meta"
          className="flex min-h-[22px] flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            {typeof resultsCount === "number" ? (
              <p
                className={`text-[10px] uppercase tracking-[0.26em] ${theme.helper}`}
                aria-live="polite"
              >
                {resultsCount}{" "}
                {resultsCount === 1
                  ? "resultado encontrado"
                  : "resultados encontrados"}
              </p>
            ) : null}
          </div>

          <div className="min-h-[20px] sm:max-w-xs sm:text-right">
            {hasValue ? (
              <p className={`text-[12px] leading-5 ${theme.helper}`}>
                Buscando por{" "}
                <span className={`italic ${theme.emphasis}`}>
                  “{activeTermLabel || trimmedValue}”
                </span>
              </p>
            ) : (
              <p className={`text-[12px] leading-5 ${theme.helper}`}>
                Use termos curtos para ampliar a descoberta.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}