import { Link } from "react-router-dom";
import useDarkModeContext from "../../features/theme/model/useTheme";

const navigationLinks = [
  { label: "Início", to: "/home" },
  { label: "Catálogo", to: "/home#banner" },
  { label: "Carrinho", to: "/cart" },
  { label: "Entrar", to: "/" },
];

const legalLinks = [
  { label: "Privacidade", to: "/home" },
  { label: "Termos", to: "/home" },
];

export default function Footer() {
  const { darkMode } = useDarkModeContext();

  const theme = darkMode
    ? {
        wrapper: "border-zinc-800 bg-black text-white",
        eyebrow: "text-zinc-500",
        body: "text-zinc-400",
        soft: "text-zinc-500",
        divider: "bg-zinc-800",
        title: "text-white",
        link: "text-zinc-400 hover:text-white",
        legal: "text-zinc-500 hover:text-white",
      }
    : {
        wrapper: "border-zinc-200 bg-white text-black",
        eyebrow: "text-zinc-400",
        body: "text-zinc-500",
        soft: "text-zinc-400",
        divider: "bg-zinc-200",
        title: "text-black",
        link: "text-zinc-500 hover:text-black",
        legal: "text-zinc-400 hover:text-black",
      };

  return (
    <footer
      className={`mt-24 border-t px-4 py-14 sm:px-8 lg:px-12 ${theme.wrapper}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-12">
          <div>
            <p
              className={`text-[11px] uppercase tracking-[0.32em] ${theme.eyebrow}`}
            >
              Alma Literária
            </p>

            <h2
              className={`mt-5 max-w-sm text-2xl font-light leading-tight tracking-[0.06em] ${theme.title}`}
            >
              Clássicos escolhidos com sensibilidade, beleza e permanência.
            </h2>

            <p className={`mt-6 max-w-md text-sm leading-7 ${theme.body}`}>
              Uma curadoria dedicada a obras que atravessam gerações com
              elegância, profundidade e significado, pensada para leitores que
              valorizam uma experiência de leitura mais contemplativa.
            </p>
          </div>

          <div>
            <p
              className={`mb-5 text-[11px] uppercase tracking-[0.24em] ${theme.eyebrow}`}
            >
              Navegação
            </p>

            <ul className="space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`text-sm transition duration-300 ${theme.link}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className={`mb-5 text-[11px] uppercase tracking-[0.24em] ${theme.eyebrow}`}
            >
              Contato
            </p>

            <ul className={`space-y-4 text-sm ${theme.body}`}>
              <li>
                <a
                  href="mailto:alma@literaria.com"
                  className={`transition duration-300 ${theme.link}`}
                >
                  alma@literaria.com
                </a>
              </li>
              <li>Suporte ao cliente</li>
              <li>Curadoria editorial</li>
            </ul>
          </div>
        </div>

        <div className={`my-10 h-px ${theme.divider}`} />

        <div className="flex flex-col gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className={`text-xs ${theme.soft}`}>
            © 2026 Alma Literária. Todos os direitos reservados.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-[11px] uppercase tracking-[0.18em] transition duration-300 ${theme.legal}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
