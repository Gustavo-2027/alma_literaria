import useDarkModeContext from "../../hooks/useDarkModeContext";

const SKELETON_ITEMS = 8;

function BooksGridSkeleton() {
  const { darkMode } = useDarkModeContext();

  const theme = darkMode
    ? {
        base: "bg-zinc-800/80",
        soft: "bg-zinc-900",
        image: "bg-zinc-950",
      }
    : {
        base: "bg-zinc-200",
        soft: "bg-zinc-100",
        image: "bg-zinc-100",
      };

  return (
    <section
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      aria-label="Carregando catálogo"
      aria-busy="true"
    >
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className={`mb-3 h-3 w-24 animate-pulse ${theme.base}`} />
          <div className={`h-8 w-52 animate-pulse ${theme.base}`} />
        </div>

        <div className={`h-3 w-28 animate-pulse ${theme.base}`} />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
          <article key={index} className="animate-pulse">
            <div className={`overflow-hidden ${theme.image}`}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <div className={`h-full w-full ${theme.base}`} />

                <div
                  className={`absolute left-3 top-3 h-6 w-16 ${theme.soft}`}
                />
              </div>
            </div>

            <div className="pt-5 text-left">
              <div className={`h-4 w-[78%] ${theme.base}`} />
              <div className={`mt-2 h-4 w-[58%] ${theme.base}`} />

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className={`h-4 w-[34%] ${theme.base}`} />

                <div className="flex items-center gap-2">
                  <div className={`h-3.5 w-3.5 rounded-full ${theme.base}`} />
                  <div className={`h-4 w-8 ${theme.base}`} />
                </div>
              </div>

              <div className={`mt-4 h-5 w-20 ${theme.base}`} />
            </div>

            <div className="mt-4 flex gap-3">
              <div className={`min-h-[50px] flex-1 ${theme.base}`} />
              <div className={`min-h-[50px] w-[50px] ${theme.base}`} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BooksGridSkeleton;