import { Check, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useId } from "react";

export default function CatalogSort({
  value,
  onChange,
  options = [],
  darkMode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const optionRefs = useRef([]);

  const listboxId = useId();

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) ?? options[0];
  }, [options, value]);

  const selectedIndex = useMemo(() => {
    return options.findIndex((option) => option.value === value);
  }, [options, value]);

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
      return;
    }

    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleWindowKeydown(event) {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleWindowKeydown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleWindowKeydown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;

    optionRefs.current[highlightedIndex]?.focus();
  }, [highlightedIndex, isOpen]);

  const theme = {
    label: darkMode ? "text-zinc-500" : "text-zinc-400",
    trigger: darkMode
      ? "border-zinc-800 bg-zinc-950/70 text-white hover:border-zinc-700"
      : "border-zinc-200 bg-zinc-50/80 text-black hover:border-zinc-300",
    triggerIcon: darkMode ? "text-zinc-500" : "text-zinc-400",
    panel: darkMode
      ? "border-zinc-800 bg-black/95"
      : "border-zinc-200 bg-white/95",
    optionHover: darkMode ? "hover:bg-zinc-900" : "hover:bg-zinc-50",
    optionActive: darkMode
      ? "bg-white/[0.04] text-white"
      : "bg-black/[0.04] text-black",
    optionInactive: darkMode ? "text-zinc-400" : "text-zinc-600",
    optionFocused: darkMode
      ? "bg-zinc-900 text-white"
      : "bg-zinc-50 text-black",
    shadow: darkMode
      ? "shadow-[0_20px_60px_rgba(0,0,0,0.48)]"
      : "shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
  };

  function closeMenu() {
    setIsOpen(false);
  }

  function openMenu() {
    if (!options.length) return;
    setIsOpen(true);
  }

  function toggleMenu() {
    if (!options.length) return;
    setIsOpen((prev) => !prev);
  }

  function selectOption(optionValue) {
    onChange(optionValue);
    closeMenu();
    buttonRef.current?.focus();
  }

  function handleTriggerKeyDown(event) {
    if (!options.length) return;

    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMenu();
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu();
      setHighlightedIndex(
        selectedIndex >= 0 ? selectedIndex : Math.max(options.length - 1, 0)
      );
    }
  }

  function handleOptionKeyDown(event, index, optionValue) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 >= options.length ? 0 : prev + 1
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 < 0 ? options.length - 1 : prev - 1
      );
    }

    if (event.key === "Home") {
      event.preventDefault();
      setHighlightedIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setHighlightedIndex(options.length - 1);
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(optionValue);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      buttonRef.current?.focus();
    }

    if (event.key === "Tab") {
      closeMenu();
    }
  }

  return (
    <div className="w-full" ref={containerRef}>
      <label
        className={`mb-4 block text-[10px] uppercase tracking-[0.32em] ${theme.label}`}
      >
        Ordenar por
      </label>

      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleMenu}
          onKeyDown={handleTriggerKeyDown}
          className={`group flex h-14 w-full items-center justify-between border px-4 text-left outline-none transition-[border-color,background-color,transform] duration-300 ${theme.trigger}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-label="Ordenar livros do catálogo"
        >
          <span className="truncate text-[11px] uppercase tracking-[0.24em]">
            {selectedOption?.label ?? "Selecionar"}
          </span>

          <ChevronDown
            size={16}
            strokeWidth={1.7}
            className={`ml-4 shrink-0 transition-all duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            } ${theme.triggerIcon}`}
            aria-hidden="true"
          />
        </button>

        <div
          className={`absolute left-0 right-0 top-full z-30 mt-3 origin-top border backdrop-blur-md transition-all duration-250 ${theme.panel} ${theme.shadow} ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <ul
            id={listboxId}
            className="max-h-80 overflow-y-auto py-2"
            role="listbox"
            aria-label="Opções de ordenação"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;

              return (
                <li key={option.value}>
                  <button
                    ref={(element) => {
                      optionRefs.current[index] = element;
                    }}
                    type="button"
                    onClick={() => selectOption(option.value)}
                    onKeyDown={(event) =>
                      handleOptionKeyDown(event, index, option.value)
                    }
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition-[background-color,color] duration-200 ${
                      isHighlighted
                        ? theme.optionFocused
                        : isSelected
                        ? theme.optionActive
                        : theme.optionInactive
                    } ${theme.optionHover}`}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <span className="text-[11px] uppercase tracking-[0.22em]">
                      {option.label}
                    </span>

                    {isSelected ? (
                      <Check
                        size={15}
                        strokeWidth={1.8}
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