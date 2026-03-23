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
  const subtleTextClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const bodyTextClass = darkMode ? "text-zinc-400" : "text-zinc-500";
  const dividerClass = darkMode ? "border-zinc-800" : "border-zinc-200";
  const panelClass = darkMode
    ? "border-zinc-800 bg-zinc-950/70"
    : "border-zinc-200 bg-zinc-50/80";
  const actionClass = darkMode
    ? "text-zinc-300 hover:text-white"
    : "text-zinc-600 hover:text-black";

  return (
    <section aria-label="Ferramentas do catálogo">
      <div className={`border p-5 sm:p-6 ${panelClass}`}>
        <div className="space-y-6">
          <div className="space-y-3">
            <p
              className={`text-[10px] uppercase tracking-[0.3em] ${subtleTextClass}`}
            >
              Buscar no catálogo
            </p>

            <CatalogSearch
              value={value}
              onChange={onChange}
              onClear={onClear}
              darkMode={darkMode}
            />
          </div>

          <div className={`h-px w-full ${dividerClass}`} />

          <div className="space-y-3">
            <p
              className={`text-[10px] uppercase tracking-[0.3em] ${subtleTextClass}`}
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

          <div className={`h-px w-full ${dividerClass}`} />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1.5">
              <p
                className={`text-[10px] uppercase tracking-[0.3em] ${subtleTextClass}`}
                aria-live="polite"
              >
                {resultsCount}{" "}
                {resultsCount === 1
                  ? "resultado encontrado"
                  : "resultados encontrados"}
              </p>

              {activeSearchLabel ? (
                <p className={`text-[13px] leading-6 ${bodyTextClass}`}>
                  Busca atual:{" "}
                  <span className="italic text-inherit">“{activeSearchLabel}”</span>
                </p>
              ) : (
                <p className={`text-[13px] leading-6 ${bodyTextClass}`}>
                  Explore a seleção com mais calma, contexto e direção.
                </p>
              )}
            </div>

            {showReset ? (
              <button
                type="button"
                onClick={onReset}
                className={`w-fit text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:opacity-70 ${actionClass}`}
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