import useDarkModeContext from "../../hooks/useDarkModeContext";

export default function Reviews() {
  const { darkMode } = useDarkModeContext();

  const eyebrowClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const titleClass = darkMode ? "text-white" : "text-black";
  const wrapperClass = darkMode
    ? "border-zinc-800 bg-black text-white"
    : "border-zinc-200 bg-white text-black";
  const emptyLabelClass = darkMode ? "text-zinc-500" : "text-zinc-400";
  const descriptionClass = darkMode ? "text-zinc-400" : "text-zinc-500";
  const buttonClass = darkMode
    ? "border-white text-white hover:bg-white hover:text-black focus-visible:ring-white focus-visible:ring-offset-black"
    : "border-black text-black hover:bg-black hover:text-white focus-visible:ring-black focus-visible:ring-offset-white";

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-0">
      <div className="mb-10">
        <p className={`text-[11px] uppercase tracking-[0.28em] ${eyebrowClass}`}>
          Opiniões
        </p>

        <h2
          className={`mt-3 text-2xl font-light uppercase tracking-[0.08em] sm:text-3xl ${titleClass}`}
        >
          Avaliações de clientes
        </h2>
      </div>

      <div className={`border px-6 py-16 text-center sm:px-10 ${wrapperClass}`}>
        <div className="mx-auto max-w-2xl">
          <p className={`text-[11px] uppercase tracking-[0.22em] ${emptyLabelClass}`}>
            Nenhuma avaliação disponível
          </p>

          <div
            className={`mx-auto my-6 h-px w-14 ${
              darkMode ? "bg-zinc-800" : "bg-zinc-200"
            }`}
          />

          <p
            className={`mx-auto max-w-xl text-sm leading-7 sm:text-base ${descriptionClass}`}
          >
            Seja o primeiro a compartilhar sua experiência com este livro e ajude
            outros leitores a descobrirem novas histórias com mais confiança.
          </p>

          <button
            type="button"
            className={`mt-8 inline-flex min-h-[52px] items-center justify-center border px-8 text-xs uppercase tracking-[0.22em] transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer ${buttonClass}`}
          >
            Escrever avaliação
          </button>
        </div>
      </div>
    </section>
  );
}