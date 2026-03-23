import CatalogSearch from "./CatalogSearch";
import CatalogSort from "./CatalogSort";

export default function CatalogToolbar({
  value,
  onChange,
  onClear,
  resultsCount,
  darkMode,
  activeSearchLabel,
  sortBy,
  onSortChange,
  sortOptions,
  onReset,
  showReset,
}) {
  const theme = {
    eyebrow: darkMode ? "text-zinc-500" : "text-zinc-400",
    body: darkMode ? "text-zinc-400" : "text-zinc-500",
    emphasis: darkMode ? "text-zinc-300" : "text-zinc-700",
    divider: darkMode ? "bg-zinc-800" : "bg-zinc-200",
    panel: darkMode
      ? "border-zinc-800 bg-zinc-950/70"
      : "border-zinc-200 bg-zinc-50/80",
    action: darkMode
      ? "text-zinc-300 hover:text-white"
      : "text-zinc-600 hover:text-black",
  };

  return (
    <section aria-label="Ferramentas do catálogo">
      <div className={`border px-5 py-6 sm:px-6 sm:py-7 ${theme.panel}`}>
        <div className="space-y-7">
          <div className="space-y-4">
            <p
              className={`text-[10px] uppercase tracking-[0.32em] ${theme.eyebrow}`}
            >
              Buscar no catálogo
            </p>

            <CatalogSearch
              value={value}
              onChange={onChange}
              onClear={onClear}
              darkMode={darkMode}
              resultsCount={resultsCount}
              activeTermLabel={activeSearchLabel}
            />
          </div>

          <div className={`h-px w-full ${theme.divider}`} />

          <div className="space-y-4">
            <p
              className={`text-[10px] uppercase tracking-[0.32em] ${theme.eyebrow}`}
            >
              Organizar seleção
            </p>

            <CatalogSort
              value={sortBy}
              onChange={onSortChange}
              options={sortOptions}
              darkMode={darkMode}
            />
          </div>

          <div className={`h-px w-full ${theme.divider}`} />

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p
                className={`text-[10px] uppercase tracking-[0.3em] ${theme.eyebrow}`}
                aria-live="polite"
              >
                {resultsCount}{" "}
                {resultsCount === 1
                  ? "resultado encontrado"
                  : "resultados encontrados"}
              </p>

              {activeSearchLabel ? (
                <p className={`max-w-md text-[13px] leading-6 ${theme.body}`}>
                  Busca atual:{" "}
                  <span className={`italic ${theme.emphasis}`}>
                    “{activeSearchLabel}”
                  </span>
                </p>
              ) : (
                <p className={`max-w-md text-[13px] leading-6 ${theme.body}`}>
                  Explore a seleção com mais calma, contexto e direção.
                </p>
              )}
            </div>

            {showReset ? (
              <button
                type="button"
                onClick={onReset}
                className={`w-fit text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-70 ${theme.action}`}
              >
                Redefinir filtros
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}