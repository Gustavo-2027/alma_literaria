import { Check, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function CatalogSort({
  value,
  onChange,
  options = [],
  darkMode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) ?? options[0];
  }, [options, value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const labelClass = darkMode ? "text-zinc-500" : "text-zinc-400";

  const triggerClass = darkMode
    ? "border-zinc-800 bg-zinc-950/70 text-white hover:border-zinc-700"
    : "border-zinc-200 bg-zinc-50/80 text-black hover:border-zinc-300";

  const triggerIconClass = darkMode ? "text-zinc-500" : "text-zinc-400";

  const panelClass = darkMode
    ? "border-zinc-800 bg-black/95"
    : "border-zinc-200 bg-white/95";

  const optionHoverClass = darkMode
    ? "hover:bg-zinc-900"
    : "hover:bg-zinc-50";

  const optionActiveClass = darkMode
    ? "bg-white/[0.03] text-white"
    : "bg-black/[0.03] text-black";

  const optionInactiveClass = darkMode
    ? "text-zinc-400"
    : "text-zinc-600";

  const shadowClass = darkMode
    ? "shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
    : "shadow-[0_18px_50px_rgba(0,0,0,0.08)]";

  return (
    <div className="w-full" ref={containerRef}>
      <label
        className={`mb-3 block text-[10px] uppercase tracking-[0.3em] ${labelClass}`}
      >
        Ordenar por
      </label>

      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`group flex h-14 w-full items-center justify-between border px-4 text-left outline-none transition-all duration-300 ${triggerClass}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Ordenar livros do catálogo"
        >
          <span className="truncate text-[12px] uppercase tracking-[0.22em]">
            {selectedOption?.label ?? "Selecionar"}
          </span>

          <ChevronDown
            size={16}
            className={`ml-4 shrink-0 transition-all duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            } ${triggerIconClass}`}
            aria-hidden="true"
          />
        </button>

        <div
          className={`absolute left-0 right-0 top-full z-30 mt-3 origin-top border backdrop-blur-sm transition-all duration-200 ${panelClass} ${shadowClass} ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <ul
            className="max-h-80 overflow-y-auto py-2"
            role="listbox"
            aria-label="Opções de ordenação"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition-all duration-200 ${optionHoverClass} ${
                      isSelected ? optionActiveClass : optionInactiveClass
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="text-[11px] uppercase tracking-[0.22em]">
                      {option.label}
                    </span>

                    {isSelected ? (
                      <Check
                        size={15}
                        className="ml-4 shrink-0"
                        aria-hidden="true"
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}